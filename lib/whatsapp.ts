import { business, contactUrl, hasEmail, hasWhatsapp } from "@/data/business";

/**
 * Construye el enlace a WhatsApp con mensaje precargado.
 * Devuelve null si no hay número configurado (nunca inventa números).
 */
export function whatsappUrl(message: string): string | null {
  if (!hasWhatsapp) return null;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Enlace mailto con asunto y cuerpo precargados (null si no hay email). */
export function emailUrl(subject: string, body: string): string | null {
  if (!hasEmail) return null;
  return `mailto:${business.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

/** Mensaje preparado para consultar por un producto o raza. */
export function inquiryMessage(itemName: string, extra?: string) {
  let message = `Hola Pinapolis! Quiero consultar por "${itemName}".`;
  if (extra) message += ` ${extra}`;
  message += "\n¿Tienen disponibilidad? ¿Cómo sería la entrega?";
  return message;
}

/**
 * Flujo de consulta unificado:
 *  - Si hay WhatsApp → enlace directo con el mensaje preparado.
 *  - Si no → va al formulario de contacto con el producto precargado.
 */
export function consultUrl(productName: string, extra?: string) {
  const wa = whatsappUrl(inquiryMessage(productName, extra));
  if (wa) return { type: "whatsapp" as const, url: wa };
  return {
    type: "form" as const,
    url: contactUrl({ producto: productName, motivo: "consulta" }),
  };
}
