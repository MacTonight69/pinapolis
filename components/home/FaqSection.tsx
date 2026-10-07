import { faqs } from "@/data/faqs";
import { faqPageJsonLd, jsonLdScript } from "@/lib/seo";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";

/** Preguntas frecuentes de la portada (con JSON-LD para SEO). */
export default function FaqSection() {
  return (
    <Section ariaLabel="Preguntas frecuentes" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker="Dudas frecuentes"
          title="Preguntas que nos hacen seguido"
          description="¿Edades, entregas, visitas, razas para tu primer gallinero? Acá están las respuestas."
        />
        <Reveal delay={120}>
          <div className="card mx-auto mt-12 max-w-3xl p-6 sm:p-8">
            <Accordion items={faqs} />
          </div>
        </Reveal>
      </Container>
      {/* Datos estructurados FAQPage (SEO) */}
      <script
        {...jsonLdScript(faqPageJsonLd(faqs))}
      />
    </Section>
  );
}
