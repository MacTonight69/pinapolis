import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { featuredProducts } from "@/data/products";
import { getBreed } from "@/data/breeds";
import { formatPrice } from "@/lib/format";
import { consultUrl } from "@/lib/whatsapp";
import { AVAILABILITY_LABELS, type Product } from "@/data/types";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";

/** Tarjeta de producto reutilizable (portada y catálogo). */
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const breed = product.breedSlug
    ? getBreed(product.breedSlug)
    : undefined;
  const cta = consultUrl(product.name, breed ? `raza ${breed.name}` : undefined);

  const availabilityTone =
    product.availability === "disponible"
      ? "forest"
      : product.availability === "a-pedido"
        ? "honey"
        : "terra";

  return (
    <Reveal delay={(index % 3) * 100} as="article">
      <div className="card card-hover flex h-full flex-col overflow-hidden">
        {/* Imagen */}
        <Link
          href={`/catalogo/${product.slug}`}
          className="group relative block overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={product.image}
            alt=""
            width={800}
            height={600}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </Link>

        <div className="flex flex-1 flex-col p-5">
          {/* Encabezado */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-terra-600">
                {product.species}
                {breed ? ` · ${breed.name}` : ""}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-forest-950">
                <Link href={`/catalogo/${product.slug}`} className="transition-colors hover:text-forest-700">
                  {product.name}
                </Link>
              </h3>
            </div>
            <Badge tone={availabilityTone} className="shrink-0">
              {AVAILABILITY_LABELS[product.availability]}
            </Badge>
          </div>

          {/* Descripción */}
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-500">
            {product.description}
          </p>

          {/* Características */}
          <ul className="mt-4 space-y-1.5">
            {product.traits.slice(0, 3).map((trait) => (
              <li
                key={trait}
                className="flex items-start gap-2 text-xs font-semibold text-ink-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-olive-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                {trait}
              </li>
            ))}
          </ul>

          {/* Pie: precio + CTA */}
          <div className="mt-auto flex items-end justify-between gap-3 border-t border-cream-200 pt-4 mt-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
                Precio
              </p>
              <p className="font-display text-lg font-semibold text-forest-800">
                {formatPrice(product.price)}
              </p>
            </div>
            {cta.type === "whatsapp" ? (
              <a
                href={cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terra px-5 py-2.5 text-sm"
                aria-label={`Consultar por ${product.name} por WhatsApp`}
              >
                Consultar
              </a>
            ) : (
              <Link
                href={cta.url}
                className="btn-terra px-5 py-2.5 text-sm"
                aria-label={`Consultar por ${product.name}`}
              >
                Consultar
              </Link>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Ejemplares destacados en la portada. */
export default function FeaturedProducts() {
  return (
    <Section
      ariaLabel="Ejemplares destacados"
      className="texture-paper bg-cream-100 py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          kicker="Catálogo"
          title="Ejemplares que buscan hogar"
          description="Una selección de lo que tenemos en el criadero. Cada tarjeta tiene el botón “Consultar” para escribirnos directamente con el nombre del ejemplar ya cargado."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
        <Reveal delay={150}>
          <div className="mt-10 text-center">
            <Link href="/catalogo" className="btn-primary">
              Ver catálogo completo
              <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
