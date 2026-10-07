import type { Metadata } from "next";
import { guideArticles } from "@/data/guides";
import PageHero from "@/components/PageHero";
import { ArticleCard } from "@/components/guide/ArticleCard";
import { Container } from "@/components/ui/Section";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guía de crianza",
  description:
    "Guía gratuita de cría de gallinas: cómo elegir una gallina, diferencias entre gallinas y gallos, preparar el gallinero, alimentación básica, agua y cuidados diarios.",
  alternates: { canonical: "/guia" },
  openGraph: {
    title: "Guía de crianza | Pinapolis",
    description:
      "Todo lo que necesitás saber antes de tu primer gallinero: elección, gallinero, alimentación y cuidados.",
    images: ["/images/guia/consejos-para-principiantes.webp"],
  },
};

export default function GuidePage() {
  return (
    <>
      <PageHero
        kicker="Guía gratuita"
        title="Aprendé a criar gallinas"
        description="Artículos claros para tu primer gallinero: qué ave elegir, cómo armar el gallinero, qué dar de comer y cómo cuidar el plantel día a día."
        tone="forest"
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guideArticles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </Container>
      </div>

      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Guía", href: "/guia" },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Guía de crianza de Pinapolis",
            itemListElement: guideArticles.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: a.title,
              url: new URL(`/guia/${a.slug}`, "https://pinapolis.example").toString(),
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
