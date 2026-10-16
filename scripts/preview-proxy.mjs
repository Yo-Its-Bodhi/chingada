import http from "node:http";

export function blockedPreviewPath(rawUrl) {
  let pathname;
  try {
    pathname = new URL(rawUrl, "http://preview.local").pathname;
    // Reject encoded spellings too, before the upstream interprets the path.
    for (let pass = 0; pass < 3 && pathname.includes("%"); pass++)
      pathname = decodeURIComponent(pathname);
  } catch {
    return true;
  }
  pathname = pathname.replaceAll("\\", "/");
  return /^\/(?:cdn-cgi\/local(?:\/|$)|@(?:vite|id|fs)(?:\/|$)|__(?:vite|vinext|open-in-editor|inspect|devtools|debug)|node_modules(?:\/|$))/i.test(
    pathname,
  );
}

export function createPreviewProxy(workerPort) {
  const server = http.createServer((request, response) => {
    if (blockedPreviewPath(request.url || "/")) {
      response.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end("Not found");
      return;
    }
    const url = new URL(request.url || "/", "http://preview.local");
    const headers = { ...request.headers, host: `127.0.0.1:${workerPort}` };
    for (const name of [
      "forwarded",
      "x-forwarded-for",
      "x-forwarded-host",
      "x-forwarded-proto",
      "x-forwarded-port",
    ])
      delete headers[name];
    const upstream = http.request(
      {
        hostname: "127.0.0.1",
        port: workerPort,
        method: request.method,
        path: url.pathname + url.search,
        headers,
      },
      (reply) => {
        response.writeHead(reply.statusCode || 502, reply.headers);
        reply.pipe(response);
      },
    );
    upstream.setTimeout(65_000, () =>
      upstream.destroy(new Error("Worker request timed out")),
    );
    upstream.on("error", () => {
      if (!response.headersSent)
        response.writeHead(502, {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        });
      response.end("Restaurant preview is starting. Try again shortly.");
    });
    request.on("aborted", () => upstream.destroy());
    response.on("close", () => {
      if (!response.writableFinished) upstream.destroy();
    });
    request.pipe(upstream);
  });
  // Game rooms use HTTP polling; no inspector or development socket is needed.
  server.on("upgrade", (_request, socket) =>
    socket.end("HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n"),
  );
  return server;
}
