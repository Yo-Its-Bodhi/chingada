import type { ReactNode } from "react";
import type { AgaveRecord } from "../agave-data";
import { getAgaveDisplay } from "../agave-display";
import { agaveResearch } from "../agave-research";
import { agavePrice, formatAgavePrice } from "../agave-prices";

function TastingIcon({ palate = false }: { palate?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {palate ? (
        <>
          <path d="M6 3h12l-1 7a5 5 0 0 1-10 0L6 3Z" />
          <path d="M12 15v6M8 21h8M7 8h10" />
        </>
      ) : (
        <>
          <path d="M7 17c-4-4 4-5 0-10M12 16c-4-4 4-5 0-11M17 17c-4-4 4-5 0-10" />
          <path d="M5 21h14" />
        </>
      )}
    </svg>
  );
}

export function AgaveBottleDetails({
  bottle,
  photo,
}: {
  bottle: AgaveRecord;
  photo: ReactNode;
}) {
  const details = getAgaveDisplay(bottle);
  const research = agaveResearch.get(bottle.id);
  const title = research?.displayName ?? bottle.name;
  const category = research?.category ?? bottle.category;
  const type = research?.displayType ?? bottle.type;
  const price = agavePrice(bottle.id);
  const primaryLabels = new Set(["Alcohol", "Agave", "Maturation"]);
  const primaryFacts = details.facts.filter(({ label }) =>
    primaryLabels.has(label),
  );
  const secondaryFacts = details.facts.filter(
    ({ label }) => !primaryLabels.has(label),
  );
  return (
    <>
      <div className="agave-record-hero">
        {photo}
        <header className="agave-record-heading">
          <p className="eyebrow">
            {category === type ? category : `${category} · ${type}`}
          </p>
          <h2>{title}</h2>
          {price !== undefined && (
            <p className="agave-record-price">
              {formatAgavePrice(price)} <span>CAD · taxes extra</span>
            </p>
          )}
        </header>
        {(details.aroma || details.palate || details.tastingNotes) && (
          <div className="agave-tasting-grid" aria-label="Tasting notes">
            {details.aroma && (
              <section className="agave-tasting-panel agave-tasting-aroma">
                <h3>
                  <TastingIcon /> Aroma
                </h3>
                <p>{details.aroma}</p>
              </section>
            )}
            {details.palate && (
              <section className="agave-tasting-panel agave-tasting-palate">
                <h3>
                  <TastingIcon palate /> Palate
                </h3>
                <p>{details.palate}</p>
              </section>
            )}
            {details.tastingNotes && (
              <p className="agave-glass-note">
                <strong>In the glass</strong> {details.tastingNotes}
              </p>
            )}
          </div>
        )}
      </div>
      {details.facts.length > 0 && (
        <div className="agave-fact-panel">
          {primaryFacts.length > 0 && (
            <dl className="agave-facts">
              {primaryFacts.map(({ label, value, source }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                  {source && (
                    <span className="agave-fact-source">{source}</span>
                  )}
                </div>
              ))}
            </dl>
          )}
          {secondaryFacts.length > 0 && (
            <dl className="agave-secondary-facts">
              {secondaryFacts.map(({ label, value, source }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                  {source && (
                    <span className="agave-fact-source">{source}</span>
                  )}
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
      {details.story && (
        <section className="agave-record-note">
          <h3>The story</h3>
          <p>{details.story}</p>
        </section>
      )}
      {details.production && (
        <section className="agave-record-note">
          <h3>How it’s made</h3>
          <p>{details.production}</p>
        </section>
      )}
      {details.pending && (
        <p className="agave-research-pending">
          Exact-expression producer details are still being checked.
        </p>
      )}
      <p className="agave-record-footer">
        A collection guide for guests 19+. Ask the bar about today’s bottles and
        the label on your pour.
      </p>
      {details.sources.length > 0 && (
        <footer className="agave-record-sources">
          <h3>Sources</h3>
          <div>
            {details.sources.map(({ url, title: sourceTitle }) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                {sourceTitle || new URL(url).hostname}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </footer>
      )}
    </>
  );
}
