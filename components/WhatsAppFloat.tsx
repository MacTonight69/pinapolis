"use client";

import Link from "next/link";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { consultUrl } from "@/lib/whatsapp";

/**
 * Botón flotante de consulta.
 * Aparece al bajar (después del hero) y siempre lleva
 * al flujo de consulta: WhatsApp si está configurado,
 * si no al formulario de contacto.
 */
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const cta = consultUrl("ejemplares disponibles");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label =
    cta.type === "whatsapp" ? "Consultar por WhatsApp" : "Consultar por el formulario";

  return (
    <div
      className={`group fixed bottom-5 right-5 z-40 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {cta.type === "whatsapp" ? (
        <a
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-forest-700 text-cream-50 shadow-lift ring-2 ring-cream-50 transition-all hover:scale-105 hover:bg-forest-800 active:scale-95"
        >
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
          <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-forest-900 px-3.5 py-2 text-xs font-bold text-cream-50 shadow-lift group-hover:block">
            {label}
          </span>
        </a>
      ) : (
        <Link
          href={cta.url}
          aria-label={label}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-terra-500 text-cream-50 shadow-lift ring-2 ring-cream-50 transition-all hover:scale-105 hover:bg-terra-600 active:scale-95"
        >
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
          <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-terra-600 px-3.5 py-2 text-xs font-bold text-cream-50 shadow-lift group-hover:block">
            {label}
          </span>
        </Link>
      )}
      {/* Botón para ocultar el flotante (accesibilidad) */}
      <button
        type="button"
        aria-label="Ocultar botón de consulta"
        onClick={(e) => {
          e.currentTarget.closest("div")!.style.display = "none";
        }}
        className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-cream-50 text-ink-500 opacity-0 shadow-soft ring-1 ring-cream-300 transition-opacity group-hover:opacity-100 cursor-pointer"
      >
        <X aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
