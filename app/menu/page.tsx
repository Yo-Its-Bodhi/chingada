import { EditorialFaq, EditorialPage } from "../components/EditorialPage";
import { dietaryText, dishes, type Dish } from "../menu-data";
import { orderUrl, pageMetadata, safeJsonLd, siteUrl } from "../site-config";

export const metadata = pageMetadata(
  "Mexican Food & Drinks Menu on Dundas West",
  "Explore La Chingada's Toronto menu: tacos on fresh house-made corn tortillas, Mexican street food, 11 signature margaritas, cocktails and non-alcoholic drinks.",
  "/menu",
);

const groups = [
  "Appetizers",
  "Tacos",
  "Meals",
  "Desserts",
  "Margaritas",
  "Cocktails",
  "Beer",
  "Wine",
  "Non-Alcoholic",
];
const groupId = (group: string) =>
  group.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const diets: Record<string, string> = {
  GF: "https://schema.org/GlutenFreeDiet",
  V: "https://schema.org/VegetarianDiet",
  VG: "https://schema.org/VeganDiet",
};
const dishNotes = (dish: Dish) =>
  [dietaryText(dish.tags), dish.spicy ? "Spicy" : ""]
    .filter(Boolean)
    .join(" · ");

const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${siteUrl}/menu#menu`,
  name: "La Chingada Food and Drinks Menu",
  url: `${siteUrl}/menu`,
  inLanguage: "en-CA",
  hasMenuSection: groups.map((group) => ({
    "@type": "MenuSection",
    name: group,
    hasMenuItem: dishes
      .filter((dish) => dish.group === group)
      .map((dish) => ({
        "@type": "MenuItem",
        name: dish.name,
        description: dish.desc,
        ...(dish.tags
          ? {
              suitableForDiet: dish.tags
                .map((tag) => diets[tag])
                .filter(Boolean),
            }
          : {}),
        ...(dish.image
          ? {
              image: `${siteUrl}${dish.image === "/images/barbacoa-taco.png" ? "/images/optimized/barbacoa-taco-600.webp" : dish.image}`,
            }
          : {}),
        ...(/^\$\d+(?:\.\d+)?$/.test(dish.price)
          ? {
              offers: {
                "@type": "Offer",
                price: dish.price.slice(1),
                priceCurrency: "CAD",
              },
            }
          : {}),
      })),
  })),
};

export default function MenuPage() {
  return (
    <EditorialPage
      path="/menu"
      label="Food & drinks"
      eyebrow="The menu · Mexican street food · Toronto"
      title="Made here. Worth coming for."
      intro="Tacos built on corn from Mexico and tortillas made here every morning. Proper street food, a generous bar and a reason to stay for another round."
      image="/images/tacos-real-food.png"
      imageAlt="Two freshly made tacos at La Chingada Toronto"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(menuSchema) }}
      />
      <nav
        className="editorial-link-list editorial-menu-nav"
        aria-label="Menu categories"
      >
        {groups.map((group) => (
          <a key={group} href={`#${groupId(group)}`}>
            {group}
          </a>
        ))}
      </nav>
      <div className="editorial-grid">
        <a className="editorial-card" href="/happy-hour">
          <p className="eyebrow">Every day · 4–7 PM</p>
          <h2>Happy Hour.</h2>
          <p>
            Twelve $6 food items. $10 margaritas. Food specials all day
            Wednesday.
          </p>
          <span>
            See the special menu <span aria-hidden="true">→</span>
          </span>
        </a>
        <a className="editorial-card" href="/all-you-can-eat-tacos">
          <p className="eyebrow">Every Thursday · $29.95 per guest</p>
          <h2>All-you-can-eat tacos.</h2>
          <p>
            Fourteen taco choices. One hour. Fresh tortillas all the way
            through.
          </p>
          <span>
            See tacos & the details <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
      <p className="editorial-menu-note">
        Prices in Canadian dollars. Dietary details appear beneath each dish.
        Tell the team about allergies and ask about ingredients and preparation
        before ordering.
      </p>
      {groups.map((group) => (
        <section
          className="editorial-menu-group"
          id={groupId(group)}
          key={group}
        >
          <p className="eyebrow">
            {["Margaritas", "Cocktails", "Beer", "Wine"].includes(group)
              ? "From the bar"
              : "From the kitchen"}
          </p>
          <h2>
            {group === "Non-Alcoholic" ? "Without the booze." : `${group}.`}
          </h2>
          {group === "Tacos" && (
            <p>
              We cook and grind Mexican corn into masa, then press and grill
              our tortillas here every morning.
            </p>
          )}
          {group === "Margaritas" && (
            <p>
              House-infused tequila, our own triple sec, fresh fruit and
              house-made rims. Eleven signatures; every one with work behind it.
            </p>
          )}
          <div className="editorial-menu-items">
            {dishes
              .filter((dish) => dish.group === group)
              .map((dish) => (
                <article className="editorial-menu-item" key={dish.name}>
                  <div className="editorial-menu-item-heading">
                    <h3>{dish.name}</h3>
                    <span className="editorial-menu-price">{dish.price}</span>
                  </div>
                  <p>{dish.desc}</p>
                  {dishNotes(dish) && (
                    <p className="editorial-menu-tags">{dishNotes(dish)}</p>
                  )}
                </article>
              ))}
          </div>
        </section>
      ))}
      <section className="editorial-card">
        <p className="eyebrow">Weekend brunch · coming soon</p>
        <h2>The next good reason to come by.</h2>
        <p>
          Our brunch menu is in the works. It is not being served yet. See what
          we are planning and check back for the launch.
        </p>
        <a href="/brunch">
          Meet the upcoming brunch menu <span aria-hidden="true">→</span>
        </a>
      </section>
      <EditorialFaq
        items={[
          {
            question: "Do you have vegetarian and vegan tacos?",
            answer:
              "Yes. The menu includes halloumi, mushroom and sweet potato tacos. Sweet potato is marked vegan; halloumi and mushroom are vegetarian. Ask the team about specific ingredients or substitutions.",
          },
          {
            question: "Can I order La Chingada for delivery?",
            answer:
              "Yes. Use our delivery link to see current availability and place an order. Happy Hour and AYCE specials are dine-in only.",
          },
          {
            question: "Where can I find your tequila and mezcal selection?",
            answer:
              "Explore the Agave Library for our bottle catalogue and tasting information. The team can help with current availability at the bar.",
          },
        ]}
      />
      <div className="editorial-actions">
        <a className="button" href={orderUrl} target="_blank" rel="noreferrer">
          Order delivery <span aria-hidden="true">↗</span>
        </a>
        <a href="/agave">
          Explore the Agave Library <span aria-hidden="true">→</span>
        </a>
      </div>
    </EditorialPage>
  );
}
