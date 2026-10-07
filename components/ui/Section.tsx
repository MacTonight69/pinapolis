import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * Encabezado de sección consistente en todo el sitio:
 * kicker (etiqueta pequeña), título y texto opcional.
 */
export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-terra-600">
        {kicker}
      </p>
      <h2 className="section-title mt-3">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-ink-500">
          {description}
        </p>
      )}
    </Reveal>
  );
}

/** Contenedor de sección con ancho máximo consistente. */
export function Section({
  children,
  className,
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative", className)}
    >
      {children}
    </section>
  );
}

/** Contenedor de ancho máximo con padding responsive. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/** Separador ornamental: línea con un huevo/pluma central. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center gap-3 text-olive-400", className)}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-olive-400/70" />
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d="M12 3 C15.5 3 18 6.5 18 10.5 C18 15 15.4 19 12 21 C8.6 19 6 15 6 10.5 C6 6.5 8.5 3 12 3 Z M12 6.2 C10.2 6.2 8.8 8.1 8.8 10.5 C8.8 13.2 10.5 16 12 17.6 C13.5 16 15.2 13.2 15.2 10.5 C15.2 8.1 13.8 6.2 12 6.2 Z" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-olive-400/70" />
    </div>
  );
}
