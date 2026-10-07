import { cn } from "@/lib/utils";

/**
 * Barra indicadora 1–5 para características de raza
 * (producción, rusticidad, docilidad, tamaño, etc.).
 *
 * `tone` adapta los colores al fondo: la ficha de raza usa
 * `dark` dentro de la tarjeta forest-800 para mantener
 * contraste AA con el texto.
 */
export default function Meter({
  value,
  max = 5,
  label,
  tone = "light",
  className,
}: {
  value: number;
  max?: number;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const pct = Math.round((value / max) * 100);
  const tones = {
    light: {
      label: "text-ink-700",
      on: "bg-forest-600",
      off: "bg-cream-300",
    },
    dark: {
      label: "text-cream-100",
      on: "bg-honey-300",
      off: "bg-cream-50/30",
    },
  }[tone];

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className={cn("text-sm font-semibold", tones.label)}>
          {label}
        </span>
        <span className="sr-only">
          {label}: {value} de {max}
        </span>
        {/* Dots legibles incluso sin color */}
        <span aria-hidden="true" className="flex gap-1">
          {Array.from({ length: max }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i < value ? tones.on : tones.off
              )}
            />
          ))}
        </span>
      </div>
      <div
        className="meter-track"
        role="img"
        aria-hidden="true"
      >
        <div className="meter-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
