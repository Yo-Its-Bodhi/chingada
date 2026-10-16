import { EditorialPage } from "../components/EditorialPage";
import { AgaveCollection } from "../components/AgaveCollection";
import { pageMetadata } from "../site-config";

export const metadata = pageMetadata(
  "Agave Library · Tequila & Mezcal in Toronto",
  "Explore La Chingada’s tequila and mezcal collection with prices on Dundas West, Toronto. Meet the bottles, producers and stories behind a proper bar.",
  "/agave",
);

export default function AgavePage() {
  return (
    <EditorialPage
      path="/agave"
      label="Agave Library"
      eyebrow="The Agave Library · For the curious · 19+"
      title="Every bottle has a story."
      intro="Tequila. Mezcal. A collection built for the curious, one very good conversation at a time."
      image="/images/optimized/la-chingada-bar-interior-591.webp"
      imageAlt="Tequila and mezcal bottles glowing behind La Chingada’s bar"
      heroActions={
        <div className="editorial-actions">
          <a className="button" href="#collection">
            Browse the collection <span aria-hidden="true">↓</span>
          </a>
          <a href="/#visit">
            Find the bar <span aria-hidden="true">↗</span>
          </a>
        </div>
      }
    >
      <AgaveCollection />
    </EditorialPage>
  );
}
