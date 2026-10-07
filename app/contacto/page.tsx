import type { Metadata } from "next";
import { MapPin, Clock, Phone, Mail, CalendarCheck } from "lucide-react";
import {
  business,
  hasAddress,
  hasEmail,
  hasPhone,
  hasSchedule,
  hasWhatsapp,
} from "@/data/business";
import { whatsappUrl } from "@/lib/whatsapp";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { jsonLdScript, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Pinapolis: formulario de consulta, WhatsApp y email. Consultá disponibilidad de gallinas, gallos y pollitas, o coordiná una visita al criadero.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Pinapolis",
    description:
      "Consultá disponibilidad de aves o coordiná una visita al criadero.",
    images: ["/images/sitio/galeria-corral.webp"],
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const producto =
    typeof params.producto === "string" ? params.producto : "";

  const wa = hasWhatsapp
    ? whatsappUrl("Hola Pinapolis! Quiero hacer una consulta.")
    : null;

  return (
    <>
      <PageHero
        kicker="Contacto"
        title="Escribinos"
        description="Consultá disponibilidad, coordiná una visita o pedí asesoramiento para tu gallinero. Respondemos en horario de atención."
        tone="forest"
      />

      <div className="texture-paper bg-cream-100 py-12 sm:py-16">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_22rem]">
            {/* Formulario */}
            <Reveal>
              <ContactForm initialProducto={producto} />
            </Reveal>

            {/* Info de contacto */}
            <Reveal delay={120}>
              <div className="space-y-5">
                {/* Datos configurados */}
                {hasAddress && (
                  <div className="card flex gap-4 p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
                      <MapPin aria-hidden="true" className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h2 className="font-bold text-forest-950">
                        Dónde estamos
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">
                        {business.address}
                      </p>
                    </div>
                  </div>
                )}

                {hasSchedule && (
                  <div className="card flex gap-4 p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
                      <Clock aria-hidden="true" className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h2 className="font-bold text-forest-950">
                        Horario
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">
                        {business.schedule}
                      </p>
                    </div>
                  </div>
                )}

                {hasPhone && (
                  <a
                    href={`tel:${business.phone.replace(/\s/g, "")}`}
                    className="card flex gap-4 p-5 transition-all hover:shadow-lift"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
                      <Phone aria-hidden="true" className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h2 className="font-bold text-forest-950">
                        Teléfono
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-forest-700">
                        {business.phone}
                      </p>
                    </div>
                  </a>
                )}

                {hasEmail && (
                  <a
                    href={`mailto:${business.email}`}
                    className="card flex gap-4 p-5 transition-all hover:shadow-lift"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
                      <Mail aria-hidden="true" className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h2 className="font-bold text-forest-950">
                        Email
                      </h2>
                      <p className="mt-1 text-sm font-semibold break-all text-forest-700">
                        {business.email}
                      </p>
                    </div>
                  </a>
                )}

                {/* WhatsApp directo */}
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card flex gap-4 bg-forest-800 p-5 text-cream-50 transition-all hover:shadow-lift"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream-50/15">
                      <Phone aria-hidden="true" className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h2 className="font-bold">WhatsApp directo</h2>
                      <p className="mt-1 text-sm text-cream-100/80">
                        Abrí el chat con tu consulta, sin formulario.
                      </p>
                    </div>
                  </a>
                )}

                {/* Visitas */}
                <div className="card flex gap-4 bg-terra-500/10 p-5 ring-terra-500/30">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terra-500/15 text-terra-600">
                    <CalendarCheck aria-hidden="true" className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <h2 className="font-bold text-forest-950">
                      Visitas con turno
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">
                      Para cuidar el manejo del plantel, las visitas se
                      coordinan con anticipación. Decilo en tu mensaje.
                    </p>
                  </div>
                </div>

                {/* Aviso si nada está configurado */}
                {!hasPhone && !hasEmail && !hasWhatsapp && (
                  <p className="rounded-xl bg-honey-400/15 px-4 py-3 text-xs leading-relaxed text-wood-700 ring-1 ring-honey-400/40">
                    <strong>Aviso para el administrador:</strong> aún no hay
                    canales de contacto configurados. Completá NEXT_PUBLIC_*,
                    EMAIL_CONTACTO y/o WHATSAPP_NUMBER antes de publicar
                    (ver README).
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Contacto", href: "/contacto" },
          ])
        )}
      />
      <script {...jsonLdScript(organizationJsonLd())} />
    </>
  );
}
