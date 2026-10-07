import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Heart } from "lucide-react";
import { breeds } from "@/data/breeds";
import { productsByBreed } from "@/data/products";
import { APTITUDE_LABELS, type Breed } from "@/data/types";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import Meter from "@/components/ui/Meter";

/** Tarjeta de raza reutilizable (portada y listado). */
export function BreedCard({ breed, index = 0 }: { breed: Breed; index?: number }) {
  const available = productsByBreed(breed.slug).filter(
    (p) => p.availability === "disponible"
  ).length;

  return (
    <Reveal delay={(index % 3) * 100}>
      <Link
        href={`/razas/${breed.slug}`}
        className="card card-hover group block overflow-hidden"
        aria-label={`Conocé la raza ${breed.name}`}
      >
        <div className="relative overflow-hidden">
          <Image
            src={breed.image}
            alt={breed.imageAlt}
            width={800}
            height={600}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-forest-950/85 to-transparent p-4 pt-10">
            <span className="rounded-full bg-cream-50/15 px-3 py-1 text-xs font-bold text-cream-50 ring-1 ring-cream-50/25 backdrop-blur-sm">
              {breed.origin}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-cream-100">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              {available > 0 ? `${available} ejemplar${available > 1 ? "es" : ""} hoy` : "Consultar stock"}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-forest-950">
              {breed.name}
            </h3>
            <Badge tone="olive" className="shrink-0">
              {APTITUDE_LABELS[breed.aptitudes[0]]}
            </Badge>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
            {breed.description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-cream-200 pt-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
              <Heart aria-hidden="true" className="h-3.5 w-3.5 text-terra-500" />
              {breed.temperament.split(";")[0].split(".")[0]}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-forest-700 transition-colors group-hover:text-terra-600">
              Ver raza
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/** Razas destacadas en la portada. */
export default function FeaturedBreeds() {
  const featured = breeds.slice(0, 3);

  return (
    <Section ariaLabel="Razas destacadas" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker="Nuestras razas"
          title="Razas con carácter y propósito"
          description="De la ponedora incansable a la imponente Brahma: cada raza tiene una personalidad. Entrá a la ficha y conocé su origen, temperamento y cuidados."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((breed, i) => (
            <BreedCard key={breed.slug} breed={breed} index={i} />
          ))}
        </div>
        <Reveal delay={150}>
          <div className="mt-10 text-center">
            <Link href="/razas" className="btn-primary">
              Ver todas las razas
              <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Indicadores de la ficha de raza (reutilizado en /razas/[slug]). */
export function BreedMeters({ breed }: { breed: Breed }) {
  return (
    <div className="space-y-4">
      <Meter label="Producción de huevos" value={eggScore(breed)} />
      <Meter label="Tamaño" value={sizeScore(breed)} />
      <Meter label="Rusticidad" value={breed.hardiness} />
      <Meter label="Temperamento dócil" value={breed.docility} />
      <Meter
        label="Aptitud para carne"
        value={breed.aptitudes.includes("carne") || breed.aptitudes.includes("doble-proposito") ? 4 : 2}
      />
      <Meter
        label="Aptitud para postura"
        value={breed.aptitudes.includes("postura") || breed.aptitudes.includes("doble-proposito") ? eggScore(breed) : 2}
      />
    </div>
  );
}

/** Puntaje 1–5 derivado del nivel cualitativo de postura. */
function eggScore(breed: Breed): 1 | 2 | 3 | 4 | 5 {
  switch (breed.eggProduction) {
    case "Muy alta":
      return 5;
    case "Alta":
      return 4;
    case "Buena":
      return 3;
    case "Media":
      return 2;
    default:
      return 1;
  }
}

/** Puntaje 1–5 derivado del tamaño cualitativo. */
function sizeScore(breed: Breed): 1 | 2 | 3 | 4 | 5 {
  switch (breed.size) {
    case "Muy grande":
      return 5;
    case "Grande":
      return 4;
    case "Mediana-grande":
      return 3;
    default:
      return 2;
  }
}
