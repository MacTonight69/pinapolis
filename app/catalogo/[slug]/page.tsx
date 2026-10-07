import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { getBreed } from "@/data/breeds";
import { formatPrice } from "@/lib/format";
import {
  AVAILABILITY_LABELS,
  type Availability,
} from "@/data/types";
import PageHero from "@/components/PageHero";
import Badge from "@/components/ui/Badge";
import ConsultPanel from "@/components/ConsultPanel";
import { ProductCard } from "@/components/home/FeaturedProducts";
import Reveal from "@/components/ui/Reveal";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  productJsonLd,
} from "@/lib/seo";

/** Slugs para pre-renderizar todas las fichas. */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/** Metadata por producto. */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const breed = product.breedSlug ? getBreed(product.breedSlug) : undefined;
  return {
    title: product.name,
    description: `${product.species}${
      breed ? ` de raza ${breed.name}` : ""
    }: ${product.description} Disponibilidad: ${
      AVAILABILITY_LABELS[product.availability]
    }. Consultá por él en Pinapolis.`,
    alternates: { canonical: `/catalogo/${product.slug}` },
    openGraph: {
      title: `${product.name} | Pinapolis`,
      description: product.description,
      images: [{ url: product.image, width: 800, height: 600 }],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const breed = product.breedSlug
    ? getBreed(product.breedSlug)
    : undefined;
  const availabilityTone: Record<Availability, "forest" | "honey" | "terra"> = {
    disponible: "forest",
    "a-pedido": "honey",
    consultar: "terra",
  };

  // Relacionados: misma categoría (y misma raza si es posible)
  const related = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.breedSlug === product.breedSlug ||
          p.category === product.category)
    )
    .slice(0, 3);

  return (
    <>
      <PageHero
        kicker={`${product.species}${breed ? " · " + breed.name : ""}`}
        title={product.name}
        description={product.description}
        tone="forest"
      />

      <div className="texture-paper bg-cream-100 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Migas de pan" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-500">
              <li>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-forest-700"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  Volver al catálogo
                </Link>
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* Foto */}
            <Reveal>
              <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-cream-300">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={1000}
                  height={750}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>

            {/* Datos */}
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={availabilityTone[product.availability]}>
                    {AVAILABILITY_LABELS[product.availability]}
                  </Badge>
                  {product.sex !== "—" && (
                    <Badge tone="cream">{product.sex}</Badge>
                  )}
                  {breed && (
                    <Link
                      href={`/razas/${breed.slug}`}
                      className="badge bg-forest-100 text-forest-700 transition-colors hover:bg-forest-200"
                    >
                      Raza {breed.name}
                    </Link>
                  )}
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-5 flex items-end gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500">
                      Precio
                    </p>
                    <p className="font-display text-4xl font-semibold text-forest-900">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  {product.price === null && (
                    <p className="pb-1.5 text-sm text-ink-500">
                      Cotizamos según cantidad y edad
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-700">
                  <p>{product.description}</p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-cream-300 py-5">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">
                      Especie
                    </dt>
                    <dd className="mt-0.5 font-semibold text-forest-900">
                      {product.species}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">
                      Sexo
                    </dt>
                    <dd className="mt-0.5 font-semibold text-forest-900">
                      {product.sex}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">
                      Edad / etapa
                    </dt>
                    <dd className="mt-0.5 font-semibold text-forest-900">
                      {product.age}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">
                      Disponibilidad
                    </dt>
                    <dd className="mt-0.5 font-semibold text-forest-900">
                      {AVAILABILITY_LABELS[product.availability]}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={260}>
                <div className="mt-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-terra-600">
                    Características
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {product.traits.map((trait) => (
                      <li
                        key={trait}
                        className="flex items-start gap-2.5 text-sm font-semibold text-ink-700"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="mt-0.5 h-4.5 w-4.5 shrink-0 text-olive-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 12.5l5 5L20 6.5" />
                        </svg>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {breed && (
                <Reveal delay={320}>
                  <Link
                    href={`/razas/${breed.slug}`}
                    className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-forest-100 px-5 py-3.5 text-sm font-bold text-forest-800 ring-1 ring-forest-200 transition-all hover:bg-forest-200"
                  >
                    <Clock aria-hidden="true" className="h-4.5 w-4.5" />
                    ¿Sabías que la raza {breed.name} es «{breed.temperament.split(".")[0].toLowerCase()}»?
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </Reveal>
              )}
            </div>
          </div>

          {/* Consulta */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <ConsultPanel
                itemName={product.name}
                extra={
                  breed
                    ? `raza ${breed.name}, ${product.sex.toLowerCase()}, ${product.age.toLowerCase()}`
                    : `${product.sex.toLowerCase()}, ${product.age.toLowerCase()}`
                }
              />
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl bg-forest-800 p-6 text-cream-50 shadow-soft sm:p-8">
                <h2 className="font-display text-2xl font-semibold">
                  Antes de consultar
                </h2>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-cream-100/90">
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-honey-400 font-bold text-forest-950 text-xs">
                      1
                    </span>
                    Decí tu zona o localidad: coordinamos entrega o retiro según la distancia.
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-honey-400 font-bold text-forest-950 text-xs">
                      2
                    </span>
                    Contá tu experiencia previa: ajustamos el asesoramiento (primer gallinero o plantel grande).
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-honey-400 font-bold text-forest-950 text-xs">
                      3
                    </span>
                    Si buscás varias aves, mencionalo: hay mejores condiciones por cantidad.
                  </li>
                </ul>
                {breed && (
                  <p className="mt-6 rounded-xl bg-cream-50/10 p-4 text-xs leading-relaxed text-cream-200">
                    <strong className="text-honey-300">Raza {breed.name}:</strong>{" "}
                    {breed.availabilityNote}
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          {/* Relacionados */}
          {related.length > 0 && (
            <div className="mt-16">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold text-forest-950">
                  También te puede interesar
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Datos estructurados */}
      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Catálogo", href: "/catalogo" },
            { label: product.name, href: `/catalogo/${product.slug}` },
          ])
        )}
      />
      <script
        {...jsonLdScript(productJsonLd(product, breed?.name))}
      />
    </>
  );
}
