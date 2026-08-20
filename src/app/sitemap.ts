import type { MetadataRoute } from "next";
import { templatedSectorSlugs } from "@/content/sectors";

const base = "https://redplanetglobal.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/healthcare", priority: 0.9 },
    ...templatedSectorSlugs.map((s) => ({ path: `/sectors/${s}`, priority: 0.9 })),
    { path: "/capabilities", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
