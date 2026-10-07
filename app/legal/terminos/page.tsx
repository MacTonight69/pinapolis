import type { Metadata } from "next";
import { business } from "@/data/business";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso del sitio de Pinapolis: consultas, disponibilidad, visitas y responsabilidades.",
  alternates: { canonical: "/legal/terminos" },
};

/**
 * ⚠️ PLANTILLA DE DEMOSTRACIÓN.
 * Completá con los datos legales reales antes de publicar.
 */
export default function TerminosPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Términos y condiciones"
        description="Condiciones de uso del sitio y del servicio de consulta de Pinapolis."
        tone="cream"
      />
      <div className="py-12 sm:py-16">
        <Container>
          <Reveal>
            <LegalContent>
              <p className="lead">
                Estas condiciones regulan el uso del sitio web de{" "}
                <strong>{business.name}</strong> y las consultas
                realizadas a través del mismo. Al usar el sitio,
                aceptás estos términos.
              </p>

              <h2>1. Objeto</h2>
              <p>
                El sitio es un catálogo informativo de ejemplares
                y razas. Las consultas son una solicitud de
                información: la disponibilidad, los precios y las
                condiciones finales se confirman en la conversación
                con el criadero.
              </p>

              <h2>2. Consultas y disponibilidad</h2>
              <ul>
                <li>
                  Los ejemplares publicados pueden cambiar de
                  estado sin aviso previo.
                </li>
                <li>
                  Las consultas no constituyen una reserva ni una
                  venta hasta que ambas partes confirmen.
                </li>
                <li>
                  Las entregas se coordinan según la zona y la
                  cantidad de ejemplares.
                </li>
              </ul>

              <h2>3. Visitas</h2>
              <p>
                Las visitas al criadero se realizan con turno
                previo para cuidar el manejo del plantel.
              </p>

              <h2>4. Contenido del sitio</h2>
              <p>
                La información de razas y cuidados es general y
                orientativa; no reemplaza el asesoramiento
                veterinario profesional. Las imágenes de
                demostración tienen licencias libres (ver{" "}
                <a href="/creditos">créditos</a>) y pueden ser
                reemplazadas por fotografías propias.
              </p>

              <h2>5. Responsabilidad</h2>
              <p>
                El sitio se ofrece «tal cual». No nos
                responsabilizamos por daños indirectos derivados
                del uso de la información. La cría de aves es una
                actividad sujeta a normativas locales que el
                usuario debe verificar.
              </p>

              <h2>6. Ley aplicable</h2>
              <p>
                Estos términos se rigen por la legislación de
                [país/jurisdicción]. Cualquier disputa se resuelve
                en los tribunales de [ciudad].
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
