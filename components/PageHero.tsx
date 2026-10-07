import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Encabezado de páginas internas: banda con
 * kicker + título + descripción.
 */
export default function PageHero({
  kicker,
  title,
  description,
  tone = "forest",
  children,
}: {
  kicker: string;
  title: string;
  description?: string;
  tone?: "forest" | "terra" | "cream";
  children?: ReactNode;
}) {
  const tones = {
    forest:
      "bg-forest-800 text-cream-50 after:bg-[radial-gradient(50%_100%_at_85%_10%,rgba(234,181,78,0.22),transparent_60%)]",
    terra:
      "bg-terra-700 text-cream-50 after:bg-[radial-gradient(50%_100%_at_10%_90%,rgba(44,64,36,0.25),transparent_60%)]",
    cream:
      "texture-paper bg-cream-100 text-forest-950 after:bg-[radial-gradient(50%_100%_at_85%_10%,rgba(93,132,75,0.14),transparent_60%)]",
  };

  return (
    <section
      aria-label={title}
      className={cn(
        "relative overflow-hidden py-14 sm:py-18",
        tones[tone],
        "after:absolute after:inset-0 after:content-['']"
      )}
    >
      <div className="texture-grain absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-honey-300">
          {kicker}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed opacity-90">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
