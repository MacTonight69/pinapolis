import { cn } from "@/lib/utils";

/**
 * Logotipo de Pinapolis: gallo geométrico en un badge circular
 * + palabra en tipografía display.
 *
 * Variantes:
 *  - "full"    → badge + palabra (header, footer)
 *  - "mark"    → solo badge (menú móvil, favicon grande)
 *  - "reversed"→ colores claros sobre fondo oscuro
 */

/** Silueta del gallo (64×64). Geométrica, reconocible a tamaño chico. */
export function RoosterMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Pinapolis"
      className={className}
    >
      {/* cola: tres plumas */}
      <path d="M45 28 C51 19 59 16 64 18 C59 22 55 27 53 34 Z" />
      <path d="M43 33 C49 28 56 27 61 30 C56 33 51 35 48 38 Z" />
      <path d="M43 38 C48 36 53 37 56 40 C52 42 47 43 45 45 Z" />
      {/* cuerpo */}
      <ellipse cx="33" cy="41" rx="15" ry="12.5" />
      {/* cabeza */}
      <circle cx="21" cy="21" r="7" />
      {/* cresta */}
      <circle cx="16" cy="12" r="2.6" />
      <circle cx="21" cy="10.5" r="2.6" />
      <circle cx="26" cy="12" r="2.6" />
      {/* pico */}
      <path d="M14 19 L7 22 L14 25 Z" />
      {/* barbilla */}
      <ellipse cx="15" cy="29" rx="2.2" ry="3" />
      {/* ala */}
      <path d="M28 38 C35 33 42 36 44 43 C37 45 30 44 28 38 Z" />
      {/* patas */}
      <path d="M28 53 L28 60 M28 60 L25 62 M28 60 L31 62" />
      <path d="M36 53 L36 60 M36 60 L33 62 M36 60 L39 62" />
    </svg>
  );
}

/** Badge circular con el gallo. */
export function RoosterBadge({
  className,
  reversed = false,
}: {
  className?: string;
  reversed?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid place-items-center rounded-full shrink-0",
        reversed
          ? "bg-cream-50 text-forest-800"
          : "bg-forest-800 text-cream-50",
        className
      )}
    >
      <RoosterMark className="w-3/5 h-3/5 fill-current" />
    </span>
  );
}

/** Logotipo completo. */
export default function Logo({
  size = "md",
  reversed = false,
  className,
}: {
  size?: "sm" | "md" | "lg";
  reversed?: boolean;
  className?: string;
}) {
  const badge =
    size === "sm" ? "w-9 h-9" : size === "lg" ? "w-14 h-14" : "w-11 h-11";
  const text =
    size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 select-none",
        className
      )}
    >
      <RoosterBadge className={badge} reversed={reversed} />
      <span
        className={cn(
          "font-display font-semibold tracking-tight leading-none",
          text,
          reversed ? "text-cream-50" : "text-forest-950"
        )}
      >
        Pinapolis
        <span
          className={cn(
            "block font-sans font-bold tracking-[0.28em] text-[9px] uppercase mt-0.5",
            reversed ? "text-cream-300" : "text-olive-700"
          )}
        >
          Criadero de aves
        </span>
      </span>
    </span>
  );
}
