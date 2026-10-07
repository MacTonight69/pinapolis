import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hasWhatsapp } from "@/data/business";
import { consultUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/** CTA final: banner terracota con textura y llamados a la acción. */
export default function FinalCta() {
  const cta = consultUrl("ejemplares disponibles");

  return (
    <section
      aria-label="Consultá por tus aves"
      className="relative overflow-hidden bg-terra-700 py-18 text-cream-50 sm:py-24"
    >
      {/* Textura y degradado */}
      <div className="texture-grain absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 120% at 85% 20%, rgba(234,181,78,0.2), transparent 60%), radial-gradient(40% 90% at 10% 90%, rgba(44,64,36,0.35), transparent 60%)",
        }}
      />

      <Container className="relative z-10 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            ¿Listo para armar tu gallinero?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream-100">
            Contanos qué buscás: huevos, carne, compañía o tu primera
            cría. Te asesoramos sin cargo y te pasamos la disponibilidad
            real de la semana.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/catalogo"
              className="btn bg-cream-50 px-8 py-4 text-terra-600 hover:bg-cream-100 hover:shadow-lift active:scale-[0.98]"
            >
              Explorar el catálogo
              <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
            </Link>
            {cta.type === "whatsapp" ? (
              <a
                href={cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-forest-800 text-cream-50 px-8 py-4 hover:bg-forest-900 hover:shadow-lift active:scale-[0.98]"
              >
                Escribir por WhatsApp
              </a>
            ) : (
              <Link
                href={cta.url}
                className="btn bg-forest-800 text-cream-50 px-8 py-4 hover:bg-forest-900 hover:shadow-lift active:scale-[0.98]"
              >
                Enviar consulta
              </Link>
            )}
          </div>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-8 text-sm text-cream-100/90">
            {hasWhatsapp
              ? "Respondemos en horario de atención. Las consultas con nombre del ejemplar tienen prioridad."
              : "El canal de WhatsApp se configura antes de publicar: por ahora, consultá por el formulario."}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
