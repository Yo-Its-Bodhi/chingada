import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://la-chingada-toronto.druwbi.chatgpt.site";
const seoDescription = "Mexican street food on Dundas West, Toronto: fresh tacos, house margaritas, daily Happy Hour, Thursday AYCE tacos and a hidden patio.";

export const viewport: Viewport = {
  themeColor: "#171411",
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
  keywords: [
    "La Chingada Toronto",
    "Mexican restaurant Toronto",
    "Mexican restaurant Dundas West",
    "tacos Toronto",
    "margaritas Toronto",
    "happy hour Toronto",
    "patio Toronto",
    "all you can eat tacos Toronto",
    "AYCE tacos Toronto",
    "Mexican street food Toronto",
    "Dundas West restaurant",
    "fresh corn tortillas Toronto",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_CA",
    siteName: "La Chingada Toronto",
    title: "La Chingada Toronto — Tacos, Margaritas, Happy Hour & Patio",
    description: seoDescription,
    images: [{
      url: "/images/street-corn-hero.jpg",
      width: 2048,
      height: 1120,
      alt: "Mexican street corn at La Chingada Toronto",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Chingada Toronto — Tacos, Margaritas, Happy Hour & Patio",
    description: seoDescription,
    images: ["/images/street-corn-hero.jpg"],
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
    "codex-preview": "development",
    "geo.region": "CA-ON",
    "geo.placename": "Toronto",
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: "La Chingada",
  alternateName: "La Chingada Toronto",
  description: seoDescription,
  slogan: "Serious tacos. Questionable behaviour.",
  url: siteUrl,
  image: [
    `${siteUrl}/images/street-corn-hero.jpg`,
    `${siteUrl}/images/tacos-real-food.png`,
    `${siteUrl}/images/margarita-program-hero.webp`,
  ],
  logo: `${siteUrl}/favicon.png`,
  telephone: "+1-416-535-2242",
  email: "reservations@lachingada.ca",
  priceRange: "$$",
  currenciesAccepted: "CAD",
  servesCuisine: ["Mexican", "Mexican street food", "Tacos", "Margaritas"],
  acceptsReservations: true,
  menu: `${siteUrl}/#menu`,
  hasMenu: {
    "@type": "Menu",
    name: "La Chingada Food and Drinks Menu",
    url: `${siteUrl}/#menu`,
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
  hasMap: "https://www.google.com/maps/search/?api=1&query=La+Chingada+1242+Dundas+Street+West+Toronto",
  sameAs: ["https://www.instagram.com/la_chingada/"],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Hidden back patio", value: true },
    { "@type": "LocationFeatureSpecification", name: "Walk-ins welcome", value: true },
  ],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday"], opens: "16:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Thursday", "Friday", "Saturday"], opens: "12:00", closes: "23:00" },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Daily Happy Hour",
      description: "Daily from 4–7 PM with $10 margaritas and twelve $6 food items; the food menu runs all day Wednesday.",
      url: `${siteUrl}/#specials`,
    },
    {
      "@type": "Offer",
      name: "Thursday All You Can Eat Tacos",
      description: "Fourteen taco choices with a one-hour dining limit.",
      price: "29.95",
      priceCurrency: "CAD",
      url: `${siteUrl}/#specials`,
    },
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: `${siteUrl}/#reserve`,
    result: { "@type": "FoodEstablishmentReservation" },
  },
};

const jsonLd = JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <head>
        <link rel="icon" href="/favicon-48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/favicon.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        {children}
      </body>
    </html>
  );
}
