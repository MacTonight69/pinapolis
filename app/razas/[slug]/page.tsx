import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, HeartHandshake } from "lucide-react";
import { breeds, getBreed } from "@/data/breeds";
import { productsByBreed } from "@/data/products";
import { APTITUDE_LABELS } from "@/data/types";
import PageHero from "@/components/PageHero";
import Badge from "@/components/ui/Badge";
import Meter from "@/components/ui/Meter";
import { BreedMeters } from "@/components/home/FeaturedBreeds";
import { ProductCard } from "@/components/home/FeaturedProducts";
import ConsultPanel from "@/components/ConsultPanel";
import Reveal from "@/components/ui/Reveal";
import {
  breadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/seo";

export function generateStaticParams() {
  return breeds.map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) return {};
  return {
    title: `Raza ${breed.name}`,
    description: `${breed.name}: raza ${breed.aptitudes
      .map((a) => APTITUDE_LABELS[a])
      .join(" y ")} de origen ${breed.origin}. ${
      breed.description
    } Temperamento: ${breed.temperament}.`,
    alternates: { canonical: `/razas/${breed.slug}` },
    openGraph: {
      title: `Raza ${breed.name} | Pinapolis`,
      description: breed.description,
      images: [{ url: breed.image, width: 1100, height: 800 }],
    },
  };
}

export default async function BreedDetailPage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) notFound();

  const available = productsByBreed(breed.slug);

  return (
    <>
      <PageHero
        kicker={`Raza · ${breed.origin}`}
        title={breed.name}
        description={breed.description}
        tone="forest"
      />

      <div className="texture-paper bg-cream-100 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-500">
              <li>
                <Link
                  href="/razas"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-forest-700"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  Volver a razas
                </Link>
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
            {/* Foto + origen */}
            <div>
              <Reveal>
                <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-cream-300">
                  <Image
                    src={breed.image}
                    alt={breed.imageAlt}
                    width={1100}
                    height={820}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    priority
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  <div className="card p-4">
                    <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-500">
                      <MapPin aria-hidden="true" className="h-4 w-4 text-terra-500" />
                      Origen
                    </dt>
                    <dd className="mt-1.5 font-semibold text-forest-900">
                      {breed.origin}
                    </dd>
                  </div>
                  <div className="card p-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">
                      Tamaño
                    </dt>
                    <dd className="mt-1.5 font-semibold text-forest-900">
                      {breed.size}
                    </dd>
                  </div>
                  <div className="card p-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">
                      Huevos
                    </dt>
                    <dd className="mt-1.5 font-semibold text-forest-900">
                      {breed.eggColor} · producción {breed.eggProduction.toLowerCase()}
                    </dd>
                  </div>
                  <div className="card p-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">
                      Aptitud
                    </dt>
                    <dd className="mt-1.5 font-semibold text-forest-900">
                      {breed.aptitudes.map((a) => APTITUDE_LABELS[a]).join(" · ")}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            {/* Info */}
            <div>
              <Reveal>
                <div className="flex flex-wrap gap-2">
                  {breed.aptitudes.map((a) => (
                    <Badge key={a} tone="olive">
                      {APTITUDE_LABELS[a]}
                    </Badge>
                  ))}
                  <Badge tone="honey">
                    Rusticidad {breed.hardiness}/5
                  </Badge>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-6">
                  <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-terra-600">
                    Indicadores orientativos
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
                    Escala 1–5 según la raza; varía según línea
                    genética, manejo y alimentación.
                  </p>
                  <div className="mt-4 rounded-2xl bg-cream-50 p-5 ring-1 ring-cream-200">
                    <BreedMeters breed={breed} />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-6">
                  <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-terra-600">
                    Características físicas
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {breed.physicalTraits.map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-2.5 text-sm font-medium text-ink-700"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 12.5l5 5L20 6.5" />
                        </svg>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    <strong className="text-forest-900">Coloración:</strong>{" "}
                    {breed.coloration}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    <strong className="text-forest-900">Temperamento:</strong>{" "}
                    {breed.temperament}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Cuidados + curiosidad */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full p-6 sm:p-7">
                <h2 className="flex items-center gap-2.5 font-display text-2xl font-semibold text-forest-950">
                  <HeartHandshake aria-hidden="true" className="h-6 w-6 text-terra-500" />
                  Recomendaciones de crianza
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {breed.care.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink-700"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-olive-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12.5l5 5L20 6.5" />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="card h-full bg-forest-800 p-6 text-cream-50 ring-forest-700 sm:p-7">
                <h2 className="font-display text-2xl font-semibold">
                  ¿Lo sabías?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-cream-100">
                  {breed.curiosity}
                </p>
                <div className="mt-6 rounded-xl bg-cream-50/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-honey-300">
                    Meter de rusticidad
                  </p>
                  <Meter
                    tone="dark"
                    label="Resistencia a climas y enfermedades comunes"
                    value={breed.hardiness}
                  />
                  <div className="mt-4">
                    <Meter
                      tone="dark"
                      label="Docilidad (manejabilidad)"
                      value={breed.docility}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Disponibilidad en Pinapolis */}
          <div className="mt-14">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-forest-950">
                Disponibilidad en Pinapolis
              </h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-ink-500">
                {breed.availabilityNote}
              </p>
            </Reveal>
            {available.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {available.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            ) : (
              <Reveal delay={100}>
                <div className="card mt-8 p-8 text-center">
                  <p className="text-lg font-semibold text-forest-900">
                    No hay ejemplares de esta raza publicados ahora mismo
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    Las rotaciones del criadero cambian según la temporada.
                    Consultanos: a veces tenemos aves que aún no publicamos.
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          {/* Consulta */}
          <div className="mt-14">
            <ConsultPanel
              itemName={`raza ${breed.name}`}
              extra={`origen ${breed.origin}, aptitud ${breed.aptitudes
                .map((a) => APTITUDE_LABELS[a])
                .join(" y ")
                .toLowerCase()}`}
            />
          </div>
        </div>
      </div>

      {/* Datos estructurados */}
      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Razas", href: "/razas" },
            { label: breed.name, href: `/razas/${breed.slug}` },
          ])
        )}
      />
    </>
  );
}
