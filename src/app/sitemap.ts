import type { MetadataRoute } from "next";
import { BLOG } from "@/data/blog";
import { LEGAL_LINKS } from "@/data/legal";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/neden", "/ucretlendirme", "/blog"].map((path) => ({
    url: SITE_URL + path,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
  const blogRoutes = BLOG.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  const legalRoutes = LEGAL_LINKS.map(([id]) => ({
    url: `${SITE_URL}/yasal/${id}`,
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));
  return [...staticRoutes, ...blogRoutes, ...legalRoutes];
}
