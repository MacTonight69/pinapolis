import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Egg, Feather } from "lucide-react";
import { business } from "@/data/business";
import { consultUrl } from "@/lib/whatsapp";
import { Ornament, Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/**
 * Hero principal: imagen destacada a todo el ancho,
 * mensaje de presentación y CTAs.
 */
export default function Hero() {
  const cta = consultUrl("ejemplares disponibles");

  return (
    <section
      aria-label="Presentación de Pinapolis"
      className="relative overflow-hidden bg-forest-950 text-cream-50"
    >
      {/* Imagen destacada */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/sitio/hero.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          className="object-cover"
        />
        {/* Degradado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/75 to-forest-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-forest-950/40" />
        <div className="texture-grain absolute inset-0" />
      </div>

      <Container className="relative z-10 flex min-h-[calc(100svh-7rem)] items-center py-16 sm:min-h-[calc(100svh-8rem)] sm:py-20">
        <div className="max-w-2xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-honey-300 ring-1 ring-cream-50/20 backdrop-blur-sm">
              <Feather aria-hidden="true" className="h-3.5 w-3.5" />
              {business.tagline}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Gallinas y gallos
              <span className="block text-honey-300">criados con dedicación</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90 sm:text-xl">
              En Pinapolis seleccionamos cada ejemplar con cuidado: razas de
              postura, doble propósito y compañía, con asesoramiento honesto
              para que tu gallinero empiece con el pie derecho.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/catalogo" className="btn bg-honey-400 px-7 py-3.5 text-forest-950 hover:bg-honey-300 hover:shadow-lift active:scale-[0.98]">
                Explorar el catálogo
                <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
              </Link>
              {cta.type === "whatsapp" ? (
                <a href={cta.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Consultar disponibilidad
                </a>
              ) : (
                <Link href={cta.url} className="btn-secondary">
                  Consultar disponibilidad
                </Link>
              )}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-12 flex max-w-lg flex-wrap gap-x-10 gap-y-5">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-cream-300/70">
                  Razas
                </dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-cream-50">
                  10+
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-cream-300/70">
                  Categorías
                </dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-cream-50">
                  7
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-cream-300/70">
                  Asesoramiento
                </dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-cream-50">
                  <Egg aria-hidden="true" className="mr-1 inline h-6 w-6 text-honey-400" />
                  Personalizado
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>

      {/* Separador ornamental inferior */}
      <div className="relative z-10 pb-8" aria-hidden="true">
        <Container>
          <Ornament className="!text-cream-300/30" />
        </Container>
      </div>

      {/* Acceso directo al catálogo (lectores de pantalla) */}
      <span className="sr-only">
        <Link href="/catalogo">Ir al catálogo de aves</Link>
      </span>
    </section>
  );
}
