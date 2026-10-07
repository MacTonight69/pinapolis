import { business, hasAddress, hasPhone } from "@/data/business";
import type { BreadcrumbItem, Faq, Product } from "@/data/types";

/**
 * Helpers de datos estructurados (JSON-LD).
 * Nunca inventan datos: los campos sin configurar se omiten.
 */

const sanitize = (json: unknown) =>
  JSON.stringify(json).replace(/</g, "\\u003c");

/** Componente <script> listo para renderizar en un Server Component. */
export function jsonLdScript(data: unknown) {
  return {
    dangerouslySetInnerHTML: { __html: sanitize(data) },
    type: "application/ld+json",
  } as const;
}

/** Organización / negocio local (solo campos realmente configurados). */
export function organizationJsonLd() {
  const sameAs = [business.instagram, business.facebook].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.shortDescription,
    url: business.siteUrl,
    ...(hasPhone ? { telephone: business.phone } : {}),
    ...(hasAddress ? { address: business.address } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: business.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${business.siteUrl}/catalogo?q={query}`,
      "query-input": "required name=query",
    },
  };
}

/** FAQPage para listas de preguntas frecuentes. */
export function faqPageJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/**
 * Producto. Solo se emite `offers` si hay precio configurado:
 * nunca se inventan precios en los datos estructurados.
 */
export function productJsonLd(product: Product, breedName?: string) {
  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: new URL(product.image, business.siteUrl).toString(),
    category: product.category,
  };
  if (breedName) json.brand = { "@type": "Brand", name: breedName };
  if (product.price !== null && product.price > 0) {
    json.offers = {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability:
        product.availability === "disponible"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
    };
  }
  return json;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: new URL(item.href, business.siteUrl).toString(),
    })),
  };
}
