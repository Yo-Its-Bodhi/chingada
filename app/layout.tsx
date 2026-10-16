import type { Metadata, Viewport } from "next";
import {
  instagramUrl,
  mapsUrl,
  reservationUrl,
  restaurantId,
  safeJsonLd,
  siteUrl,
} from "./site-config";
import "./globals.css";

const seoDescription =
  "Mexican street food on Dundas West, Toronto: fresh tacos, house margaritas, daily Happy Hour, Thursday AYCE tacos and a hidden patio.";

export const viewport: Viewport = {
  themeColor: "#bd3026",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Chingada Toronto | Mexican Restaurant, Tacos & Margaritas",
    template: "%s | La Chingada Toronto",
  },
  description: seoDescription,
  applicationName: "La Chingada Toronto",
  category: "restaurant",
  creator: "La Chingada Toronto",
  publisher: "La Chingada Toronto",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_CA",
    siteName: "La Chingada Toronto",
    title: "La Chingada Toronto — Tacos, Margaritas, Happy Hour & Patio",
    description: seoDescription,
    images: [
      {
        url: "/brand/social-card.jpg",
        width: 1200,
        height: 630,
        alt: "La Chingada — Mexican street food, Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Chingada Toronto — Tacos, Margaritas, Happy Hour & Patio",
    description: seoDescription,
    images: ["/brand/social-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Toronto",
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": restaurantId,
  name: "La Chingada",
  alternateName: "La Chingada Toronto",
  description: seoDescription,
  slogan: "Mexican corn. Toronto hands.",
  url: siteUrl,
  image: [
    `${siteUrl}/images/optimized/street-corn-hero-1440.webp`,
    `${siteUrl}/images/optimized/tacos-real-food-1280.webp`,
    `${siteUrl}/images/optimized/margarita-patio-photo-1023.webp`,
  ],
  logo: `${siteUrl}/brand/la-chingada-logo.png`,
  telephone: "+1-416-535-2242",
  email: "reservations@lachingada.ca",
  priceRange: "$$",
  currenciesAccepted: "CAD",
  servesCuisine: ["Mexican", "Mexican street food"],
  acceptsReservations: true,
  menu: `${siteUrl}/menu`,
  hasMenu: {
    "@type": "Menu",
    name: "La Chingada Food and Drinks Menu",
    "@id": `${siteUrl}/menu#menu`,
    url: `${siteUrl}/menu`,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1242 Dundas Street West",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M6J 1X5",
    addressCountry: "CA",
  },
  areaServed: { "@type": "City", name: "Toronto" },
  hasMap: mapsUrl,
  sameAs: [instagramUrl],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Hidden back patio",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Walk-ins welcome",
      value: true,
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "12:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
      opens: "16:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Thursday", "Friday", "Saturday"],
      opens: "12:00",
      closes: "23:00",
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Daily Happy Hour",
      description:
        "Daily from 4–7 PM with $10 margaritas and twelve $6 food items; the food menu runs all day Wednesday.",
      url: `${siteUrl}/happy-hour`,
    },
    {
      "@type": "Offer",
      name: "Thursday All You Can Eat Tacos",
      description: "Fourteen taco choices with a one-hour dining limit.",
      price: "29.95",
      priceCurrency: "CAD",
      url: `${siteUrl}/all-you-can-eat-tacos`,
    },
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: reservationUrl,
    result: { "@type": "FoodEstablishmentReservation" },
  },
};

const jsonLd = safeJsonLd(restaurantJsonLd);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <head>
        <link
          rel="preload"
          href="/fonts/barlow-condensed-extrabold-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/dm-sans-latin-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon-48.png"
          sizes="48x48"
          type="image/png"
        />
        <link rel="icon" href="/favicon.png" sizes="512x512" type="image/png" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
