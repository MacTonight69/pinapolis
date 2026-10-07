import type { Metadata } from "next";
import { business } from "@/data/business";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Política de privacidad de Pinapolis: qué datos recolectamos, cómo los usamos y cómo ejercer tus derechos.",
  alternates: { canonical: "/legal/privacidad" },
};

/**
 * ⚠️ PLANTILLA DE DEMOSTRACIÓN.
 * Antes de publicar, completá los campos marcados con […]
 * con los datos legales reales del negocio (responsable,
 * domicilio legal, CP, CUIT, encargado de datos, etc.).
 */
export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Política de privacidad"
        description="Cómo tratamos tus datos cuando usás el sitio y el formulario de contacto."
        tone="cream"
      />
      <div className="py-12 sm:py-16">
        <Container>
          <Reveal>
            <LegalContent>
              <p className="lead">
                En <strong>{business.name}</strong> respetamos tu
                privacidad. Esta política explica qué datos
                recolectamos cuando visitás el sitio o nos
                escribís por el formulario de contacto, para qué
                los usamos y cómo podés ejercer tus derechos.
              </p>

              <h2>1. Responsable</h2>
              <p>
                Titular: <strong>{business.name}</strong>.
                Domicilio legal: <em>[completar con el domicilio
                legal del criadero]</em>. Datos de contacto:
                utilizá el formulario de la página{" "}
                <a href="/contacto">/contacto</a>.
              </p>

              <h2>2. Datos que recolectamos</h2>
              <ul>
                <li>
                  <strong>Formulario de contacto:</strong> nombre,
                  email, teléfono (opcional), motivo y mensaje.
                  Los usamos únicamente para responder tu
                  consulta.
                </li>
                <li>
                  <strong>Consultas por WhatsApp/email:</strong> el
                  contenido de tu mensaje y los datos de contacto
                  que nos proporciones.
                </li>
                <li>
                  <strong>Datos técnicos:</strong> este sitio no
                  utiliza cookies propias ni analytics. El servidor
                  registra información básica de acceso (fecha,
                  página visitada) para funcionamiento y
                  seguridad.
                </li>
              </ul>

              <h2>3. Finalidad y base legal</h2>
              <p>
                Los datos se procesan para gestionar y responder
                tus consultas (base legal: ejecución de la
                relación de comunicación y consentimiento del
                interesado). No vendemos, alquilamos ni
                compartimos tus datos con terceros, salvo
                requerimiento legal.
              </p>

              <h2>4. Conservación</h2>
              <p>
                Conservamos tus datos el tiempo necesario para
                responder tu consulta y, posteriormente, según los
                plazos legales aplicables.
              </p>

              <h2>5. Tus derechos</h2>
              <p>
                Podés solicitar acceso, rectificación, supresión u
                oposición al tratamiento de tus datos escribiendo
                a través de la página de contacto.
              </p>

              <h2>6. Cambios en esta política</h2>
              <p>
                Podríamos actualizar esta política. La versión
                vigente es la publicada en esta página.
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
