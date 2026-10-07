import { Star } from "lucide-react";
import { testimonials, testimonialsAreDemo } from "@/data/testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";

/**
 * Testimonios.
 * Si `testimonialsAreDemo` está en true, la sección muestra
 * una etiqueta DEMO visible (los testimonios son inventados).
 * Si el array está vacío, la sección no se renderiza.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section
      ariaLabel="Testimonios de clientes"
      className="texture-paper bg-cream-100 py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          kicker="Clientes"
          title="Lo que dicen de Pinapolis"
          description="Reseñas de quienes ya se llevaron ejemplares a su gallinero."
        />
        {testimonialsAreDemo && (
          <Reveal delay={80}>
            <p className="mx-auto mt-5 max-w-xl rounded-xl bg-honey-400/20 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-wood-700 ring-1 ring-honey-400/50">
              Contenido de demostración — reemplazar por reseñas reales
            </p>
          </Reveal>
        )}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <figure className="card card-hover flex h-full flex-col p-6">
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label={`Calificación: ${t.rating} de 5 estrellas`}
                >
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      aria-hidden="true"
                      className={
                        s < t.rating
                          ? "h-5 w-5 fill-honey-400 text-honey-500"
                          : "h-5 w-5 fill-cream-300 text-cream-400"
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-cream-200 pt-4">
                  <div>
                    <p className="font-bold text-forest-900">{t.name}</p>
                    <p className="text-xs text-ink-500">{t.location}</p>
                  </div>
                  {testimonialsAreDemo && <Badge tone="honey">DEMO</Badge>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
