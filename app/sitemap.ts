import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${siteUrl}/images/optimized/street-corn-hero-1440.webp`,
        `${siteUrl}/images/optimized/tacos-real-food-1280.webp`,
        `${siteUrl}/images/optimized/margarita-patio-photo-1023.webp`,
      ],
    },
    ...[
      {
        path: "/menu",
        image: "/images/optimized/tacos-real-food-1280.webp",
        priority: 0.9,
      },
      {
        path: "/happy-hour",
        image: "/images/optimized/margarita-patio-photo-1023.webp",
        priority: 0.8,
      },
      {
        path: "/all-you-can-eat-tacos",
        image: "/images/optimized/barbacoa-taco-600.webp",
        priority: 0.8,
      },
      {
        path: "/patio",
        image: "/images/optimized/margarita-patio-photo-1023.webp",
        priority: 0.7,
      },
      {
        path: "/brunch",
        image: "/images/optimized/street-corn-hero-1440.webp",
        priority: 0.5,
      },
      {
        path: "/our-story",
        image: "/images/optimized/tacos-real-food-1280.webp",
        priority: 0.7,
      },
      { path: "/arcade", image: "/brand/social-card.jpg", priority: 0.6 },
      {
        path: "/agave",
        image: "/images/optimized/la-chingada-bar-interior-591.webp",
        priority: 0.7,
      },
    ].map(({ path, image, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority,
      images: [`${siteUrl}${image}`],
    })),
  ];
}
