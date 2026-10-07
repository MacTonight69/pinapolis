import Hero from "@/components/home/Hero";
import Reasons from "@/components/home/Reasons";
import FeaturedBreeds from "@/components/home/FeaturedBreeds";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutTeaser from "@/components/home/AboutTeaser";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";
import {
  organizationJsonLd,
  webSiteJsonLd,
  jsonLdScript,
  breadcrumbJsonLd,
} from "@/lib/seo";

/**
 * INICIO — landing principal.
 *
 * Secciones: Hero · Razones · Razas destacadas ·
 * Ejemplares destacados · Sobre el criadero · Cómo funciona ·
 * Testimonios (DEMO) · FAQ · CTA final.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Reasons />
      <FeaturedBreeds />
      <FeaturedProducts />
      <AboutTeaser />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <FinalCta />

      {/* Datos estructurados (SEO) */}
      <script {...jsonLdScript(organizationJsonLd())} />
      <script {...jsonLdScript(webSiteJsonLd())} />
      <script
        {...jsonLdScript(
          breadcrumbJsonLd([{ label: "Inicio", href: "/" }])
        )}
      />
    </>
  );
}
