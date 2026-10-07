/** Formatea un precio. `null` → "Consultar precio" (Pinapolis no publica lista de precios). */
export function formatPrice(price: number | null): string {
  if (price === null || price <= 0) return "Consultar precio";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Slug simple y legible (es-AR: normaliza tildes). */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
