import { EditorialFaq, EditorialPage } from "../components/EditorialPage";
import { ayceRules, ayceTacos } from "../menu-data";
import { pageMetadata } from "../site-config";

export const metadata = pageMetadata("All-You-Can-Eat Tacos in Toronto · Thursdays", "Thursday AYCE tacos at La Chingada on Dundas West, Toronto. $29.95 per guest, 14 taco choices, fresh house-made tortillas and a one-hour dining limit.", "/all-you-can-eat-tacos");

export default function AycePage() {
  return (
    <EditorialPage path="/all-you-can-eat-tacos" label="All-you-can-eat tacos" eyebrow="Every Thursday · Dine-in only" title="Fourteen tacos. Your move." intro="$29.95 per guest. A full hour to find your favourites. Our Thursday all-you-can-eat tacos are made on the same fresh tortillas, with the same care, as every other taco we serve." image="/images/tacos-real-food.png" imageAlt="Two La Chingada tacos on freshly made corn tortillas">
      <div className="editorial-grid">
        <section className="editorial-card"><p className="eyebrow">The lineup</p><h2>Pick your favourites.</h2><ul>{ayceTacos.map((taco) => <li key={taco}>{taco}</li>)}</ul><a href="/menu#tacos">See every taco&apos;s ingredients <span aria-hidden="true">→</span></a></section>
        <section className="editorial-card"><p className="eyebrow">How it works</p><h2>Come hungry. Read this.</h2><ol>{ayceRules.map((rule) => <li key={rule}>{rule}</li>)}</ol><p>Every guest enjoying AYCE needs their own order. The team will walk you through service and any current conditions when you arrive.</p></section>
      </div>
      <section className="editorial-card"><p className="eyebrow">Corn from Mexico · Made here every morning</p><h2>Quantity never replaces the work.</h2><p>We cook Mexican corn, grind fresh masa, press the tortillas and grill them for service every day. Thursday&apos;s tacos are made the same way.</p><a href="/our-story">See what goes into the tortilla <span aria-hidden="true">→</span></a></section>
      <EditorialFaq items={[
        { question: "How much are all-you-can-eat tacos at La Chingada?", answer: "Thursday AYCE tacos are $29.95 per person, in Canadian dollars. Dine-in only; current conditions apply." },
        { question: "How long does AYCE taco service last?", answer: "There is a one-hour time limit. Choose three tacos for your first round, then order one taco at a time." },
        { question: "Can I share an AYCE order?", answer: "No. Each guest enjoying all-you-can-eat tacos needs their own AYCE order." },
        { question: "Are vegetarian tacos part of AYCE?", answer: "The lineup includes halloumi, mushroom and sweet potato tacos. Read the regular menu for ingredient details and speak with the team about dietary needs." },
        { question: "Can I reserve a table on Thursday?", answer: "Yes. Reservations are available for groups of up to six. Thursdays can be busy, so try a different time if your first choice is full. Walk-ins are welcome when service allows." },
      ]} />
    </EditorialPage>
  );
}
