import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { business } from "@/data/business";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/**
 * Presentación del criadero en la portada.
 *
 * ⚠️ El texto es GENÉRICO Y EDITABLE: reemplazalo por la
 * historia real de Pinapolis en este mismo archivo
 * (data → `aboutCopy`) antes de publicar.
 */
const aboutCopy = {
  title: "Un criadero nacido del amor por las aves",
  paragraphs: [
    "Pinapolis es un criadero dedicado a la cría responsable de gallinas, gallos y aves de corral. Trabajamos con razas reconocidas, seleccionamos cada ejemplar con criterio y acompañamos a cada cliente antes y después de la compra.",
    "Nuestro objetivo es simple: que cada ave llegue a un gallinero donde se sienta bien, y que cada persona que arranca su crianza lo haga con la información clara. No vendemos lo que no criamos ni recomendamos lo que no funciona.",
  ],
  values: [
    "Ejemplares revisados uno por uno",
    "Asesoramiento según tu caso",
    "Manejo extensivo y respetuoso",
    "Respuestas claras y honestas",
  ],
};

export default function AboutTeaser() {
  return (
    <Section ariaLabel="Sobre el criadero" className="texture-paper bg-cream-100 py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-cream-300">
                <Image
                  src="/images/sitio/nosotros.webp"
                  alt="Aves camperas pastando en un prado"
                  width={900}
                  height={640}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  loading="lazy"
                  className="aspect-[7/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              {/* Sello flotante */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 animate-float">
                <div className="rounded-2xl bg-forest-800 px-5 py-4 text-cream-50 shadow-lift ring-1 ring-forest-700">
                  <p className="font-display text-2xl font-semibold">{business.name}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-honey-300">
                    Criadero de aves
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              kicker="Sobre nosotros"
              title={aboutCopy.title}
            />
            <Reveal delay={100}>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-700">
                {aboutCopy.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {aboutCopy.values.map((value) => (
                  <li
                    key={value}
                    className="flex items-start gap-3 text-sm font-semibold text-forest-800"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-terra-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5 5L20 6.5" />
                    </svg>
                    {value}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <Link href="/nosotros" className="btn-outline mt-9">
                Conocé más sobre nosotros
                <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
