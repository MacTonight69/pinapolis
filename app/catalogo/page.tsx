import type { Metadata } from "next";
import { business } from "@/data/business";
import { products } from "@/data/products";
import { breeds } from "@/data/breeds";
import PageHero from "@/components/PageHero";
import CatalogClient, {
  type CatalogFilters,
} from "@/components/catalog/CatalogClient";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Catálogo de aves",
  description:
    "Catálogo de Pinapolis: gallinas, gallos, pollitas, pollos, parejas y huevos fértiles. Filtrá por raza, sexo, disponibilidad o aptitud y consultá por el ejemplar que buscás.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo de aves | Pinapolis",
    description:
      "Gallinas, gallos, pollitas y pollos de raza. Filtrá por raza, sexo y disponibilidad.",
    images: ["/images/sitio/hero.webp"],
  },
};

/** Rango de precios de demostración para el catálogo. */
function catalogSummary() {
  const disponibles = products.filter(
    (p) => p.availability === "disponible"
  ).length;
  return `Catálogo de ${products.length} ejemplares (${disponibles} disponibles). Razas: ${breeds.map((b) => b.name).join(", ")}.`;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const single = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : undefined;
  };

  const filters: CatalogFilters = {
    categoria: single("categoria"),
    raza: single("raza"),
    sexo: single("sexo"),
    disponibilidad: single("disponibilidad"),
    aptitud: single("aptitud"),
    q: single("q"),
  };

  return (
    <>
      <PageHero
        kicker="Catálogo"
        title="Ejemplares disponibles"
        description={`${products.length} aves en el criadero: gallinas, gallos, pollitas y más. Filtrá por lo que buscás y consultá directamente por cada ejemplar.`}
        tone="forest"
      />
      <CatalogClient initialFilters={filters} />

      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Catálogo", href: "/catalogo" },
          ])
        )}
      />
      {/* Descripción estructurada del catálogo (SEO, no visible) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Catálogo de aves de Pinapolis",
            description: catalogSummary(),
            itemListElement: products.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: new URL(`/catalogo/${p.slug}`, business.siteUrl).toString(),
              name: p.name,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
