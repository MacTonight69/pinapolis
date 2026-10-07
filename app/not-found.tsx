import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

/** Página 404 — no encontrada. */
export default function NotFoundPage() {
  return (
    <main className="texture-paper flex min-h-[70svh] items-center bg-cream-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-8 w-fit">
          <Logo size="lg" />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.24em] text-terra-600">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-forest-950 sm:text-5xl">
          Esta página se voló del gallinero
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
          No encontramos la página que buscás. Quizá se movió,
          o el enlace está incompleto. Volvé al inicio o
          explorá el catálogo.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home aria-hidden="true" className="h-4.5 w-4.5" />
            Volver al inicio
          </Link>
          <Link href="/catalogo" className="btn-outline">
            <Search aria-hidden="true" className="h-4.5 w-4.5" />
            Explorar catálogo
            <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
