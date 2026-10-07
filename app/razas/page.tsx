import type { Metadata } from "next";
import { breeds } from "@/data/breeds";
import PageHero from "@/components/PageHero";
import { BreedCard } from "@/components/home/FeaturedBreeds";
import { Container } from "@/components/ui/Section";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Razas de gallinas",
  description:
    "Conocé las razas de gallinas de Pinapolis: Plymouth Rock, Rhode Island Red, Leghorn, Sussex, Orpington, Brahma, Australorp y más. Origen, temperamento, postura y cuidados.",
  alternates: { canonical: "/razas" },
  openGraph: {
    title: "Razas de gallinas | Pinapolis",
    description:
      "Plymouth Rock, Rhode Island Red, Leghorn, Sussex, Orpington, Brahma y más: ficha completa de cada raza.",
    images: ["/images/breeds/plymouth-rock.webp"],
  },
};

export default function BreedsPage() {
  return (
    <>
      <PageHero
        kicker="Razas"
        title="Razas de gallinas y gallos"
        description="Cada raza tiene su carácter, su producción y su origen. Entrá a la ficha para ver indicadores de postura, rusticidad y temperamento, además de los ejemplares disponibles hoy."
        tone="forest"
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {breeds.map((breed, i) => (
              <BreedCard key={breed.slug} breed={breed} index={i} />
            ))}
          </div>
        </Container>
      </div>

      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Razas", href: "/razas" },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Razas de Pinapolis",
            itemListElement: breeds.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.name,
              url: new URL(`/razas/${b.slug}`, "https://pinapolis.example").toString(),
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
