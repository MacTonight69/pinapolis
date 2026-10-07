import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { GuideArticle } from "@/data/types";

/** Tarjeta de artículo de la guía (reutilizable). */
export function ArticleCard({
  article,
}: {
  article: GuideArticle;
  index?: number;
}) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link
        href={`/guia/${article.slug}`}
        className="relative block overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={article.image}
          alt=""
          width={800}
          height={560}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
          className="aspect-[10/7] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream-50/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest-800 ring-1 ring-cream-200 backdrop-blur-sm">
          {article.level}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs font-semibold text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {article.minutes} min
          </span>
          <span aria-hidden="true" className="text-cream-400">
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
            {article.sections.length} secciones
          </span>
        </div>

        <h3 className="mt-2.5 font-display text-xl font-semibold text-forest-950">
          <Link
            href={`/guia/${article.slug}`}
            className="transition-colors hover:text-forest-700"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-500">
          {article.description}
        </p>

        <Link
          href={`/guia/${article.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-forest-700 transition-colors group-hover:text-terra-600"
        >
          Leer artículo
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
