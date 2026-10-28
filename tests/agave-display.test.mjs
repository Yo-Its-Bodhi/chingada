import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getAgaveDisplay, getAgaveSearchText } from "../app/agave-display.ts";
import { agaveRecords } from "../app/agave-data.ts";
import { houseInfusions } from "../app/house-infusions.ts";
import { catalogDetails } from "../app/agave-catalog.ts";
import { archiveDetails } from "../app/agave-archive.ts";

const inventory = [...agaveRecords, ...houseInfusions];
const byId = new Map(inventory.map((bottle) => [bottle.id, bottle]));
const research = new Map(
  JSON.parse(
    await readFile(
      new URL("../app/agave-research-data.json", import.meta.url),
      "utf8",
    ),
  ).map((record) => [record.id, record]),
);
const fact = (display, label) =>
  display.facts.find((item) => item.label === label);

test("region search includes the origins actually shown to guests", () => {
  for (const id of [2, 62]) {
    const bottle = byId.get(id);
    const origin = fact(getAgaveDisplay(bottle), "Origin").value;
    const expected = origin.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    assert.ok(getAgaveSearchText(bottle).includes(expected), `${bottle.name}: ${origin}`);
  }
  assert.ok(getAgaveSearchText(byId.get(2)).includes("jalisco"));
  assert.ok(getAgaveSearchText(byId.get(62)).includes("durango"));
});

test("duplicate research URLs render only once without changing the saved provenance", () => {
  const record = research.get(101);
  assert.ok(record.sources.length > new Set(record.sources.map(({ url }) => url)).size);
  const sources = getAgaveDisplay(byId.get(101)).sources;
  assert.equal(sources.length, new Set(sources.map(({ url }) => url)).size);
});

test("1800 retains its aroma, palate and story alongside current and partial fallback facts", () => {
  const bottle = byId.get(2);
  const display = getAgaveDisplay(bottle);
  const house = catalogDetails[bottle.name];
  const current = research.get(2).facts;
  assert.equal(display.aroma, house.aroma);
  assert.equal(display.palate, house.taste);
  assert.equal(display.story, house.fact);
  assert.equal(display.production, house.how);
  assert.equal(display.tastingNotes, current.tastingNotes);
  assert.deepEqual(fact(display, "Origin"), {
    label: "Origin",
    value: house.origin,
    source: "House notes",
  });
  assert.deepEqual(fact(display, "Alcohol"), {
    label: "Alcohol",
    value: current.abv,
  });
  assert.deepEqual(fact(display, "Maturation"), {
    label: "Maturation",
    value: current.aging,
  });
  assert.deepEqual(
    display.facts.map((item) => item.label),
    ["Alcohol", "Agave", "Maturation", "Origin"],
  );
  assert.equal(display.pending, false);
});

test("archive-only 1800 notes retain the complete cooking, milling, fermentation and distillation text", () => {
  const archive = archiveDetails["1800 SILVER"];
  const display = getAgaveDisplay({
    id: -2,
    name: "1800 SILVER",
    type: "Tequila",
    category: "Blanco",
    note: "Legacy silver bottle.",
  });
  assert.equal(
    display.production,
    [
      archive.cooking,
      archive.extraction,
      archive.fermentation,
      archive.distillation,
    ]
      .filter(Boolean)
      .join(" · "),
  );
  assert.equal(display.aroma, archive.aroma);
  assert.equal(display.palate, archive.taste);
  assert.deepEqual(fact(display, "Origin"), {
    label: "Origin",
    value: archive.region,
    source: "House notes",
  });
});

test("La Pinta preserves its commercial bottle details without a false house-made story", () => {
  const bottle = byId.get(162);
  const display = getAgaveDisplay(bottle);
  assert.equal(display.story, undefined);
  assert.doesNotMatch(
    display.production ?? "",
    /prepared in-house|prepared at la chingada/i,
  );
  assert.equal(fact(display, "Alcohol").value, research.get(162).facts.abv);
  assert.equal(display.aroma, archiveDetails[bottle.name].aroma);
  assert.equal(display.palate, archiveDetails[bottle.name].taste);
});

test("1942's verified maturation and production supersede conflicting historical technical details", () => {
  const display = getAgaveDisplay(byId.get(44));
  const current = research.get(44).facts;
  assert.equal(fact(display, "Maturation").value, current.aging);
  assert.equal(fact(display, "Maturation").source, undefined);
  assert.equal(fact(display, "Origin").value, current.origin);
  assert.equal(display.production, current.production);
  assert.equal(
    display.facts.filter((item) => item.label === "Maturation").length,
    1,
  );
});

