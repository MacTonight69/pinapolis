"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, LoaderCircle } from "lucide-react";
import {
  validateField,
  validateContact,
  MOTIVOS,
  type ContactInput,
  type ContactErrors,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Result =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: ContactErrors; demo?: boolean };

/**
 * Formulario de contacto.
 * - Validación en cliente (por campo al perder el foco + al enviar)
 * - Re-validación en servidor vía /api/contacto
 * - Estados de éxito, error y modo demo (sin transporte configurado)
 */
export default function ContactForm({
  initialProducto = "",
}: {
  initialProducto?: string;
}) {
  const searchParams = useSearchParams();
  const prefillProducto =
    initialProducto || searchParams.get("producto") || "";
  const prefillMotivo = searchParams.get("motivo") || "";

  const [values, setValues] = useState<ContactInput>({
    nombre: "",
    email: "",
    telefono: "",
    motivo: prefillMotivo,
    producto: prefillProducto,
    mensaje: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Honey pot: campo oculto para bots (debe quedar vacío)
  const [honey, setHoney] = useState("");

  const handleChange = (name: keyof ContactInput, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Validación en vivo solo si el campo ya fue tocado
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((e) => ({ ...e, [name]: err }));
    }
  };

  const handleBlur = (name: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const err = validateField(name, values[name] ?? "");
    setErrors((e) => ({ ...e, [name]: err }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validateContact(values);
    setErrors(allErrors);
    setTouched({
      nombre: true,
      email: true,
      telefono: true,
      motivo: true,
      mensaje: true,
    });

    if (Object.keys(allErrors).length > 0) {
      // Enfocar el resumen de errores para lectores de pantalla
      errorSummaryRef.current?.focus();
      return;
    }

    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, honey }),
      });
      const data = (await res.json()) as Result;
      setResult(data);
      if (data.ok) {
        formRef.current?.reset();
        setValues({
          nombre: "",
          email: "",
          telefono: "",
          motivo: "",
          producto: "",
          mensaje: "",
        });
        setTouched({});
      } else {
        if (data.errors) setErrors(data.errors);
        errorSummaryRef.current?.focus();
      }
    } catch {
      setResult({
        ok: false,
        message:
          "No pudimos enviar tu mensaje. Revisá tu conexión e intentá de nuevo, o escribinos directamente por los canales de la derecha.",
      });
    } finally {
      setSending(false);
    }
  };

  const fieldError = (name: keyof ContactInput): string | undefined =>
    touched[name] ? (errors[name] as string | undefined) : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label="Formulario de contacto"
      className="card p-6 sm:p-8"
    >
      {/* Prefilled product notice */}
      {values.producto && (
        <p className="mb-5 rounded-xl bg-forest-100 px-4 py-3 text-sm font-semibold text-forest-800 ring-1 ring-forest-200">
          Tu consulta incluye: <span className="font-bold">{values.producto}</span>
        </p>
      )}

      {/* Resumen de errores (accesible) */}
      {Object.keys(errors).length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="mb-5 rounded-xl bg-terra-500/10 px-4 py-3 text-sm font-semibold text-terra-700 ring-1 ring-terra-500/40 outline-none"
        >
          Revisá los campos marcados antes de enviar.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="nombre"
          label="Nombre y apellido"
          required
          error={fieldError("nombre")}
        >
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={values.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            onBlur={() => handleBlur("nombre")}
            aria-invalid={!!fieldError("nombre")}
            aria-describedby={fieldError("nombre") ? "nombre-error" : undefined}
            placeholder="Ej. María González"
            className={cn("field", fieldError("nombre") && "field-error")}
          />
        </Field>

        <Field
          id="email"
          label="Email"
          required
          error={fieldError("email")}
          hint="Te responderemos por este medio."
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={!!fieldError("email")}
            aria-describedby={fieldError("email") ? "email-error" : "email-hint"}
            placeholder="tu@mail.com"
            className={cn("field", fieldError("email") && "field-error")}
          />
        </Field>

        <Field
          id="telefono"
          label="Teléfono (opcional)"
          error={fieldError("telefono")}
        >
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            onBlur={() => handleBlur("telefono")}
            aria-invalid={!!fieldError("telefono")}
            aria-describedby={
              fieldError("telefono") ? "telefono-error" : undefined
            }
            placeholder="Ej. 11 1234-5678"
            className={cn("field", fieldError("telefono") && "field-error")}
          />
        </Field>

        <Field id="motivo" label="Motivo" required error={fieldError("motivo")}>
          <select
            id="motivo"
            name="motivo"
            value={values.motivo}
            onChange={(e) => handleChange("motivo", e.target.value)}
            onBlur={() => handleBlur("motivo")}
            aria-invalid={!!fieldError("motivo")}
            aria-describedby={fieldError("motivo") ? "motivo-error" : undefined}
            className={cn(
              "field appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235d844b%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[right_0.9rem_center] bg-no-repeat pr-10",
              fieldError("motivo") && "field-error"
            )}
          >
            <option value="">Elegí un motivo…</option>
            {MOTIVOS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="mensaje"
            label="Mensaje"
            required
            error={fieldError("mensaje")}
            hint="Contanos tu consulta: raza, cantidad, zona, experiencia previa…"
          >
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              value={values.mensaje}
              onChange={(e) => handleChange("mensaje", e.target.value)}
              onBlur={() => handleBlur("mensaje")}
              aria-invalid={!!fieldError("mensaje")}
              aria-describedby={
                fieldError("mensaje") ? "mensaje-error" : "mensaje-hint"
              }
              placeholder="Hola! Quiero consultar por…"
              className={cn("field resize-y", fieldError("mensaje") && "field-error")}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot anti-bot (oculto para humanos) */}
      <input
        type="text"
        name="honey"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="mt-6">
        <button
          type="submit"
          disabled={sending}
          className="btn-primary w-full sm:w-auto"
        >
          {sending ? (
            <>
              <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-5 w-5" />
              Enviar consulta
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-ink-500">
          Al enviar aceptás que usemos tus datos solo para responder esta
          consulta. Nunca compartimos tu información.
        </p>
      </div>

      {/* Resultado */}
      {result && (
        <div
          role={result.ok ? "status" : "alert"}
          className={cn(
            "mt-6 rounded-xl px-4 py-3 text-sm font-semibold",
            result.ok
              ? "bg-forest-100 text-forest-800 ring-1 ring-forest-200"
              : result.demo
                ? "bg-honey-400/15 text-wood-700 ring-1 ring-honey-400/50"
                : "bg-terra-500/10 text-terra-700 ring-1 ring-terra-500/40"
          )}
        >
          {result.message}
        </div>
      )}
    </form>
  );
}

/** Campo con label, hint y error accesibles. */
function Field({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-bold text-forest-900"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-terra-600">
            *
          </span>
        )}
        {required && <span className="sr-only"> (obligatorio)</span>}
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-semibold text-terra-600">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
