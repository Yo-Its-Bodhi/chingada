import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { agaveRecords } from "../app/agave-data.ts";
import { houseInfusions } from "../app/house-infusions.ts";

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require("sharp");
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") throw error;
  sharp = createRequire(require.resolve("next/package.json"))("sharp");
}

const known = [...agaveRecords, ...houseInfusions];
const research = JSON.parse(
  await readFile(new URL("../app/agave-research-data.json", import.meta.url), "utf8"),
);
const approved = research.filter(
  (record) =>
    record.expressionVerified &&
    record.image?.alphaVerified &&
    record.image?.visualVerified,
);
const pricing = JSON.parse(
  await readFile(new URL("../app/agave-prices.json", import.meta.url), "utf8"),
);

test("POS prices match unique existing bottles without borrowing prices for missing expressions", () => {
  const ids = pricing.records.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
  const inventoryIds = new Set(known.map(({ id }) => id));
  for (const record of pricing.records) {
    assert.ok(inventoryIds.has(record.id));
    assert.ok(Number.isFinite(record.priceCad) && record.priceCad > 0);
    assert.ok(record.posName.trim());
  }
  const byId = new Map(pricing.records.map((record) => [record.id, record]));
  assert.equal(byId.get(135).priceCad, 85); // Clase Azul añejo
  assert.equal(byId.get(48).priceCad, 99); // Don Julio Ultima Reserva
  assert.equal(byId.get(162).priceCad, 12); // La Pinta is not the $9 house infusion
  assert.equal(byId.get(78).posName, "LOS SIETE MISTERIO DOBA-YEJ");
  for (const id of [68, 79, 120]) assert.equal(byId.has(id), false);
  for (const bottle of houseInfusions.filter(({ id }) => id !== 162)) {
    assert.equal(byId.has(bottle.id), false);
  }
});

function assetUrl(root, path) {
  assert.match(
    path,
    /^\/images\/agave-researched\/(?:originals\/)?[a-z0-9_-]+\.(?:png|webp)$/i,
    `Unsafe or unsupported bottle path: ${path}`,
  );
  return new URL(`../${root}${path}`, import.meta.url);
}

function httpsUrl(value, description) {
  assert.equal(typeof value, "string", `${description} must be recorded`);
  assert.equal(new URL(value).protocol, "https:", description);
}

test("research covers every one of the 178 original inventory IDs exactly once", async () => {
  assert.equal(known.length, 178);
  const expectedIds = Array.from({ length: 178 }, (_, index) => index + 1);
  assert.deepEqual(known.map(({ id }) => id).sort((a, b) => a - b), expectedIds);
  assert.deepEqual(research.map(({ id }) => id).sort((a, b) => a - b), expectedIds);

  const originals = new Map(known.map((record) => [record.id, record]));
  for (const record of research) {
    assert.equal(record.name, originals.get(record.id).name, `Renamed inventory ID ${record.id}`);
    assert.equal(record.type, originals.get(record.id).type, `Changed inventory type ${record.id}`);
  }

  const batches = await Promise.all(
    ["a", "b", "c"].map(async (batch) => {
      const input = JSON.parse(
        await readFile(new URL(`../reports/agave-research-${batch}.json`, import.meta.url), "utf8"),
      );
      return Array.isArray(input) ? input : input.records;
    }),
  );
  assert.deepEqual(
    research,
    batches.flat().sort((a, b) => a.id - b.id),
    "Published research must be regenerated after a report changes",
  );
});

test("verified facts and photographs retain sources; unresolved bottles retain an explanation", () => {
  for (const record of research) {
    const label = `${record.id}: ${record.name}`;
    assert.equal(typeof record.expressionVerified, "boolean", label);
    if (record.expressionVerified) assert.ok(record.sources.length > 0, `${label}: missing source`);
    for (const source of record.sources) {
      httpsUrl(source.url, `${label}: fact source`);
      assert.ok(source.title?.trim(), `${label}: untitled source`);
    }
    for (const [field, value] of Object.entries(record.facts ?? {})) {
      assert.equal(typeof value, "string", `${label}: ${field}`);
      assert.ok(value.trim(), `${label}: empty ${field}`);
    }
    const photoApproved = approved.includes(record);
    if (!photoApproved) assert.ok(record.unresolvedReason?.trim(), `${label}: missing photo explanation`);
    if (record.image) {
      httpsUrl(record.image.sourceUrl, `${label}: original image URL`);
      httpsUrl(record.image.sourcePage, `${label}: image source page`);
      assetUrl("public", record.image.localPath);
    }
  }
});

test("verified category and type corrections supersede the historical inventory labels", () => {
  const byId = new Map(research.map((record) => [record.id, record]));
  assert.equal(byId.get(44).displayName, "DON JULIO 1942 AÑEJO");
  assert.equal(byId.get(44).category, "Añejo");
  assert.equal(byId.get(92).displayName, "CALIROSA ROSA BLANCO");
  assert.equal(byId.get(92).category, "Blanco");
  assert.equal(byId.get(162).displayType, "Liqueur");
});

test("every approved bottle decodes at its declared size and has real, non-empty transparency", async () => {
  assert.ok(approved.length > 0, "The collection must contain approved photos");
  for (const { id, image } of approved) {
    const source = assetUrl("public", image.localPath);
    const [file, metadata, pixels] = await Promise.all([
      stat(source),
      sharp(fileURLToPath(source)).metadata(),
      sharp(fileURLToPath(source)).stats(),
    ]);
    assert.ok(file.isFile(), `${id}: photo is not a regular file`);
    assert.ok(file.size > 0 && file.size <= 2_000_000, `${id}: photo exceeds the 2 MB delivery budget`);
    assert.equal(metadata.width, image.width, `${id}: declared width differs from file`);
    assert.equal(metadata.height, image.height, `${id}: declared height differs from file`);
    assert.ok(metadata.width > 0 && metadata.height > 0, `${id}: empty dimensions`);
    assert.ok(Math.max(metadata.width, metadata.height) <= 2500, `${id}: unoptimized bottle dimensions`);
    assert.ok(metadata.hasAlpha, `${id}: opaque image format`);
    const alpha = pixels.channels[metadata.channels - 1];
    assert.equal(alpha.min, 0, `${id}: no fully transparent background pixels`);
    assert.ok(alpha.max > 0, `${id}: completely empty image`);
    assert.equal(pixels.isOpaque, false, `${id}: an opaque backdrop slipped through`);
  }
});

test("the built Sites asset package includes the exact approved photos and excludes archived originals", async () => {
  // Run after the production build: this catches a correct source tree whose
  // deployment package is stale or omits a newly researched bottle.
  for (const { id, image } of approved) {
    const source = await readFile(assetUrl("public", image.localPath));
    const packaged = await readFile(assetUrl("dist/client", image.localPath));
    const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");
    assert.equal(digest(packaged), digest(source), `${id}: packaged bottle differs from approved source`);
    if (image.originalLocalPath?.startsWith("work/agave-originals")) {
      const rawPath = image.originalPublicPath ?? `/images/agave-researched/${image.originalLocalPath.split("/").at(-1)}`;
      for (const root of ["public", "dist/client"]) {
        await assert.rejects(
          stat(assetUrl(root, rawPath)),
          { code: "ENOENT" },
          `${id}: archived original must not ship in ${root}`,
        );
      }
    }
  }
});
