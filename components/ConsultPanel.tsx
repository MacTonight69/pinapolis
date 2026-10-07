"use client";

import Link from "next/link";
import { MessageCircle, Mail, ClipboardCopy, Check } from "lucide-react";
import { useState } from "react";
import { contactUrl } from "@/data/business";
import { emailUrl, inquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Panel de consulta unificado.
 *
 * Muestra el mensaje preparado y los canales disponibles:
 *  - WhatsApp (si hay número configurado)
 *  - Email (si hay email configurado)
 *  - Formulario de contacto (siempre)
 *
 * Si no hay WhatsApp ni email configurados, explica
 * cómo completar el flujo por formulario.
 */
export default function ConsultPanel({
  itemName,
  extra,
  className,
}: {
  itemName: string;
  extra?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const message = inquiryMessage(itemName, extra);
  const wa = whatsappUrl(message);
  const mail = emailUrl(`Consulta por ${itemName}`, message);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={cn("card p-6", className)}>
      <h2 className="font-display text-xl font-semibold text-forest-950">
        Consultá por {itemName}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">
        Este es el mensaje que le llegaríamos a Pinapolis.
        Podés editarlo antes de enviarlo.
      </p>

      {/* Mensaje preparado */}
      <div className="mt-4 rounded-xl bg-cream-100 p-4 ring-1 ring-cream-300">
        <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">
          {message}
        </p>
      </div>

      {/* Canales */}
      <div className="mt-5 space-y-3">
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Enviar por WhatsApp
          </a>
        )}
        {mail && (
          <a
            href={mail}
            className="btn-outline w-full"
          >
            <Mail aria-hidden="true" className="h-5 w-5" />
            Enviar por email
          </a>
        )}
        <Link href={contactUrl({ producto: itemName, motivo: "consulta" })} className="btn-terra w-full">
          <ClipboardCopy aria-hidden="true" className="h-5 w-5" />
          Consultar por el formulario
        </Link>
        <button
          type="button"
          onClick={copy}
          className="btn w-full bg-cream-100 text-ink-700 ring-1 ring-cream-300 hover:bg-cream-200"
          aria-live="polite"
        >
          {copied ? (
            <>
              <Check aria-hidden="true" className="h-5 w-5 text-forest-600" />
              Mensaje copiado
            </>
          ) : (
            <>
              <ClipboardCopy aria-hidden="true" className="h-5 w-5" />
              Copiar mensaje
            </>
          )}
        </button>
      </div>

      {!wa && !mail && (
        <p className="mt-4 rounded-xl bg-honey-400/15 px-4 py-3 text-xs leading-relaxed text-wood-700 ring-1 ring-honey-400/40">
          Pinapolis aún no tiene WhatsApp ni email publicados.
          Usá el formulario de contacto: incluye el nombre del
          ejemplar automáticamente.
        </p>
      )}
    </div>
  );
}