test("unverified expressions expose only existing house fallbacks, without invented bottle facts", () => {
  const unverified = inventory.filter(
    (bottle) => !research.get(bottle.id)?.expressionVerified,
  );
  // Retain an unverified fixture even after the owner identifies every stocked bottle.
  unverified.push({
    id: -3,
    name: "CLASE AZUL MEZCAL",
    type: "Mezcal",
    category: "Mezcal",
    note: "Historical unverified bottle.",
  });
  for (const bottle of unverified) {
    const display = getAgaveDisplay(bottle);
    assert.equal(display.pending, true);
    assert.equal(display.tastingNotes, undefined);
    assert.ok(display.facts.every((item) => item.source === "House notes"));
    assert.ok(
      display.facts.every((item) =>
        ["Origin", "Alcohol", "Maturation"].includes(item.label),
      ),
    );
  }
  const unknown = getAgaveDisplay({
    id: -1,
    name: "UNIDENTIFIED BOTTLE",
    type: "Mezcal",
    category: "Mezcal",
    note: "Ask the bar.",
  });
  assert.deepEqual(unknown.facts, []);
  assert.deepEqual(unknown.sources, []);
  assert.equal(unknown.production, undefined);
  assert.equal(unknown.story, "Ask the bar.");
});

test("new bottles use verified producer aroma and palate when historical tasting notes are absent", () => {
  const bottle = inventory.find(({ id }) => id === 182);
  const current = research.get(182);
  assert.ok(bottle && current?.expressionVerified);
  const display = getAgaveDisplay(bottle);
  assert.equal(display.aroma, current.facts.aroma);
  assert.equal(display.palate, current.facts.taste);
  assert.equal(display.pending, false);
});

test("the owner's Doba-Yej identification does not reuse a different archived Siete Misterios expression", () => {
  const bottle = byId.get(78);
  const current = research.get(78);
  assert.equal(current.legacyIdentityConflict, true);
  assert.equal(current.expressionVerified, true);
  const display = getAgaveDisplay(bottle);
  assert.equal(display.aroma, current.facts.aroma);
  assert.equal(display.palate, current.facts.taste);
  assert.equal(display.story, current.facts.story);
  assert.equal(fact(display, "Alcohol").value, current.facts.abv);
  assert.doesNotMatch(display.production ?? "", /clay pot|Sola de Vega/i);
  for (const id of [70, 73, 84]) {
    const current = research.get(id);
    const display = getAgaveDisplay(byId.get(id));
    assert.equal(current.legacyIdentityConflict, true);
    assert.equal(display.aroma, current.facts.aroma);
    assert.equal(display.palate, current.facts.taste);
    assert.equal(display.story, current.facts.story);
    if (current.facts.abv) assert.equal(fact(display, "Alcohol").value, current.facts.abv);
    else assert.equal(fact(display, "Alcohol"), undefined, "An old expression's alcohol must not leak into the clarified bottle");
  }
});

test("all inventory records produce safe, independent display data with no lost current facts", () => {
  assert.equal(inventory.length, research.size);
  for (const bottle of inventory) {
    const display = getAgaveDisplay(bottle);
    assert.equal(
      new Set(display.facts.map((item) => item.label)).size,
      display.facts.length,
    );
    assert.ok(
      display.facts.every(
        (item) => typeof item.value === "string" && item.value.trim(),
      ),
    );
    const factOrder = [
      "Alcohol",
      "Agave",
      "Maturation",
      "Origin",
      "Producer",
      "NOM / certification",
    ];
    assert.deepEqual(
      display.facts.map((item) => item.label),
      factOrder.filter((label) =>
        display.facts.some((item) => item.label === label),
      ),
    );
    assert.equal(typeof display.pending, "boolean");
    const current = research.get(bottle.id);
    if (current?.expressionVerified) {
      for (const [key, label] of [
        ["origin", "Origin"],
        ["abv", "Alcohol"],
        ["agave", "Agave"],
        ["aging", "Maturation"],
        ["producer", "Producer"],
        ["nom", "NOM / certification"],
      ]) {
        if (current.facts?.[key]) {
          assert.deepEqual(fact(display, label), {
            label,
            value: current.facts[key],
          });
        }
      }
    }
  }
  const first = getAgaveDisplay(byId.get(2));
  first.facts[0].value = "Consumer mutation";
  first.sources[0].title = "Consumer mutation";
  const next = getAgaveDisplay(byId.get(2));
  assert.notEqual(next.facts[0].value, "Consumer mutation");
  assert.notEqual(next.sources[0].title, "Consumer mutation");
});
