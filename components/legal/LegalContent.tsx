import type { ReactNode } from "react";

/**
 * Contenedor tipográfico para páginas legales.
 */
export function LegalContent({ children }: { children: ReactNode }) {
  return (
    <div className="legal-content card max-w-3xl p-6 leading-relaxed text-ink-700 sm:p-10 [&_a]:font-semibold [&_a]:text-forest-700 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-terra-600">
      {children}
    </div>
  );
}
