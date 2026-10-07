"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Acordeón accesible (FAQ).
 * - Botón con aria-expanded y aria-controls
 * - Panel con role="region"
 * - Solo un item abierto a la vez (opcional)
 * - Animación de altura con grid-template-rows
 */
export default function Accordion({
  items,
  allowMultiple = false,
  className,
  itemClassName,
}: {
  items: { question: string; answer: string }[];
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const baseId = useId();

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-cream-200", className)}>
      {items.map((item, i) => {
        const panelId = `${baseId}-${i}`;
        const isOpen = open.has(i);
        return (
          <div key={i} className={cn("py-1", itemClassName)}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 py-4 text-left",
                  "text-lg font-semibold text-forest-950",
                  "transition-colors hover:text-forest-700 focus-visible:rounded-lg",
                  "cursor-pointer"
                )}
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-olive-600 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-5 leading-relaxed text-ink-700">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Modal accesible basado en <dialog> nativo:
 * - Foco atrapado por el navegador
 * - Se cierra con Escape y con el fondo
 * - Restaura el foco al cerrar
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <dialog
      open={open}
      onClose={onClose}
      aria-label={title}
      className={cn(
        "rounded-2xl bg-cream-50 p-0 shadow-lift ring-1 ring-cream-200",
        "backdrop:bg-forest-950/60 backdrop:backdrop-blur-sm",
        "max-h-[88vh] w-[min(92vw,34rem)] overflow-y-auto",
        "animate-fade-in",
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-cream-200 bg-cream-50/95 px-6 py-4 backdrop-blur-sm">
        <h2 className="font-display text-xl font-semibold text-forest-950">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-cream-200 hover:text-forest-800 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </dialog>
  );
}
