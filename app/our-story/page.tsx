import { EditorialFaq, EditorialPage } from "../components/EditorialPage";
import { pageMetadata } from "../site-config";

export const metadata = pageMetadata(
  "Mexican Corn, Fresh Masa & Our Toronto Kitchen",
  "La Chingada imports Mexican corn and cooks, grinds, presses and grills fresh tortillas every day in Toronto. Discover the kitchen and house-made bar behind Dundas West.",
  "/our-story",
);

const tortillaSteps = [
  {
    name: "Source",
    title: "Mexican corn, by the tonne.",
    detail:
      "Every six months, we import one tonne of corn from Mexico to Canada. The work starts before the corn reaches our kitchen.",
  },
  {
    name: "Cook",
    title: "The kitchen starts early.",
    detail:
      "The corn is cooked in-house every morning and cooled before the next stage.",
  },
  {
    name: "Grind",
    title: "Fresh corn becomes fresh masa.",
    detail: "We grind the cooked corn into masa in our own kitchen, every day.",
  },
  {
    name: "Press",
    title: "Our own size. Our own shape.",
    detail:
      "Each tortilla is machine-pressed every morning to La Chingada's size and shape.",
  },
  {
    name: "Grill",
    title: "Ready for today's service.",
    detail:
      "The tortillas are grilled, cooled and prepared for the day's tacos.",
  },
  {
    name: "Serve",
    title: "That is the tortilla under your taco.",
    detail:
      "Corn from Mexico. Made here in Toronto that morning. The part you might overlook is the part we start with.",
  },
];
const barCraft = [
  {
    title: "House-infused tequila",
    detail:
      "Blueberry, pineapple, lavender, jalapeño, habanero and ghost pepper. Infusions rest from two days to two weeks, depending on the ingredient.",
  },
  {
    title: "Our own triple sec",
    detail:
      "Orange peel and grapefruit zest become a citrus liqueur made for the drinks we serve.",
  },
  {
    title: "Salts, sugars & syrups",
    detail:
      "Lime and chili salts, lavender sugar, fruit syrups and liqueurs are prepared, dried, ground or infused here.",
  },
  {
    title: "Garnishes with a purpose",
    detail:
      "Fruit is sliced, sometimes candied overnight, and slowly dehydrated. It finishes a drink with aroma, flavour and texture.",
  },
];

export default function StoryPage() {
  return (
    <EditorialPage
      path="/our-story"
      label="Our story"
      eyebrow="Mexican corn. Toronto hands."
      title="The work starts before you arrive."
      intro="You see a taco. We see the corn, the cooking, the grinding, the masa and the morning it took to get here. La Chingada is Mexican street food built from the ground up on Dundas West."
      image="/images/craft/tortillas-on-griddle-960.webp"
      imageAlt="Fresh La Chingada corn tortillas cooking across the kitchen griddle"
    >
      <section className="editorial-menu-group">
        <p className="eyebrow">One tortilla · Six steps · Every day</p>
        <h2>From Mexico to your table.</h2>
        <div className="editorial-grid">
          {tortillaSteps.map((step, index) => (
            <article className="editorial-card" key={step.name}>
              <p className="eyebrow">
                0{index + 1} / {step.name}
              </p>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="editorial-hero has-image">
        <div className="editorial-copy">
          <p className="eyebrow">The bar does its homework.</p>
          <h2>A margarita is only as good as what goes into it.</h2>
          <p>
            Our eleven signature margaritas start well before anyone shakes a
            glass. We prepare our infusions, citrus liqueur, syrups, salts,
            sugars and garnishes in-house. Real ingredients and time do the
            work.
          </p>
          <a href="/menu#margaritas">
            Meet the margarita lineup <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="editorial-hero-media">
          <img
            src="/images/optimized/margarita-patio-photo-960.webp"
            srcSet="/images/optimized/margarita-patio-photo-640.webp 640w, /images/optimized/margarita-patio-photo-960.webp 960w, /images/optimized/margarita-patio-photo-1023.webp 1023w"
            width="1023"
            height="1537"
            sizes="(max-width: 720px) 100vw, 50vw"
            alt="La Chingada house margarita in a cut-glass tumbler"
            loading="lazy"
          />
        </div>
      </section>
      <div className="editorial-grid">
        {barCraft.map((craft) => (
          <article className="editorial-card" key={craft.title}>
            <h3>{craft.title}</h3>
            <p>{craft.detail}</p>
          </article>
        ))}
      </div>
      <section className="editorial-card">
        <p className="eyebrow">More things we make here</p>
        <h2>The details are the point.</h2>
        <p>
          House hot sauces built from whole ingredients. Fresh fruit purées.
          Aguas frescas with strawberry, hibiscus, citrus, horchata, pineapple
          and mango. These are the everyday jobs behind the food and drinks.
        </p>
        <p>
          Happy Hour and AYCE keep that same preparation, that same pour and
          that same taco size. The price changes. The work still gets done.
        </p>
        <div className="editorial-actions">
          <a href="/happy-hour">
            Happy Hour <span aria-hidden="true">→</span>
          </a>
          <a href="/all-you-can-eat-tacos">
            Thursday tacos <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <EditorialFaq
        items={[
          {
            question: "Does La Chingada make its own tortillas?",
            answer:
              "Yes. We cook imported Mexican corn, grind fresh masa, machine-press the tortillas and grill them for service in our Toronto kitchen every morning.",
          },
          {
            question: "Where does the corn come from?",
            answer:
              "We import one tonne of corn from Mexico to Canada every six months.",
          },
          {
            question: "What is made in-house behind the bar?",
            answer:
              "Our bar preparation includes tequila infusions, our own triple sec, syrups, liqueurs, salts, sugars, purées, dried garnishes and fresh aguas frescas.",
          },
        ]}
      />
    </EditorialPage>
  );
}
