import type { Metadata } from "next";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://lachingada.ca"
).replace(/\/$/, "");
export const restaurantId = `${siteUrl}/#restaurant`;
export const reservationUrl =
  process.env.NEXT_PUBLIC_RESERVATION_URL?.trim() || "https://rezzo.bodhix.io";
export const arcadeGamesUrl =
  process.env.NEXT_PUBLIC_ARCADE_URL?.trim() ||
  "https://taco-smack-table.lachingada1242.chatgpt.site/";
export const arcadeRequiresSignIn =
  process.env.NEXT_PUBLIC_ARCADE_REQUIRES_SIGN_IN !== "false";
export const orderUrl =
  "https://order.store/store/la-chingada-1242-dundas-st-w/GAGuGYkPR1WXgc_LV9VxDQ";
export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=La+Chingada+1242+Dundas+Street+West+Toronto";
export const instagramUrl = "https://www.instagram.com/la_chingada/";
export const telephoneUrl = "tel:+14165352242";

const socialPhotos: Record<string, string> = {
  "/images/tacos-real-food.png": "/images/optimized/tacos-real-food-1280.webp",
  "/images/margarita-patio-photo.webp":
    "/images/optimized/margarita-patio-photo-1023.webp",
  "/images/street-corn-hero.jpg":
    "/images/optimized/street-corn-hero-1440.webp",
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/optimized/tacos-real-food-960.webp",
): Metadata {
  const socialImage = socialPhotos[image] ?? image;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | La Chingada Toronto`,
      description,
      type: "website",
      locale: "en_CA",
      siteName: "La Chingada Toronto",
      url: path,
      images: [
        {
          url: socialImage,
          alt: "La Chingada Mexican street food and bar in Toronto",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | La Chingada Toronto`,
      description,
      images: [socialImage],
    },
  };
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
