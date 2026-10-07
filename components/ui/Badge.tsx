import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Etiqueta pequeña (disponibilidad, categoría, etc.). */
export default function Badge({
  children,
  tone = "olive",
  className,
}: {
  children: ReactNode;
  tone?: "olive" | "terra" | "honey" | "forest" | "wood" | "cream";
  className?: string;
}) {
  const tones = {
    olive: "bg-olive-200 text-olive-700",
    terra: "bg-terra-500/15 text-terra-700",
    honey: "bg-honey-400/25 text-wood-700",
    forest: "bg-forest-700 text-cream-50",
    wood: "bg-wood-500/15 text-wood-700",
    cream: "bg-cream-200 text-ink-700",
  };
  return (
    <span className={cn("badge", tones[tone], className)}>{children}</span>
  );
}
