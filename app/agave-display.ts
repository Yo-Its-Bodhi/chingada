import type { AgaveRecord } from "./agave-data.ts";
import type { AgaveResearchRecord } from "./agave-research.ts";
import { archiveDetails } from "./agave-archive.ts";
import { catalogDetails } from "./agave-catalog.ts";
import records from "./agave-research-data.json" with { type: "json" };

export type AgaveDisplayFact = {
  label: string;
  value: string;
  source?: "House notes";
};

export type AgaveDisplay = {
  aroma?: string;
  palate?: string;
  tastingNotes?: string;
  story?: string;
  production?: string;
  facts: AgaveDisplayFact[];
  sources: Array<{ url: string; title: string }>;
  pending: boolean;
};

const researchById = new Map(
  (records as AgaveResearchRecord[]).map((record) => [record.id, record]),
);

// Treat empty fields as absent without rewriting the original tasting copy.
const text = (value?: string) => (value?.trim() ? value : undefined);

/** Presentation data shared by compact bottle records, independent of layout. */
export function getAgaveDisplay(bottle: AgaveRecord): AgaveDisplay {
  const research = researchById.get(bottle.id);
  const current = research?.expressionVerified ? research.facts : undefined;
  const catalog = catalogDetails[bottle.name];
  const archive = archiveDetails[bottle.name];
  const infused = (research?.category ?? bottle.category) === "House Infused";
  const facts: AgaveDisplayFact[] = [];

  function addFact(label: string, sourced?: string, house?: string) {
    const currentValue = text(sourced);
    const houseValue = text(house);
    if (currentValue) facts.push({ label, value: currentValue });
    else if (houseValue)
      facts.push({ label, value: houseValue, source: "House notes" });
  }

  addFact("Alcohol", current?.abv, text(catalog?.abv) ?? archive?.abv);
  addFact("Agave", current?.agave);
  addFact("Maturation", current?.aging, text(catalog?.aging) ?? archive?.aging);
  addFact("Origin", current?.origin, text(catalog?.origin) ?? archive?.region);
  addFact("Producer", current?.producer);
  addFact("NOM / certification", current?.nom);

  const houseProduction =
    text(catalog?.how) ??
    (archive?.cooking
      ? text(
          [
            archive.cooking,
            archive.extraction,
            archive.fermentation,
            archive.distillation,
          ]
            .filter(Boolean)
            .join(" · "),
        )
      : undefined);
  // La Pinta is a bottled liqueur that used to share the house-infusion group.
  // Its old generic "prepared in-house" note must not become its product story.
  const historicalNote =
    catalog?.fact ??
    (bottle.category === "House Infused" && !infused ? undefined : bottle.note);

  return {
    aroma: text(catalog?.aroma) ?? text(archive?.aroma) ?? text(current?.aroma),
    palate: text(catalog?.taste) ?? text(archive?.taste) ?? text(current?.taste),
    tastingNotes: text(current?.tastingNotes),
    story: text(historicalNote),
    production: text(current?.production) ?? houseProduction,
    facts,
    sources: (research?.sources ?? []).map(({ url, title }) => ({
      url,
      title,
    })),
    pending: !research?.expressionVerified,
  };
}
