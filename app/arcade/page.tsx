import { ArcadeArt } from "../components/ArcadeArt";
import { ArcadePrizeGrid } from "../components/ChingadaArcade";
import { EditorialFaq, EditorialPage } from "../components/EditorialPage";
import {
  arcadeGamesUrl,
  arcadeRequiresSignIn,
  pageMetadata,
} from "../site-config";

export const metadata = pageMetadata(
  "Chingada Arcade · Table vs. Table in Toronto",
  "Explore the Chingada Arcade preview and plans for table-against-table play at La Chingada on Dundas West. Prize lineup and venue launch details to be confirmed.",
  "/arcade",
);

export default function ArcadePage() {
  return (
    <EditorialPage
      path="/arcade"
      label="Chingada Arcade"
      eyebrow="Chingada Arcade · In the works"
      title="Dinner has a side quest."
      intro="We’re bringing table-against-table play to La Chingada. Mexican street food, a proper bar and a little friendly competition."
      heroGraphic={<ArcadeArt />}
      heroActions={
        <>
          {arcadeGamesUrl ? (
            <a
              className="arcade-play-link"
              href={arcadeGamesUrl}
              target="_blank"
              rel="noreferrer"
            >
              {arcadeRequiresSignIn ? "Open arcade preview" : "Play the arcade"}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <a className="arcade-play-link" href="#arcade-prizes">
              Explore the prize plans <span aria-hidden="true">↓</span>
            </a>
          )}
          <span className="arcade-preview-note">
            {arcadeGamesUrl
              ? arcadeRequiresSignIn
                ? "Arcade preview · ChatGPT sign-in required"
                : "Playable staging preview · Casual play"
              : "Preview link coming soon"}
          </span>
        </>
      }
    >
      <section
        className="arcade-page-prizes"
        id="arcade-prizes"
        aria-labelledby="arcade-prizes-heading"
      >
        <div className="arcade-prize-heading">
          <h2 id="arcade-prizes-heading">More than bragging rights.</h2>
          <p>Tap to explore the proposed prizes.</p>
        </div>
        <ArcadePrizeGrid />
        <p className="arcade-prize-note">
          Prize lineup proposed; rewards, eligibility and redemption details to
          be confirmed.
        </p>
      </section>
      <EditorialFaq
        items={[
          {
            question: "What is Chingada Arcade?",
            answer:
              "We’re developing table-against-table play for La Chingada. Explore the arcade preview while we prepare the restaurant launch.",
          },
          {
            question: "Where do I find the games?",
            answer: arcadeGamesUrl
              ? arcadeRequiresSignIn
                ? "Use Open arcade preview on this page. The existing preview requires ChatGPT sign-in."
                : "Use Play the arcade on this page. Try solo games or create a private room with your group. This is casual staging play; restaurant launch and prize details are still to be confirmed."
              : "The game link is still to be confirmed. It will appear on this page when it’s ready.",
          },
          {
            question: "What can we win?",
            answer:
              "Merchandise, gift cards and free all-you-can-eat taco entries are the proposed prize lineup. Rewards, eligibility, availability and redemption details are still to be confirmed.",
          },
        ]}
      />
    </EditorialPage>
  );
}
