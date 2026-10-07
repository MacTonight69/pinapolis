import {
  HeartHandshake,
  SearchCheck,
  Sparkles,
  MessagesSquare,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/** Razones para elegir Pinapolis. */
const REASONS = [
  {
    icon: SearchCheck,
    title: "Selección responsable",
    text: "Cada ejemplar se revisa antes de entregarse: plumaje, postura, ánimo y salud general.",
  },
  {
    icon: HeartHandshake,
    title: "Trato cercano",
    text: "Te asesoramos según tu espacio, experiencia y objetivo, sin vueltas ni letra chica.",
  },
  {
    icon: Sparkles,
    title: "Crianza en libertad",
    text: "Nuestras aves crecen en corrales amplios, con alimentación natural y manejo respetuoso.",
  },
  {
    icon: MessagesSquare,
    title: "Seguimiento",
    text: "La consulta no termina con la venta: podés escribirnos cuando sea para dudas de manejo.",
  },
];

export default function Reasons() {
  return (
    <Section ariaLabel="Razones para elegir Pinapolis" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Por qué elegirnos"
          title="Un criadero que acompaña"
          description="No solo vendemos aves: te guiamos antes y después de la compra."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 90}>
              <article className="card card-hover h-full p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-100 text-forest-700">
                  <reason.icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-forest-950">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {reason.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
