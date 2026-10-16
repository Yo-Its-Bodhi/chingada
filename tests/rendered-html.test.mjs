import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test, { after } from "node:test";
import { createTestHarness } from "wrangler";

const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://lachingada.ca"
).replace(/\/$/, "");
const arcadePreview =
  process.env.NEXT_PUBLIC_ARCADE_URL?.trim() ||
  "https://taco-smack-table.lachingada1242.chatgpt.site/";
const bookingDestination =
  process.env.NEXT_PUBLIC_RESERVATION_URL?.trim() || "https://rezzo.bodhix.io";
const requiresArcadeSignIn =
  process.env.NEXT_PUBLIC_ARCADE_REQUIRES_SIGN_IN !== "false";
const routes = [
  "/",
  "/menu",
  "/happy-hour",
  "/all-you-can-eat-tacos",
  "/patio",
  "/brunch",
  "/our-story",
  "/arcade",
  "/agave",
];
const pages = new Map();
// Run the built artifact in workerd, including cloudflare: runtime imports and
// its packaged static assets. A Node import cannot exercise this deployment.
process.env.WRANGLER_SEND_METRICS = "false";
const harness = createTestHarness({
  workers: [{ configPath: "./dist/server/wrangler.json" }],
});
await harness.listen();
after(() => harness.close());
const worker = harness.getWorker();

async function request(path, origin = "https://lachingada.ca") {
  return worker.fetch(`${origin}${path}`, {
    headers: { accept: "text/html" },
    redirect: "manual",
  });
}

async function page(path) {
  if (!pages.has(path)) {
    const response = await request(path);
    assert.equal(response.status, 200, `${path} must render successfully`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.doesNotMatch(
      response.headers.get("x-robots-tag") ?? "",
      /noindex/i,
      "the official business domain must be indexable",
    );
    pages.set(path, await response.text());
  }
  return pages.get(path);
}

function attrs(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(
      ([, key, , value]) => [key.toLowerCase(), value],
    ),
  );
}

function tagAttributes(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(
    ([tag]) => attrs(tag),
  );
}

function metadata(html, name) {
  return tagAttributes(html, "meta").find(
    (tag) => tag.name === name || tag.property === name,
  )?.content;
}

