import { NextRequest, NextResponse } from "next/server";
import {
  validateContact,
  type ContactInput,
} from "@/lib/validation";

/**
 * POST /api/contacto
 *
 * 1. Re-valida todo del lado del servidor (nunca confiar en el cliente).
 * 2. Si hay un endpoint de formulario configurado (Formspree, Getform,
 *    Formbucket, webhook propio…), reenvía el mensaje ahí.
 * 3. Si no hay transporte configurado, responde en modo demo explícito:
 *    NUNCA finge un envío.
 *
 * Variables de entorno:
 *  - CONTACT_FORM_ENDPOINT: URL del servicio de formularios (webhook)
 *  - CONTACT_FORM_SECRET:   (opcional) header de autorización del servicio
 */

const MAX_BODY = 10_000;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) {
      return NextResponse.json(
        { ok: false, message: "El mensaje es demasiado grande." },
        { status: 413 }
      );
    }
    const parsed: unknown = JSON.parse(raw);
    // JSON válido pero no un objeto (string, número, null, array…): también 400.
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return NextResponse.json(
        { ok: false, message: "No pudimos leer el formulario. Reintentá." },
        { status: 400 }
      );
    }
    body = parsed;
  } catch {
    return NextResponse.json(
      { ok: false, message: "No pudimos leer el formulario. Reintentá." },
      { status: 400 }
    );
  }

  const input = body as ContactInput;

  // Honeypot: si el bot rellenó el campo oculto, rechazamos silenciosamente.
  if ((input as { honey?: string }).honey) {
    return NextResponse.json(
      { ok: true, message: "Gracias por tu consulta." },
      { status: 200 }
    );
  }

  // ── Validación del servidor (la que manda) ──────────────────
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Revisá los campos marcados antes de enviar.",
        errors,
      },
      { status: 422 }
    );
  }

  // ── Envío real (solo si hay transporte configurado) ─────────
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  const secret = process.env.CONTACT_FORM_SECRET;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({
          nombre: input.nombre.trim(),
          email: input.email.trim(),
          telefono: input.telefono.trim(),
          motivo: input.motivo,
          producto: input.producto?.trim() ?? "",
          mensaje: input.mensaje.trim(),
          origen: "pinapolis-web",
        }),
      });

      if (!res.ok) {
        console.error("[contacto] endpoint respondió", res.status);
        return NextResponse.json(
          {
            ok: false,
            message:
              "El servicio de formularios no respondió. Intentá de nuevo en unos minutos o escribinos por WhatsApp/email.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        message:
          "¡Gracias por escribirnos! Recibimos tu consulta y respondemos a la brevedad.",
      });
    } catch (err) {
      console.error("[contacto] error reenviando", err);
      return NextResponse.json(
        {
          ok: false,
          message:
            "No pudimos conectarnos con el servicio de formularios. Intentá de nuevo o usá otro canal.",
        },
        { status: 502 }
      );
    }
  }

  // ── Sin transporte: demo explícita, sin fingir ──────────────
  console.info(
    "[contacto] MODO DEMO (sin CONTACT_FORM_ENDPOINT):",
    JSON.stringify({
      nombre: input.nombre.trim(),
      email: input.email.trim(),
      telefono: input.telefono.trim(),
      motivo: input.motivo,
      producto: input.producto?.trim() ?? "",
      mensaje: input.mensaje.trim().slice(0, 200),
    })
  );

  return NextResponse.json({
    ok: false,
    demo: true,
    message:
      "El formulario está en modo demostración: aún no hay un servicio de email configurado. Configurá CONTACT_FORM_ENDPOINT (ver README) o consultanos por WhatsApp/email.",
  });
}
