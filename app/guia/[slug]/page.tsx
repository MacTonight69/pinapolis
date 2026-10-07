import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { getGuideArticle, guideArticles } from "@/data/guides";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import { ArticleCard } from "@/components/guide/ArticleCard";
import {
  breadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/seo";

export function generateStaticParams() {
  return guideArticles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/guia/${article.slug}` },
    openGraph: {
      title: `${article.title} | Guía de cría`,
      description: article.description,
      images: [{ url: article.image, width: 800, height: 560 }],
      type: "article",
    },
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) notFound();

  const related = guideArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <PageHero
        kicker={`Guía · ${article.level} · ${article.minutes} min de lectura`}
        title={article.title}
        description={article.description}
        tone="forest"
      />

      <div className="texture-paper bg-cream-100 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-500">
              <li>
                <Link
                  href="/guia"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-forest-700"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  Volver a la guía
                </Link>
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1fr_19rem]">
            {/* Contenido */}
            <article className="max-w-3xl">
              <Reveal>
                <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-cream-300">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    width={1100}
                    height={700}
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    priority
                    className="aspect-[11/7] w-full object-cover"
                  />
                </div>
              </Reveal>

              {/* Meta */}
              <Reveal delay={60}>
                <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden="true" className="h-4 w-4 text-terra-500" />
                    {article.minutes} minutos de lectura
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen aria-hidden="true" className="h-4 w-4 text-terra-500" />
                    {article.level}
                  </span>
                </p>
              </Reveal>

              {/* Secciones */}
              {article.sections.map((section, i) => (
                <Reveal key={section.heading} delay={80 + i * 40}>
                  <section
                    id={`seccion-${i + 1}`}
                    aria-labelledby={`titulo-seccion-${i + 1}`}
                    className="mt-10"
                  >
                    <h2
                      id={`titulo-seccion-${i + 1}`}
                      className="font-display text-2xl font-semibold text-forest-950"
                    >
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-700">
                      {section.paragraphs?.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                    {section.list && (
                      <ul className="mt-5 space-y-3">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-ink-700"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="mt-1 h-5 w-5 shrink-0 text-olive-500"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 12.5l5 5L20 6.5" />
                            </svg>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}

              {/* Aviso editorial */}
              <Reveal delay={120}>
                <aside className="mt-12 rounded-2xl bg-honey-400/15 p-5 ring-1 ring-honey-400/40">
                  <p className="text-sm leading-relaxed text-wood-700">
                    <strong>Contenido orientativo.</strong> Esta guía es
                    información general de dominio público y no reemplaza el
                    asesoramiento de un veterinario ni de un criador local.
                    Ante cualquier duda de salud animal, consultá un
                    profesional.
                  </p>
                </aside>
              </Reveal>
            </article>

            {/* Índice lateral (desktop) */}
            <aside
              aria-label="Índice del artículo"
              className="hidden lg:block"
            >
              <div className="card sticky top-28 p-5">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-terra-600">
                  En este artículo
                </h2>
                <ol className="mt-4 space-y-2.5">
                  {article.sections.map((s, i) => (
                    <li key={s.heading}>
                      <a
                        href={`#seccion-${i + 1}`}
                        className="group flex items-start gap-2.5 text-sm font-semibold text-ink-700 transition-colors hover:text-forest-700"
                      >
                        <span
                          aria-hidden="true"
                          className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cream-200 text-[11px] font-bold text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-cream-50"
                        >
                          {i + 1}
                        </span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>

          {/* Artículos relacionados */}
          {related.length > 0 && (
            <div className="mt-20">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold text-forest-950">
                  Seguí leyendo
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((a, i) => (
                  <ArticleCard key={a.slug} article={a} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Guía", href: "/guia" },
            { label: article.title, href: `/guia/${article.slug}` },
          ])
        )}
      />
      <script
        {...jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          image: article.image,
          articleBody: article.sections
            .map((s) => `${s.heading}\n${(s.paragraphs ?? []).join("\n")}`)
            .join("\n\n"),
        })}
      />
    </>
  );
}
