import { Search, MessageCircle, ClipboardCheck, Truck } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/** Flujo ideal de compra (INICIO → CATÁLOGO → … → CONSULTA). */
const STEPS = [
  {
    icon: Search,
    title: "Explorá el catálogo",
    text: "Filtrá por categoría, raza, sexo o disponibilidad y encontrá el ejemplar que buscás.",
  },
  {
    icon: MessageCircle,
    title: "Consultá por el ejemplar",
    text: "Con “Consultar” se abre el mensaje con el nombre del producto ya cargado. Sin vueltas.",
  },
  {
    icon: ClipboardCheck,
    title: "Coordinamos la entrega",
    text: "Respondemos tu consulta y coordinamos la forma de entrega o retiro según tu zona.",
  },
  {
    icon: Truck,
    title: "Seguimiento",
    text: "Después de la entrega seguimos disponibles para dudas de manejo y cuidados.",
  },
];

export default function HowItWorks() {
  return (
    <Section ariaLabel="Cómo funciona" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker="Cómo funciona"
          title="Del catálogo a tu gallinero"
          description="Un flujo simple, pensado para que consultar por un ejemplar tome menos de un minuto."
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 110} as="li">
              <div className="relative">
                {/* Conector */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-12 top-8 hidden w-[calc(100%-3rem)] border-t-2 border-dashed border-olive-300 lg:block"
                  />
                )}
                <div className="relative inline-grid h-16 w-16 place-items-center rounded-2xl bg-forest-700 text-cream-50 shadow-soft ring-4 ring-cream-100">
                  <step.icon aria-hidden="true" className="h-7 w-7" />
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-honey-400 font-display text-sm font-bold text-forest-950 ring-2 ring-cream-50"
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-forest-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
