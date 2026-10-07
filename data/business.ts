/**
 * Datos del negocio Pinapolis.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * IMPORTANTE — CÓMO COMPLETAR ESTOS DATOS
 * ─────────────────────────────────────────────────────────────────────────────
 * Los campos vacíos ("") son PLACEHOLDERS: aún no se cargó información real.
 * Cuando un campo está vacío, la interfaz oculta ese dato o muestra una
 * indicación de configuración (nunca inventa información).
 *
 * Podés completarlos acá o desde variables de entorno (ver `.env.example`).
 * Las variables de entorno tienen prioridad sobre este archivo.
 *
 * NO agregues datos inventados: completá únicamente con información real
 * del negocio antes de publicar el sitio.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const fromEnv = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim() !== "" ? value.trim() : fallback;
};

export const business = {
  name: "Pinapolis",
  tagline: "Criadero especializado en gallinas, gallos y aves de corral",
  shortDescription:
    "Criadero de gallinas y gallos de raza. Selección responsable, asesoramiento cercano y ejemplares criados con cuidado.",

  /**
   * Número de WhatsApp en formato internacional, sin "+" ni espacios.
   * Ejemplo: "54911XXXXXXXX"  (PLACEHOLDER — reemplazar por el número real)
   */
  whatsapp: fromEnv("NEXT_PUBLIC_WHATSAPP", ""),

  /**
   * Teléfono de contacto (PLACEHOLDER — reemplazar por el real)
   */
  phone: fromEnv("NEXT_PUBLIC_PHONE", ""),

  /**
   * Email de contacto (PLACEHOLDER — reemplazar por el real)
   */
  email: fromEnv("NEXT_PUBLIC_EMAIL", ""),

  /**
   * Dirección del criadero (PLACEHOLDER — reemplazar por la real)
   */
  address: fromEnv("NEXT_PUBLIC_ADDRESS", ""),

  /**
   * Horarios de atención (PLACEHOLDER — reemplazar por los reales)
   */
  schedule: fromEnv("NEXT_PUBLIC_SCHEDULE", ""),

  /**
   * Redes sociales (PLACEHOLDER — reemplazar por las reales)
   */
  instagram: fromEnv("NEXT_PUBLIC_INSTAGRAM", ""),
  facebook: fromEnv("NEXT_PUBLIC_FACEBOOK", ""),

  /**
   * URL pública del sitio (para SEO: canonical, sitemap, Open Graph).
   * PLACEHOLDER — reemplazar por el dominio real antes de publicar.
   */
  siteUrl: fromEnv("NEXT_PUBLIC_SITE_URL", "https://pinapolis.example"),
} as const;

/** true cuando el dato fue cargado (no es placeholder vacío). */
export const hasWhatsapp = business.whatsapp !== "";
export const hasEmail = business.email !== "";
export const hasPhone = business.phone !== "";
export const hasAddress = business.address !== "";
export const hasSchedule = business.schedule !== "";
export const hasInstagram = business.instagram !== "";
export const hasFacebook = business.facebook !== "";

/** Ruta interna del formulario de contacto, con datos precargados opcionales. */
export function contactUrl(params?: { producto?: string; motivo?: string }) {
  const search = new URLSearchParams();
  if (params?.producto) search.set("producto", params.producto);
  if (params?.motivo) search.set("motivo", params.motivo);
  const qs = search.toString();
  return qs ? `/contacto?${qs}` : "/contacto";
}
