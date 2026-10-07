type ClassValue = string | false | null | undefined;

/** Combina clases condicionales (sin dependencias externas). */
export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}
