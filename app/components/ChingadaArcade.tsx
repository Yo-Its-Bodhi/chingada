import { ArcadeArt, ArcadePrizeIcon } from "./ArcadeArt";
import "./arcade.css";

const prizeIdeas = [
  {
    kind: "merch" as const,
    title: "Chingada merch",
    detail:
      "Something to wear with your bragging rights. Merchandise is part of the proposed prize lineup; the items and availability are still to be confirmed.",
  },
  {
    kind: "gift" as const,
    title: "Gift cards",
    detail:
      "A reason to come back hungry. Gift cards are part of the proposed prize lineup; values and redemption details are still to be confirmed.",
  },
  {
    kind: "tacos" as const,
    title: "Free AYCE entries",
    detail:
      "Yes, tacos are on the proposed prize list. Free all-you-can-eat taco entries, eligibility and redemption details are still to be confirmed.",
  },
];

export function ArcadePrizeGrid() {
  return (
    <div className="arcade-prize-grid">
      {prizeIdeas.map(({ kind, title, detail }) => (
        <details key={kind} className={`arcade-prize arcade-prize--${kind}`}>
          <summary>
            <ArcadePrizeIcon kind={kind} />
            <span className="arcade-prize-copy">
              <span className="arcade-prize-status">Proposed prize</span>
              <strong>{title}</strong>
            </span>
            <span className="arcade-disclosure-mark" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{detail}</p>
        </details>
      ))}
    </div>
  );
}

export function ChingadaArcade({
  gamesUrl,
  requiresSignIn = true,
}: {
  gamesUrl?: string;
  requiresSignIn?: boolean;
}) {
  return (
    <section
      className="arcade-section section-pad"
      id="arcade"
      aria-labelledby="arcade-heading"
    >
      <div className="arcade-stage">
        <div className="arcade-copy">
          <p className="eyebrow">Chingada Arcade · In the works</p>
          <h2 id="arcade-heading">
            Your table.
            <br />
            Their table.
            <br />
            Game on.
          </h2>
          <p>
            We’re bringing table-against-table play to La Chingada. Keep the
            tacos close and the bragging rights closer.
          </p>
          <div className="arcade-actions">
            <a
              className="arcade-play-link"
              href={gamesUrl || "/arcade"}
              target={gamesUrl ? "_blank" : undefined}
              rel={gamesUrl ? "noreferrer" : undefined}
            >
              {gamesUrl
                ? requiresSignIn
                  ? "Open arcade preview"
                  : "Play the arcade"
                : "Explore the arcade"}
              <span aria-hidden="true">{gamesUrl ? "↗" : "→"}</span>
            </a>
            {gamesUrl && (
              <a className="arcade-info-link" href="/arcade">
                Meet the arcade <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
          {gamesUrl && (
            <p className="arcade-preview-note">
              {requiresSignIn
                ? "Arcade preview · ChatGPT sign-in required"
                : "Playable staging preview · Casual play"}
            </p>
          )}
          <details className="arcade-how">
            <summary>
              How it works{" "}
              <span className="arcade-disclosure-mark" aria-hidden="true">
                +
              </span>
            </summary>
            <p>
              We’re preparing table-against-table play for the restaurant.
              {gamesUrl
                ? requiresSignIn
                  ? " You can explore the existing arcade preview now; it requires ChatGPT sign-in. Venue launch details and the new games are still to come."
                  : " Explore the playable staging arcade, practise solo or start a private room with your group. Restaurant launch and prize details are still to be confirmed."
                : " The preview link and venue launch details are still to come."}
            </p>
          </details>
        </div>
        <div className="arcade-illustration">
          <ArcadeArt />
          <span className="arcade-art-caption">
            A little friendly competition. A lot of good food.
          </span>
        </div>
      </div>
      <div className="arcade-prize-heading">
        <h3>Bragging rights. And then some.</h3>
        <p>Tap a prize to see what we’re planning.</p>
      </div>
      <ArcadePrizeGrid />
      <p className="arcade-prize-note">
        Prize lineup proposed; rewards, eligibility and redemption details to be
        confirmed.
      </p>
    </section>
  );
}
