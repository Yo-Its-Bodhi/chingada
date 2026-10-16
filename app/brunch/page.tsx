import { EditorialFaq, EditorialPage } from "../components/EditorialPage";
import { dishes } from "../menu-data";
import { instagramUrl, pageMetadata } from "../site-config";

export const metadata = pageMetadata("Mexican Brunch in Toronto · Coming Soon", "Weekend Mexican brunch is coming soon to La Chingada on Dundas West, Toronto. Preview the planned menu. Brunch service has not launched; opening details to follow.", "/brunch", "/images/street-corn-hero.jpg");

export default function BrunchPage() {
  return (
    <EditorialPage path="/brunch" label="Brunch · coming soon" eyebrow="Weekend brunch · Coming soon" title="The morning shift is coming." intro="Mexican brunch on Dundas West is in the works. The kitchen is getting ready. Brunch is not being served yet; we will share the launch details when everything is ready." image="/images/street-corn-hero.jpg" imageAlt="Mexican street corn from La Chingada's regular menu">
      <section className="editorial-card"><p className="eyebrow">Saturday & Sunday · planned 10 AM–2 PM</p><h2>Something worth waking up for.</h2><p>We are planning a weekend menu with house-made tortillas, huevos rancheros, breakfast tacos and concha French toast. The menu below is a preview; dishes, prices and launch timing may change before service begins.</p><p>Our current restaurant hours remain Sunday noon–9 PM, Monday–Wednesday 4–10 PM and Thursday–Saturday noon–11 PM.</p><a href={instagramUrl} target="_blank" rel="noreferrer">Follow for launch news <span aria-hidden="true">↗</span></a></section>
      <section className="editorial-menu-group" id="brunch-preview"><p className="eyebrow">A look at what is cooking · Not yet available</p><h2>The planned brunch menu.</h2><div className="editorial-menu-items">
        {dishes.filter((dish) => dish.group === "Brunch").map((dish) => (
          <article className="editorial-menu-item" key={dish.name}><div className="editorial-menu-item-heading"><h3>{dish.name}</h3><span className="editorial-menu-price">{dish.price}</span></div><p>{dish.desc}</p></article>
        ))}
      </div></section>
      <EditorialFaq items={[
        { question: "Is La Chingada serving brunch now?", answer: "No. Weekend brunch is coming soon. The menu on this page is a preview, and brunch service has not launched." },
        { question: "What are the planned brunch hours?", answer: "We are planning Saturday and Sunday brunch from 10 AM–2 PM. These are upcoming service hours, not our current opening hours." },
        { question: "When will brunch launch?", answer: "A launch date has not been announced. Check this page or our Instagram for updates." },
        { question: "Can I visit for food before brunch launches?", answer: "Yes. We are serving our regular food and drinks menu during current restaurant hours, including daily Happy Hour and Thursday all-you-can-eat tacos." },
      ]} />
      <div className="editorial-actions"><a className="button" href="/menu">See what is serving now <span aria-hidden="true">→</span></a><a href="/happy-hour">Daily Happy Hour <span aria-hidden="true">→</span></a></div>
    </EditorialPage>
  );
}
