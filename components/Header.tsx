"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin, Clock } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import {
  business,
  hasAddress,
  hasEmail,
  hasPhone,
  hasSchedule,
} from "@/data/business";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

/** Indica si un enlace está activo para la ruta actual. */
function useActiveHref(): string {
  const pathname = usePathname();
  if (pathname === "/") return "/";
  for (const link of NAV_LINKS) {
    if (link.href !== "/" && pathname.startsWith(link.href)) {
      return link.href;
    }
  }
  return "";
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeHref = useActiveHref();

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al cambiar de ruta (ajuste de estado en render,
  // recomendado por React en lugar de useEffect).
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  // Escape + bloqueo de scroll + foco en el menú
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Mover el foco al primer enlace del menú
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        "bg-cream-50/90 backdrop-blur-md",
        scrolled
          ? "shadow-soft ring-1 ring-cream-200"
          : "ring-1 ring-transparent"
      )}
    >
      {/* Barra de datos de contacto (solo si están configurados) */}
      {(hasPhone || hasEmail || hasAddress || hasSchedule) && (
        <div className="hidden border-b border-cream-200 bg-forest-800 text-cream-100 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
            {hasAddress && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                {business.address}
              </span>
            )}
            {hasSchedule && (
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                {business.schedule}
              </span>
            )}
            {hasPhone && (
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-honey-300"
              >
                <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                {business.phone}
              </a>
            )}
            {hasEmail && (
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-honey-300"
              >
                <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                {business.email}
              </a>
            )}
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Pinapolis — Inicio"
          className="rounded-lg transition-transform hover:scale-[1.02] focus-visible:outline-forest-600"
        >
          <Logo size="sm" />
        </Link>

        {/* Navegación desktop */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "text-forest-800"
                        : "text-ink-700 hover:text-forest-700"
                    )}
                  >
                    {link.label}
                    {/* Indicador de sección actual (y hover) */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-terra-500 transition-all",
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/catalogo"
            className="btn-primary hidden px-5! py-2.5! text-sm md:inline-flex"
          >
            Consultar catálogo
          </Link>

          {/* Botón menú móvil */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full text-forest-800 transition-colors",
              "hover:bg-cream-200 lg:hidden cursor-pointer"
            )}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        ref={menuRef}
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          menuOpen ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Menú móvil" className="border-t border-cream-200 bg-cream-50 px-4 pb-6 pt-2 sm:px-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href} style={{ transitionDelay: `${i * 40}ms` }}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={closeMenu}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-forest-100 text-forest-800"
                        : "text-ink-700 hover:bg-cream-200"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/catalogo"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="btn-primary mt-4 w-full"
          >
            Consultar catálogo
          </Link>
        </nav>
      </div>
    </header>
  );
}
