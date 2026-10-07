import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { products } from "@/data/products";
import { breeds } from "@/data/breeds";
import { guideArticles } from "@/data/guides";

/**
 * Sitemap XML generado desde los datos del sitio.
 * Se actualiza solo al agregar productos/razas/artículos.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/catalogo`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/razas`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/guia`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contacto`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/creditos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/privacidad`, priority: 0.2 },
    { url: `${base}/legal/terminos`, priority: 0.2 },
    { url: `${base}/legal/cookies`, priority: 0.2 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/catalogo/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const breedPages: MetadataRoute.Sitemap = breeds.map((b) => ({
    url: `${base}/razas/${b.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const guidePages: MetadataRoute.Sitemap = guideArticles.map((a) => ({
    url: `${base}/guia/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...productPages, ...breedPages, ...guidePages];
}
