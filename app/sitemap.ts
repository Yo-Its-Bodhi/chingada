import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://la-chingada-toronto.druwbi.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${siteUrl}/images/street-corn-hero.jpg`,
        `${siteUrl}/images/tacos-real-food.png`,
        `${siteUrl}/images/margarita-program-hero.webp`,
      ],
    },
  ];
}
