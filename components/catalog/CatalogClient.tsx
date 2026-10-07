"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, RotateCcw, X } from "lucide-react";
import { CATEGORIES, CATEGORY_LABELS, AVAILABILITY_LABELS, APTITUDE_LABELS, type Product, type Availability, type Sex } from "@/data/types";
import { breeds, getBreed } from "@/data/breeds";
import { products } from "@/data/products";
import { ProductCard } from "@/components/home/FeaturedProducts";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface CatalogFilters {
  categoria?: string;
  raza?: string;
  sexo?: string;
  disponibilidad?: string;
  aptitud?: string;
  q?: string;
}

const SEX_OPTIONS: { value: Sex; label: string }[] = [
  { value: "Hembra", label: "Hembra" },
  { value: "Macho", label: "Macho" },
  { value: "Mixto", label: "Mixto" },
  { value: "—", label: "Sin sexo (huevos)" },
];

const APTITUDE_OPTIONS = [
  { value: "postura", label: "Postura" },
  { value: "carne", label: "Carne" },
  { value: "doble-proposito", label: "Doble propósito" },
];

/** Normaliza texto para búsqueda (ignora tildes y mayúsculas). */
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Filtra el catálogo según los filtros activos. */
function filterProducts(all: Product[], f: CatalogFilters) {
  return all.filter((p) => {
    if (f.categoria && p.category !== f.categoria) return false;
    if (f.raza && p.breedSlug !== f.raza) return false;
    if (f.sexo && p.sex !== f.sexo) return false;
    if (f.disponibilidad && p.availability !== f.disponibilidad) return false;
    if (f.aptitud) {
      const breed = p.breedSlug ? getBreed(p.breedSlug) : undefined;
      if (!breed) return false;
      const ok =
        f.aptitud === "doble-proposito"
          ? breed.aptitudes.includes("doble-proposito")
          : breed.aptitudes.includes(f.aptitud as never);
      if (!ok) return false;
    }
    if (f.q) {
      const q = normalize(f.q);
      const breed = p.breedSlug ? getBreed(p.breedSlug) : undefined;
      const haystack = normalize(
        [p.name, p.species, p.description, breed?.name ?? "", breed?.origin ?? ""].join(" ")
      );
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/** Cuántos filtros (distintos de vacío) hay activos. */
function countActive(f: CatalogFilters) {
  return Object.values(f).filter((v) => v && v !== "").length;
}

export default function CatalogClient({
  initialFilters,
}: {
  initialFilters: CatalogFilters;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);
  const [isPending, startTransition] = useTransition();

  /** Actualiza un filtro y sincroniza la URL (sin recargar). */
  const update = (patch: Partial<CatalogFilters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) {
      if (v) params.set(k, v as string);
    }
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  };

  const clear = () => update({
    categoria: undefined,
    raza: undefined,
    sexo: undefined,
    disponibilidad: undefined,
    aptitud: undefined,
    q: undefined,
  });

  const results = useMemo(
    () => filterProducts(products, filters),
    [filters]
  );
  const activeCount = countActive(filters);

  return (
    <Section ariaLabel="Catálogo de aves" className="py-12 sm:py-16">
      <Container>
        {/* ── Barra de filtros ─────────────────────────── */}
        <div className="card space-y-5 p-5 sm:p-6" role="search">
          {/* Búsqueda por texto */}
          <div className="relative">
            <label htmlFor="busqueda" className="sr-only">
              Buscar por nombre, raza o descripción
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500"
            />
            <input
              id="busqueda"
              type="search"
              value={filters.q ?? ""}
              onChange={(e) => update({ q: e.target.value || undefined })}
              placeholder="Buscá por nombre, raza o descripción…"
              className="field !pl-11"
            />
            {filters.q && (
              <button
                type="button"
                onClick={() => update({ q: undefined })}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-ink-500 hover:bg-cream-200 cursor-pointer"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Categorías (chips) */}
          <fieldset>
            <legend className="mb-2.5 text-sm font-bold text-forest-900">
              Categoría
            </legend>
            <ul className="flex flex-wrap gap-2" role="list">
              <li>
                <button
                  type="button"
                  aria-pressed={!filters.categoria}
                  onClick={() => update({ categoria: undefined })}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer",
                    !filters.categoria
                      ? "bg-forest-700 text-cream-50 shadow-soft"
                      : "bg-cream-100 text-ink-700 ring-1 ring-cream-300 hover:bg-cream-200"
                  )}
                >
                  Todas
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    aria-pressed={filters.categoria === cat.id}
                    onClick={() =>
                      update({
                        categoria:
                          filters.categoria === cat.id ? undefined : cat.id,
                      })
                    }
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer",
                      filters.categoria === cat.id
                        ? "bg-forest-700 text-cream-50 shadow-soft"
                        : "bg-cream-100 text-ink-700 ring-1 ring-cream-300 hover:bg-cream-200"
                    )}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          {/* Selects: raza, sexo, disponibilidad, aptitud */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              id="filtro-raza"
              label="Raza"
              value={filters.raza ?? ""}
              onChange={(v) => update({ raza: v || undefined })}
            >
              <option value="">Todas las razas</option>
              {breeds.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              id="filtro-sexo"
              label="Sexo"
              value={filters.sexo ?? ""}
              onChange={(v) => update({ sexo: v || undefined })}
            >
              <option value="">Cualquier sexo</option>
              {SEX_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              id="filtro-disponibilidad"
              label="Disponibilidad"
              value={filters.disponibilidad ?? ""}
              onChange={(v) =>
                update({ disponibilidad: v || undefined })
              }
            >
              <option value="">Cualquiera</option>
              {(Object.keys(AVAILABILITY_LABELS) as Availability[]).map(
                (k) => (
                  <option key={k} value={k}>
                    {AVAILABILITY_LABELS[k]}
                  </option>
                )
              )}
            </FilterSelect>

            <FilterSelect
              id="filtro-aptitud"
              label="Aptitud"
              value={filters.aptitud ?? ""}
              onChange={(v) => update({ aptitud: v || undefined })}
            >
              <option value="">Cualquier aptitud</option>
              {APTITUDE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </FilterSelect>
          </div>

          {/* Resultados + limpiar */}
          <div className="flex items-center justify-between gap-4 border-t border-cream-200 pt-4">
            <p
              aria-live="polite"
              className="text-sm font-semibold text-ink-700"
            >
              {results.length}{" "}
              {results.length === 1 ? "ejemplar" : "ejemplares"}
              {activeCount > 0 && (
                <span className="font-normal text-ink-500">
                  {" "}
                  con {activeCount} filtro{activeCount > 1 ? "s" : ""}
                </span>
              )}
            </p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-terra-600 transition-colors hover:bg-terra-500/10 cursor-pointer"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* ── Grilla de resultados ─────────────────────── */}
        <div
          className={cn(
            "mt-10 transition-opacity duration-300",
            isPending && "opacity-60"
          )}
        >
          {results.length > 0 ? (
            <ul
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              aria-label="Ejemplares encontrados"
            >
              {results.map((p, i) => (
                <li key={p.slug}>
                  <ProductCard product={p} index={i} />
                </li>
              ))}
            </ul>
          ) : (
            /* Estado vacío: búsqueda o filtros sin resultados */
            <Reveal>
              <div className="card mx-auto max-w-xl p-10 text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream-200 text-ink-500"
                >
                  <Search className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-forest-950">
                  No encontramos ejemplares
                </h2>
                <p className="mt-3 leading-relaxed text-ink-500">
                  Ningún ejemplar coincide con esa búsqueda o esos filtros.
                  Probá con otra raza, quitá algún filtro o consultanos
                  directamente: a veces tenemos aves que aún no publicamos.
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="btn-outline mt-6"
                >
                  <RotateCcw aria-hidden="true" className="h-4.5 w-4.5" />
                  Limpiar búsqueda y filtros
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}

/** Select con label visible (accesible y coherente). */
function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-bold text-forest-900"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235d844b%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[right_0.9rem_center] bg-no-repeat pr-10 cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}

export { CATEGORY_LABELS, APTITUDE_LABELS };
