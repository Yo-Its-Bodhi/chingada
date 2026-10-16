import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createPreviewProxy } from "./preview-proxy.mjs";

const port = Number(process.env.PORT || 8787);
const workerPort = Number(process.env.WORKER_PORT || 8786);
if (![port, workerPort].every(value => Number.isInteger(value) && value > 0 && value <= 65535) || port === workerPort) {
  throw new Error("Preview ports must be distinct TCP ports.");
}
const state = resolve(process.env.PREVIEW_STATE_DIR || ".wrangler/restaurant-preview");
await mkdir(state, { recursive: true });
const worker = spawn(process.execPath, [
  "node_modules/wrangler/bin/wrangler.js", "dev",
  "--config", "dist/server/wrangler.json", "--local",
  "--ip", "127.0.0.1", "--port", String(workerPort),
  "--persist-to", state, "--inspector-port", "0", "--show-interactive-dev-session", "false",
], {
  stdio: "inherit",
  env: {
    ...process.env, NODE_ENV: "production", WRANGLER_SEND_METRICS: "false",
    X_LOCAL_EXPLORER: "false", X_LOCAL_OBSERVABILITY: "false",
  },
});
const server = createPreviewProxy(workerPort);
server.listen(port, process.env.PREVIEW_HOST || "127.0.0.1", () => {
  console.log(`Restaurant staging gateway listening on ${port}.`);
});
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  server.close();
  worker.kill("SIGTERM");
  setTimeout(() => process.exit(code), 1500).unref();
}
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
worker.on("error", error => { console.error(error); stop(1); });
worker.on("exit", code => stop(code || 0));
