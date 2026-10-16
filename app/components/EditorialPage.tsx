import type { ReactNode } from "react";
import { Brand } from "./Brand";
import {
  instagramUrl,
  mapsUrl,
  orderUrl,
  reservationUrl,
  safeJsonLd,
  siteUrl,
  telephoneUrl,
} from "../site-config";

type EditorialPageProps = {
  path: string;
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  heroGraphic?: ReactNode;
  heroActions?: ReactNode;
  children: ReactNode;
};

const editorialPhotos: Record<
  string,
  { src: string; srcSet: string; width: number; height: number }
> = {
  "/images/optimized/la-chingada-bar-interior-591.webp": {
    src: "/images/optimized/la-chingada-bar-interior-591.webp",
    srcSet: "/images/optimized/la-chingada-bar-interior-591.webp 591w",
    width: 591,
    height: 1280,
  },
  "/images/craft/tortillas-on-griddle-960.webp": {
    src: "/images/craft/tortillas-on-griddle-960.webp",
    srcSet:
      "/images/craft/tortillas-on-griddle-640.webp 640w, /images/craft/tortillas-on-griddle-960.webp 960w, /images/craft/tortillas-on-griddle-1440.webp 1440w",
    width: 1457,
    height: 884,
  },
  "/images/tacos-real-food.png": {
    src: "/images/optimized/tacos-real-food-960.webp",
    srcSet:
      "/images/optimized/tacos-real-food-640.webp 640w, /images/optimized/tacos-real-food-960.webp 960w, /images/optimized/tacos-real-food-1280.webp 1280w",
    width: 1280,
    height: 721,
  },
  "/images/margarita-patio-photo.webp": {
    src: "/images/optimized/margarita-patio-photo-960.webp",
    srcSet:
      "/images/optimized/margarita-patio-photo-640.webp 640w, /images/optimized/margarita-patio-photo-960.webp 960w, /images/optimized/margarita-patio-photo-1023.webp 1023w",
    width: 1023,
    height: 1537,
  },
  "/images/street-corn-hero.jpg": {
    src: "/images/optimized/street-corn-hero-960.webp",
    srcSet:
      "/images/optimized/street-corn-hero-640.webp 640w, /images/optimized/street-corn-hero-960.webp 960w, /images/optimized/street-corn-hero-1440.webp 1440w",
    width: 2048,
    height: 1120,
  },
  "/images/venue/hidden-patio-1280.webp": {
    src: "/images/venue/hidden-patio-960.webp",
    srcSet:
      "/images/venue/hidden-patio-640.webp 640w, /images/venue/hidden-patio-960.webp 960w, /images/venue/hidden-patio-1280.webp 1280w",
    width: 1280,
    height: 591,
  },
};

export function EditorialPage({
  path,
  label,
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  heroGraphic,
  heroActions,
  children,
}: EditorialPageProps) {
  const photo = image ? editorialPhotos[image] : undefined;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "La Chingada Toronto",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${siteUrl}${path}`,
      },
    ],
  };

  return (
    <div className="editorial-page">
      <a href="#page-content" className="skip-link">
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbs) }}
      />
      <header className="editorial-header">
        <a href="/" aria-label="La Chingada Toronto home">
          <Brand compact />
        </a>
        <nav aria-label="Main navigation">
          <a href="/menu" aria-current={path === "/menu" ? "page" : undefined}>
            Menu
          </a>
          <a
            href="/happy-hour"
            aria-current={path === "/happy-hour" ? "page" : undefined}
          >
            Happy Hour
          </a>
          <a
            href="/our-story"
            aria-current={path === "/our-story" ? "page" : undefined}
          >
            Our story
          </a>
          <a href="/#visit">Visit</a>
          <a
            href="/arcade"
            aria-current={path === "/arcade" ? "page" : undefined}
          >
            Arcade
          </a>
          <a
            href="/agave"
            aria-current={path === "/agave" ? "page" : undefined}
          >
            Agave Library
          </a>
        </nav>
        <a
          className="button"
          href={reservationUrl}
          target="_blank"
          rel="noreferrer"
        >
          Book a table <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main id="page-content" className="editorial-body">
        <nav className="editorial-breadcrumb" aria-label="Breadcrumb">
          <a href="/">La Chingada</a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{label}</span>
        </nav>
        <section
          className={`editorial-hero${image || heroGraphic ? " has-image" : ""}`}
        >
          <div className="editorial-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{intro}</p>
            {heroActions ?? (
              <div className="editorial-actions">
                <a
                  className="button"
                  href={reservationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a table <span aria-hidden="true">↗</span>
                </a>
                <a href="/#visit">
                  1242 Dundas West <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
          {heroGraphic ? (
            <div className="editorial-hero-media editorial-hero-graphic">
              {heroGraphic}
            </div>
          ) : (
            image && (
              <div className="editorial-hero-media">
                <img
                  src={photo?.src ?? image}
                  srcSet={photo?.srcSet}
                  width={photo?.width}
                  height={photo?.height}
                  sizes="(max-width: 760px) 100vw, 50vw"
                  alt={imageAlt ?? "La Chingada Toronto"}
                  fetchPriority="high"
                />
              </div>
            )
          )}
        </section>
        {children}
        <section className="editorial-card editorial-visit">
          <p className="eyebrow">Mexican corn. Toronto hands.</p>
          <h2>Your table is on Dundas West.</h2>
          <p>
            1242 Dundas Street West, Toronto, ON M6J 1X5. Reservations for up to
            six guests. Walk-ins welcome when service allows.
          </p>
          <div className="editorial-actions">
            <a
              className="button"
              href={reservationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Check availability <span aria-hidden="true">↗</span>
            </a>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              Get directions <span aria-hidden="true">↗</span>
            </a>
            <a href={telephoneUrl}>416-535-2242</a>
          </div>
        </section>
      </main>
      <footer className="site-footer editorial-footer">
        <a href="/" aria-label="La Chingada Toronto home">
          <Brand />
        </a>
        <p>
          Mexican street food. Fresh tortillas. A proper bar.
          <br />
          1242 Dundas Street West · Toronto
        </p>
        <nav className="editorial-link-list" aria-label="Explore La Chingada">
          <a href="/menu">Food & drinks</a>
          <a href="/happy-hour">Happy Hour</a>
          <a href="/all-you-can-eat-tacos">AYCE tacos</a>
          <a href="/patio">The patio</a>
          <a href="/brunch">Brunch · coming soon</a>
          <a href="/our-story">Our story</a>
          <a href="/agave">Agave Library</a>
          <a href="/arcade">Chingada Arcade</a>
        </nav>
        <div className="editorial-link-list">
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <a href={orderUrl} target="_blank" rel="noreferrer">
            Order delivery <span aria-hidden="true">↗</span>
          </a>
          <a href={telephoneUrl}>416-535-2242</a>
          <a href="mailto:reservations@lachingada.ca">
            reservations@lachingada.ca
          </a>
        </div>
        <small>
          © {new Date().getUTCFullYear()} La Chingada Toronto. Dine-in specials
          subject to availability. Please drink responsibly.
        </small>
      </footer>
    </div>
  );
}

export function EditorialFaq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="editorial-faq">
      <p className="eyebrow">Before you come by</p>
      <h2>A few good questions.</h2>
      {items.map(({ question, answer }) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </section>
  );
}
