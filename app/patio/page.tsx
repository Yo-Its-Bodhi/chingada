import { EditorialFaq, EditorialPage } from "../components/EditorialPage";
import { pageMetadata } from "../site-config";

export const metadata = pageMetadata(
  "Hidden Mexican Restaurant Patio on Dundas West",
  "Find La Chingada's hidden back patio in Toronto: Mexican street food, fresh tacos and house margaritas at 1242 Dundas West. Weather dependent, first come first served.",
  "/patio",
  "/images/venue/hidden-patio-1280.webp",
);

export default function PatioPage() {
  return (
    <EditorialPage
      path="/patio"
      label="The patio"
      eyebrow="Out the back · Dundas West, Toronto"
      title="A little further from the street."
      intro="Our hidden back patio has fresh tacos, a proper margarita and room to settle in. Find us on Dundas West, then find your way to the back when the weather is on our side."
      image="/images/venue/hidden-patio-1280.webp"
      imageAlt="La Chingada's hidden back patio with a painted mural, wooden tables and flowers beneath the pergola"
    >
      <div className="editorial-grid">
        <section className="editorial-card">
          <p className="eyebrow">Good weather. Good company.</p>
          <h2>The patio plan.</h2>
          <p>
            Patio seating is first come, first served and weather dependent.
            Check with the team on arrival for current seating availability.
          </p>
          <p>
            Reservations are available for the restaurant for groups of up to
            six; they do not guarantee a patio table.
          </p>
        </section>
        <section className="editorial-card">
          <p className="eyebrow">Start with the good stuff</p>
          <h2>Tortillas. Tequila. Repeat.</h2>
          <p>
            Fresh house-made corn tortillas, tacos with fourteen different
            fillings and eleven signature margaritas. We make our own infusions,
            syrups, rims and garnishes.
          </p>
          <div className="editorial-actions">
            <a href="/menu">
              Explore food & drinks <span aria-hidden="true">→</span>
            </a>
            <a href="/happy-hour">
              Happy Hour details <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
      <section className="editorial-card">
        <p className="eyebrow">1242 Dundas Street West</p>
        <h2>Meet us in the neighbourhood.</h2>
        <p>
          La Chingada is on Dundas West in Toronto, near Dovercourt Road. The
          505 Dundas streetcar serves the neighbourhood. Street parking is
          limited, so allow time to get here.
        </p>
        <p>
          Sunday noon–9 PM · Monday–Wednesday 4–10 PM · Thursday–Saturday
          noon–11 PM. Patio service depends on conditions.
        </p>
      </section>
      <EditorialFaq
        items={[
          {
            question: "Does La Chingada have a patio?",
            answer:
              "Yes. There is a hidden back patio at our restaurant on 1242 Dundas Street West, Toronto. Seating is weather dependent and first come, first served.",
          },
          {
            question: "Can I reserve a patio table?",
            answer:
              "Patio tables are first come, first served. Restaurant reservations do not guarantee a patio table. Speak with the team when you arrive.",
          },
          {
            question: "Is the patio open today?",
            answer:
              "Patio service depends on weather and current conditions. Call 416-535-2242 for today's availability before making a special trip.",
          },
          {
            question: "Where is La Chingada in Toronto?",
            answer:
              "1242 Dundas Street West, Toronto, Ontario M6J 1X5, near Dovercourt Road. You can get directions using the map link below.",
          },
        ]}
      />
    </EditorialPage>
  );
}
