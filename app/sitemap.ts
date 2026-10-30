import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jbirdsall.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://jbirdsall.dev/climber",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://jbirdsall.dev/chess",
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
