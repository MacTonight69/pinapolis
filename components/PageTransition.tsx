"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Transición entre páginas.
 *
 * 1. Pantalla con un huevo animado: empieza a mostrarse al hacer
 *    clic en un enlace interno (o al volver con "atrás") y se
 *    retira cuando la nueva ruta terminó de entrar.
 * 2. El contenido nuevo aparece con un fundido suave
 *    (`animate-page-enter`), que se repite en cada navegación.
 *
 * Accesibilidad:
 * - La pantalla es decorativa (`aria-hidden`) y nunca intercepta
 *   el puntero (`pointer-events: none`): no molesta ni al teclado
 *   ni a los clics.
 * - Con `prefers-reduced-motion` no se muestra ni se anima nada
 *   (el CSS global ya desactiva las transiciones).
 */

/** Mínimo visible de la pantalla, en ms (da tiempo al huevo). */
const MIN_VISIBLE_MS = 700;
/** Red de seguridad si una navegación nunca llega a confirmarse. */
const MAX_VISIBLE_MS = 3000;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Instante en que se mostró la pantalla (0 = oculta). */
  const shownAtRef = useRef(0);
  /** true si hubo clic en un enlace y aún no cambió la ruta. */
  const pendingRef = useRef(false);
  /** Última ruta vista: evita animar la carga inicial. */
  const prevPathRef = useRef<string | null>(null);

  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    shownAtRef.current = 0;
    pendingRef.current = false;
    setVisible(false);
  }, []);

  const show = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    shownAtRef.current = Date.now();
    setVisible(true);
    // Red de seguridad: si la navegación se cuelga, se oculta sola.
    timerRef.current = setTimeout(hide, MAX_VISIBLE_MS);
  }, [hide]);

  /** Oculta al cumplirse el tiempo mínimo desde que se mostró. */
  const scheduleHide = useCallback(() => {
    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(hide, remaining);
  }, [hide]);

  // Clic en un enlace interno → empieza la pantalla.
  // Fase de captura: corre antes de que Next gestione la navegación.
  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      // Externos (WhatsApp, redes) y anclas del mismo sitio
      // (skip-link, filtros): no hay transición que mostrar.
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      pendingRef.current = true;
      show();
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [show]);

  // Navegación confirmada → entra la nueva página y se retira
  // la pantalla (o se muestra ahora, si vino de "atrás"/"adelante").
  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname; // carga inicial: sin pantalla
      return;
    }
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sin pantalla que gestionar: solo descartar un clic previo.
      pendingRef.current = false;
      return;
    }

    if (pendingRef.current) {
      // El clic ya la mostró: solo programar la salida.
      pendingRef.current = false;
      scheduleHide();
    } else {
      // Navegación sin clic (atrás/adelante, router.push).
      show();
      scheduleHide();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname, hide, show, scheduleHide]);

  // Limpieza al desmontar.
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  return (
    <>
      {/* Pantalla de transición (decorativa: nunca bloquea el puntero). */}
      <div
        data-testid="transicion-huevo"
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-0 z-[90] flex flex-col",
          "items-center justify-center gap-5 bg-cream-100 transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="flex flex-col items-center">
          <svg
            viewBox="0 0 120 150"
            focusable="false"
            className={cn(
              "h-28 w-28 origin-bottom sm:h-36 sm:w-36",
              visible && "animate-egg-wobble"
            )}
          >
            <path
              d="M60 6C84 6 104 42 104 84C104 120 85 144 60 144C35 144 16 120 16 84C16 42 36 6 60 6Z"
              className="fill-cream-50 stroke-forest-800 stroke-linejoin-round"
              strokeWidth="5"
            />
            <ellipse
              cx="44"
              cy="72"
              rx="9"
              ry="7"
              className="fill-terra-400"
              transform="rotate(-20 44 72)"
            />
            <ellipse cx="77" cy="99" rx="7.5" ry="6" className="fill-terra-300" />
            <ellipse cx="55" cy="121" rx="5.5" ry="4.5" className="fill-terra-400" />
          </svg>
          <span
            className={cn(
              "mt-3 block h-3 w-24 rounded-full bg-forest-900/25",
              visible && "animate-egg-shadow"
            )}
          />
        </span>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-forest-900">
          Pinapolis
        </p>
      </div>

      {/* Contenido de la página: fundido de entrada en cada ruta. */}
      <div key={pathname} className="animate-page-enter">
        {children}
      </div>
    </>
  );
}
