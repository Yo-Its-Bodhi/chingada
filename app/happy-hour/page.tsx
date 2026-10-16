import { EditorialFaq, EditorialPage } from "../components/EditorialPage";
import { happyHourDrinks, happyHourFood } from "../menu-data";
import { pageMetadata } from "../site-config";

export const metadata = pageMetadata("Happy Hour in Toronto · $6 Food & $10 Margaritas", "La Chingada Happy Hour on Dundas West: daily 4–7 PM, twelve $6 food items, $10 margaritas, beer and wine specials. Happy Hour food all day Wednesday.", "/happy-hour", "/images/margarita-patio-photo.webp");

export default function HappyHourPage() {
  return (
    <EditorialPage path="/happy-hour" label="Happy Hour" eyebrow="Every day · 4–7 PM · Dine-in only" title="Same food. Better hour." intro="Fresh tortillas, house-built margaritas and food made with the same care as the rest of the menu. Come early, get comfortable. This is Happy Hour on Dundas West." image="/images/margarita-patio-photo.webp" imageAlt="A La Chingada margarita with tacos on the back patio">
      <div className="editorial-grid">
        <section className="editorial-card"><p className="eyebrow">Twelve food items</p><h2>$6 each.</h2><p>The food Happy Hour menu runs 4–7 PM every day and all day Wednesday.</p><ul>{happyHourFood.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="editorial-card"><p className="eyebrow">A proper bar</p><h2>Make it a round.</h2><ul>{happyHourDrinks.map((item) => <li key={item}>{item}</li>)}</ul><p>The same pour, the same glass and the same house preparation. Infused tequila, citrus liqueur, syrups, rims and garnishes made here.</p><a href="/menu#margaritas">Meet the margaritas <span aria-hidden="true">→</span></a></section>
      </div>
      <section className="editorial-card"><p className="eyebrow">Dundas West · Toronto</p><h2>Your afternoon has plans.</h2><p>Meet at 1242 Dundas Street West for Mexican street food, tacos and a round from the bar. When the weather cooperates, our hidden back patio is first come, first served.</p><div className="editorial-actions"><a href="/patio">Find the patio <span aria-hidden="true">→</span></a><a href="/menu">Explore the full menu <span aria-hidden="true">→</span></a></div></section>
      <EditorialFaq items={[
        { question: "What time is Happy Hour at La Chingada?", answer: "Happy Hour runs every day from 4–7 PM, Toronto time. The $6 food menu also runs all day Wednesday during our opening hours." },
        { question: "What is included in the $6 food menu?", answer: "Twelve choices including chips and dips, four tacos, quesadilla, empanada, esquites, ceviche tostada and buñuelos. The full list is above." },
        { question: "Are the specials available for takeout or delivery?", answer: "Happy Hour is dine-in only. You can order from the regular delivery menu through our order link." },
        { question: "Do I need a reservation for Happy Hour?", answer: "Reservations are available for groups of up to six. Walk-ins are welcome when service allows. Popular times can fill, so check another time if your first choice is unavailable." },
      ]} />
    </EditorialPage>
  );
}
