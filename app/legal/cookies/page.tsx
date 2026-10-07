import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Política de cookies de Pinapolis: este sitio no usa cookies de rastreo.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Política de cookies"
        description="Este sitio no utiliza cookies de rastreo ni publicidad."
        tone="cream"
      />
      <div className="py-12 sm:py-16">
        <Container>
          <Reveal>
            <LegalContent>
              <p className="lead">
                Pinapolis es un sitio estático sin publicidad, sin
                analytics ni cookies de terceros.
              </p>

              <h2>¿Usamos cookies?</h2>
              <p>
                No. El sitio no instala cookies de rastreo,
                publicidad ni analíticas. El funcionamiento básico
                (como recordar tu idioma o el estado de un
                formulario mientras lo completás) se maneja en el
                navegador sin almacenamiento persistente.
              </p>

              <h2>¿Y los datos del formulario?</h2>
              <p>
                Al enviar el formulario de contacto, tus datos se
                transmiten al servidor solo para responder tu
                consulta. No se almacenan en cookies ni se
                comparten con terceros. Ver la{" "}
                <a href="/legal/privacidad">política de
                privacidad</a>.
              </p>

              <h2>¿Y los servicios externos?</h2>
              <p>
                Algunos enlaces (por ejemplo, WhatsApp) abren
                servicios externos que tienen sus propias políticas
                de privacidad. Esta política no cubre esos
                servicios.
              </p>

              <p className="last-updated">
                Última actualización: [fecha].
              </p>
            </LegalContent>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
