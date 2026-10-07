/**
 * Validación del formulario de contacto.
 * Compartida entre cliente (feedback inmediato)
 * y servidor (re-validación obligatoria).
 */

export interface ContactInput {
  nombre: string;
  email: string;
  telefono: string;
  motivo: string;
  producto: string;
  mensaje: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Valida un campo individual. Devuelve el error o undefined. */
export function validateField(
  name: keyof ContactInput,
  value: string
): string | undefined {
  const v = value.trim();
  switch (name) {
    case "nombre":
      if (v.length < 2) return "Ingresá tu nombre (mínimo 2 caracteres).";
      if (v.length > 80) return "El nombre es demasiado largo.";
      return undefined;
    case "email":
      if (!v) return "Ingresá tu email para poder responderte.";
      if (!EMAIL_RE.test(v)) return "Ingresá un email válido (ej. tu@mail.com).";
      return undefined;
    case "telefono":
      if (v && !/^[\d\s()+.-]{6,20}$/.test(v))
        return "Ingresá un teléfono válido (solo números y signos).";
      return undefined;
    case "motivo":
      if (!v) return "Elegí un motivo de consulta.";
      return undefined;
    case "mensaje":
      if (v.length < 10)
        return "Contanos un poco más (mínimo 10 caracteres).";
      if (v.length > 2000) return "El mensaje es demasiado largo (máx. 2000).";
      return undefined;
    default:
      return undefined;
  }
}

/** Valida todos los campos. Devuelve errores o {} si es válido. */
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(input) as (keyof ContactInput)[]).forEach((key) => {
    if (key === "producto") return; // solo informativo
    const err = validateField(key, input[key] ?? "");
    if (err) errors[key] = err;
  });
  return errors;
}

export const MOTIVOS = [
  { value: "consulta", label: "Consulta general" },
  { value: "disponibilidad", label: "Disponibilidad de un ejemplar" },
  { value: "visita", label: "Quiero visitar el criadero" },
  { value: "asesoramiento", label: "Asesoramiento para mi gallinero" },
  { value: "entrega", label: "Entrega y zonas" },
  { value: "otro", label: "Otro" },
] as const;