function withoutScripts(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function contentText(html) {
  return withoutScripts(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function schemaObjects(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map(([, json]) => JSON.parse(json));
}

function canonical(html) {
  return tagAttributes(html, "link").find((tag) => tag.rel === "canonical")
    ?.href;
}

test("packaged Sites artifact exposes a worker and the original hosting manifest", async () => {
  assert.equal(typeof worker.fetch, "function");
  const packaged = JSON.parse(
    await readFile(
      new URL("../dist/.openai/hosting.json", import.meta.url),
      "utf8",
    ),
  );
  const source = JSON.parse(
    await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
  );
  assert.deepEqual(packaged, source);
});

for (const path of routes) {
  test(`${path} serves crawlable HTML, unique metadata and consistent restaurant schema`, async () => {
    const html = await page(path);
    const visible = withoutScripts(html);
    const text = contentText(html);
    assert.match(html, /<html\b[^>]*lang=["']en-CA["']/i);
    assert.equal(
      (visible.match(/<h1\b/gi) ?? []).length,
      1,
      "each page needs one primary heading",
    );
    assert.match(visible, /<main\b/i);
    assert.match(text, /1242 Dundas (?:Street|St\.) West/i);
    assert.match(text, /416-535-2242/);
    assert.equal(
      canonical(html),
      path === "/" ? `${siteOrigin}/` : `${siteOrigin}${path}`,
    );
    assert.ok(
      (metadata(html, "description") ?? "").length >= 60,
      "page description is missing",
    );
    assert.equal(
      metadata(html, "og:url"),
      path === "/" ? `${siteOrigin}/` : `${siteOrigin}${path}`,
    );
    assert.equal(metadata(html, "twitter:card"), "summary_large_image");
    assert.doesNotMatch(metadata(html, "robots") ?? "", /noindex/i);
    assert.match(html, /<title>[^<]*La Chingada Toronto[^<]*<\/title>/i);
    const restaurant = schemaObjects(html).find(
      (value) => value["@type"] === "Restaurant",
    );
    assert.ok(restaurant, "restaurant structured data is missing");
    assert.equal(restaurant["@id"], `${siteOrigin}/#restaurant`);
    assert.equal(restaurant.telephone, "+1-416-535-2242");
    assert.equal(restaurant.address.streetAddress, "1242 Dundas Street West");
    assert.equal(restaurant.menu, `${siteOrigin}/menu`);
    assert.equal(restaurant.potentialAction.target, bookingDestination);
    if (path !== "/") {
      const breadcrumb = schemaObjects(html).find(
        (value) => value["@type"] === "BreadcrumbList",
      );
      assert.equal(
        breadcrumb?.itemListElement.at(-1)?.item,
        `${siteOrigin}${path}`,
      );
    }
  });
}

test("editorial routes have distinct titles and descriptions", async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const path of routes) {
    const html = await page(path);
    titles.add(html.match(/<title>([^<]*)<\/title>/i)?.[1]);
    descriptions.add(metadata(html, "description"));
  }
  assert.equal(titles.size, routes.length);
  assert.equal(descriptions.size, routes.length);
});

test("agave card fronts show supplied CAD prices and keep house infusions unpublished", async () => {
  const html = withoutScripts(await page("/agave"));
  for (const [id, name, price] of [
    [128, "1800 AÑEJO", 11],
    [88, "1800 BLANCO", 9],
    [2, "1800 REPOSADO", 10],
    [3, "ADICTIVO DOUBLE REPOSADO", 26],
  ]) {
    const card = html.match(new RegExp(`<button[^>]*data-bottle-id="${id}"[^>]*>[\\s\\S]*?</button>`))?.[0];
    assert.ok(card, `Missing front card for ${name}`);
    assert.ok(card.includes(name), `Wrong bottle for ${id}`);
    assert.match(card, new RegExp(`<strong>\\$${price}</strong>`));
    assert.match(card, /CAD/);
  }
  assert.match(html, /Prices in CAD/);
  assert.doesNotMatch(html, /House infusions|APPLE TEQUILA|House Infused/);
  assert.match(contentText(html), /152 records to explore/);
});

test("full food and drinks menu is in server HTML and valid Menu structured data", async () => {
  const html = await page("/menu");
  const visible = withoutScripts(html);
  const text = contentText(html);
  for (const name of [
    "Barbacoa Taco",
    "Sweet Potato Taco",
    "Chicken Enchiladas",
    "Classic Margarita",
    "Aguas Frescas",
    "Segura Viudas Cava",
  ]) {
    assert.ok(
      text.includes(name),
      `${name} must be available without client interaction`,
    );
  }
  assert.equal(
    (visible.match(/class=["']editorial-menu-item["']/g) ?? []).length,
    87,
  );
  const menu = schemaObjects(html).find((value) => value["@type"] === "Menu");
  assert.ok(menu);
  assert.equal(menu.hasMenuSection.length, 9);
  const items = menu.hasMenuSection.flatMap((section) => section.hasMenuItem);
  assert.equal(items.length, 87);
  assert.equal(
    items.find((item) => item.name === "Barbacoa Taco")?.offers.price,
    "8",
  );
  assert.equal(
    items.find((item) => item.name === "Classic Margarita")?.offers
      .priceCurrency,
    "CAD",
  );
  assert.ok(
    items
      .find((item) => item.name === "Sweet Potato Taco")
      ?.suitableForDiet.includes("https://schema.org/VeganDiet"),
  );
  assert.match(text, /allergies/i);
});

test("Happy Hour and AYCE terms remain visible without opening a modal", async () => {
  const happy = contentText(await page("/happy-hour"));
  for (const term of [
    "4–7 PM",
    "$6",
    "$10 margaritas",
    "$2 off beer",
    "$6 bar rail",
    "20% off wine bottles",
    "Wednesday",
    "Carnitas taco",
    "Buñuelos",
  ]) {
    assert.ok(happy.includes(term), `Happy Hour is missing ${term}`);
  }
  const ayce = contentText(await page("/all-you-can-eat-tacos"));
  assert.match(ayce, /\$29\.95/);
  assert.match(ayce, /Thursday/);
  assert.match(ayce, /one.hour/i);
  assert.match(ayce, /Pick three tacos/i);
  assert.match(ayce, /one taco at a time/i);
  assert.match(ayce, /No sharing/i);
  assert.match(ayce, /Dine-in only/i);
  for (const taco of ["Barbacoa", "Halloumi", "Shrimp", "Sweet potato"])
    assert.ok(ayce.includes(taco));
});

test("brunch stays explicitly pending and patio seating terms are clear", async () => {
  const brunch = contentText(await page("/brunch"));
  assert.match(brunch, /coming soon/i);
  assert.match(brunch, /not being served yet/i);
  assert.match(brunch, /Huevos Rancheros/);
  assert.match(contentText(await page("/patio")), /first come, first served/i);
});

test("daily corn preparation and guest conversion links survive the redesign", async () => {
  const html = await page("/");
  const text = contentText(html);
  assert.match(text, /corn from Mexico/i);
  assert.match(text, /grind fresh masa/i);
  assert.match(text, /Every morning/i);
  assert.match(text, /Agave Library/i);
  assert.ok(
    tagAttributes(withoutScripts(html), "a").some(({ href }) =>
      href?.startsWith("https://order.store/store/la-chingada-"),
    ),
  );
  assert.ok(
    tagAttributes(withoutScripts(html), "button").some(
      ({ "aria-label": label }) => label?.includes("navigation"),
    ),
  );
  assert.match(html, /href=["']#content["']/);
});

test("arcade preview and proposed prizes are clearly distinguished from live restaurant rewards", async () => {
  for (const path of ["/", "/arcade"]) {
    const html = await page(path);
    const text = contentText(html);
    assert.match(
      text,
      requiresArcadeSignIn
        ? /ChatGPT sign-in required/i
        : /Playable staging preview/i,
    );
    assert.match(
      text,
      /Proposed prize.*Chingada merch.*Proposed prize.*Gift cards.*Proposed prize.*Free AYCE entries/i,
    );
    assert.match(
      text,
      /rewards, eligibility and redemption details to be confirmed/i,
    );
    assert.ok(
      tagAttributes(withoutScripts(html), "a").some(
        ({ href }) => href === arcadePreview,
      ),
    );
  }
});

test("metadata, schema, responsive image sources and favicons resolve to public assets", async () => {
  const assets = new Set();
  for (const path of routes) {
    const html = await page(path);
    for (const image of tagAttributes(withoutScripts(html), "img")) {
      if (image.src?.startsWith("/")) assets.add(image.src);
      for (const candidate of (image.srcset ?? "").split(",")) {
        const src = candidate.trim().split(/\s+/)[0];
        if (src?.startsWith("/")) assets.add(src);
      }
      assert.ok(image.alt, `an image on ${path} needs alternative text`);
      assert.ok(
        Number(image.width) > 0 && Number(image.height) > 0,
        `an image on ${path} needs reserved dimensions`,
      );
    }
    const socialImage = metadata(html, "og:image");
    assert.ok(socialImage, `a social image is missing on ${path}`);
    assets.add(new URL(socialImage).pathname);
    for (const value of schemaObjects(html)) {
      if (value["@type"] === "Restaurant") {
        for (const image of [...value.image, value.logo])
          assets.add(new URL(image).pathname);
      }
    }
    for (const { rel, href, as: resourceType } of tagAttributes(html, "link")) {
      if (
        (["icon", "apple-touch-icon", "manifest"].includes(rel) ||
          (rel === "preload" && resourceType === "font")) &&
        href?.startsWith("/")
      )
        assets.add(href);
    }
  }
  assert.ok(
    assets.size > 10,
    "asset checks should cover the whole public site",
  );
  for (const asset of assets) {
    const file = await stat(new URL(`../public${asset}`, import.meta.url));
    assert.ok(
      file.isFile() && file.size > 0,
      `public asset ${asset} must exist`,
    );
    const packaged = await stat(
      new URL(`../dist/client${asset}`, import.meta.url),
    );
    assert.ok(
      packaged.isFile(),
      `public asset ${asset} must be in the deployment artifact`,
    );
    assert.equal(
      packaged.size,
      file.size,
      `packaged asset ${asset} must match the source`,
    );
  }
});

test("sitemap and robots include all public routes and the production origin", async () => {
  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const xml = await sitemapResponse.text();
  const locations = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map(
    ([, value]) => value,
  );
  assert.deepEqual(
    new Set(locations),
    new Set(
      routes.map((path) =>
        path === "/" ? siteOrigin : `${siteOrigin}${path}`,
      ),
    ),
  );
  for (const [, source] of xml.matchAll(/<image:loc>([^<]*)<\/image:loc>/g)) {
    const file = await stat(
      new URL(`../public${new URL(source).pathname}`, import.meta.url),
    );
    assert.ok(file.isFile());
  }
  const robotsResponse = await request("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.ok(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
  assert.match(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Disallow: \/(?:\s|$)/);
});

test("unknown pages return 404 instead of a successful homepage", async () => {
  const response = await request("/definitely-not-a-restaurant-page");
  assert.equal(response.status, 404);
  const html = withoutScripts(await response.text());
  assert.match(html, /<h1\b/);
  assert.ok(
    tagAttributes(html, "a").some(({ href }) => href === "/menu"),
    "the branded error page must help guests find the menu",
  );
});

test("www requests permanently redirect to HTTPS while preserving the page and query", async () => {
  const response = await request(
    "/happy-hour?party=4",
    "http://www.lachingada.ca",
  );
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://lachingada.ca/happy-hour?party=4",
  );
});

test("retired WordPress pages permanently redirect to the business homepage", async () => {
  for (const path of [
    "/5628-2",
    "/5628-2/",
    "/author/andrew",
    "/author/andrew/",
  ]) {
    const response = await request(`${path}?utm_source=legacy`);
    assert.equal(response.status, 301, `${path} must be retired`);
    assert.equal(
      response.headers.get("location"),
      "https://lachingada.ca/?utm_source=legacy",
    );
  }
});

test("previews render normally with noindex while production remains indexable", async () => {
  const preview = await request(
    "/menu",
    "https://la-chingada-toronto.druwbi.chatgpt.site",
  );
  assert.equal(preview.status, 200);
  assert.equal(preview.headers.get("x-robots-tag"), "noindex, follow");
  assert.equal(preview.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    preview.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(canonical(await preview.text()), `${siteOrigin}/menu`);
  const official = await request("/menu");
  assert.equal(official.status, 200);
  assert.equal(official.headers.get("x-robots-tag"), null);
  assert.equal(official.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    official.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
});
