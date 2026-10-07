import type { MetadataRoute } from "next";
import { business } from "@/data/business";

/**
 * robots.txt generado.
 * Permite indexar todo y referencia el sitemap.
 * La URL del sitemap sale de NEXT_PUBLIC_SITE_URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${business.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
