import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { imageCredits } from "@/data/image-credits";
import PageHero from "@/components/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Créditos de imágenes",
  description:
    "Créditos y licencias de las imágenes de demostración usadas en Pinapolis (Wikimedia Commons).",
  alternates: { canonical: "/creditos" },
};

/**
 * Página de créditos de imágenes.
 *
 * Las imágenes actuales son de DEMOSTRACIÓN (Wikimedia
 * Commons, licencias libres). Antes de publicar,
 * reemplazalas por fotografías propias y actualizá
 * esta página (o vaciá `imageCredits`).
 */
export default function CreditosPage() {
  return (
    <>
      <PageHero
        kicker="Créditos"
        title="Créditos de imágenes"
        description={`Las ${imageCredits.length} fotografías de este sitio son de demostración, tomadas de Wikimedia Commons bajo licencias libres.`}
        tone="cream"
      />

      <div className="texture-paper bg-cream-100 py-12 sm:py-16">
        <Container>
          <Reveal>
            <div className="card mx-auto max-w-3xl bg-honey-400/10 p-6 ring-honey-400/40">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-wood-700">
                <Camera
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-terra-600"
                />
                <span>
                  <strong>Imágenes de demostración.</strong> Todas las
                  fotos de este sitio son ejemplos con licencias
                  libres (Creative Commons / dominio público), elegidas
                  para mostrar el diseño. <strong>No son fotos del
                  criadero.</strong> Antes de publicar, reemplazalas por
                  fotografías propias de Pinapolis y actualizá esta
                  página con los créditos correspondientes.
                </span>
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <SectionHeading
              align="left"
              kicker="Atribuciones"
              title="Fotografías y licencias"
              description="Cada imagen, su autor y su licencia, en orden de uso en el sitio."
            />
            <Reveal delay={100}>
              <ul className="mt-8 divide-y divide-cream-200 rounded-2xl bg-cream-50 shadow-soft ring-1 ring-cream-200">
                {imageCredits.map((credit) => (
                  <li
                    key={credit.file}
                    className="grid gap-3 p-5 sm:grid-cols-[13rem_1fr] sm:gap-6"
                  >
                    <div>
                      <p className="text-sm font-bold text-forest-900">
                        {credit.file}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-500">
                        {credit.title}
                      </p>
                    </div>
                    <div className="text-sm leading-relaxed text-ink-700">
                      <p>
                        <span className="font-semibold">Autor:</span>{" "}
                        {credit.author}
                      </p>
                      <p>
                        <span className="font-semibold">Licencia:</span>{" "}
                        {credit.licenseUrl ? (
                          <a
                            href={credit.licenseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-forest-700 underline underline-offset-4 hover:text-terra-600"
                          >
                            {credit.license}
                          </a>
                        ) : (
                          <span className="font-semibold">
                            {credit.license}
                          </span>
                        )}
                      </p>
                      <p>
                        <span className="font-semibold">Fuente:</span>{" "}
                        <a
                          href={credit.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-forest-700 underline underline-offset-4 hover:text-terra-600"
                        >
                          Wikimedia Commons
                        </a>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
              Las licencias Creative Commons requieren atribución. Si
              mantuvieras estas imágenes, conservá esta página. Si las
              reemplazás por fotos propias, esta página puede eliminarse
              o actualizarse con los nuevos créditos.
            </p>
          </Reveal>
        </Container>
      </div>

      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Créditos", href: "/creditos" },
          ])
        )}
      />
    </>
  );
}
