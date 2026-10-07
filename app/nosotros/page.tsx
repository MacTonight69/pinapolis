import { Sprout, HeartHandshake, Sun, Egg } from "lucide-react";
import Image from "next/image";
import { business } from "@/data/business";
import PageHero from "@/components/PageHero";
import { Container, SectionHeading, Ornament } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ConsultPanel from "@/components/ConsultPanel";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";

/**
 * Contenido editable de la sección "Nosotros".
 * ⚠️ REEMPLAZAR por la historia real del criadero antes
 * de publicar. Los párrafos de `story` son de ejemplo.
 */
const story = {
  paragraphs: [
    "Pinapolis nació con una idea simple: criar gallinas y gallos como se hacía antes, con espacio, pasto y cuidado, y entregarlos con el mismo asesoramiento que le darías a un vecino.",
    "Trabajamos con razas reconocidas de postura, doble propósito y compañía. Cada ejemplar se cría en corrales amplios, se revisa antes de entregarse y viaja con una ficha de su raza y sus cuidados básicos.",
    "No somos una granja industrial: criamos en cantidades acotadas para poder conocer cada ave. Por eso, antes de publicar un ejemplar, lo vemos comer, moverse y pararse en el nido.",
  ],
  values: [
    {
      icon: Sprout,
      title: "Crianza en libertad",
      text: "Pasto, aire y espacio. Nuestras aves no conocen jaulas ni pisos de malla cerrada.",
    },
    {
      icon: HeartHandshake,
      title: "Trato cercano",
      text: "Te asesoramos antes de comprar y quedamos disponibles después. Sin letra chica.",
    },
    {
      icon: Sun,
      title: "Manejo respetuoso",
      text: "Alimentación natural, controles sanitarios regulares y nada de hormonas ni aceleradores.",
    },
    {
      icon: Egg,
      title: "Calidad visible",
      text: "Cada ave se revisa una por una: plumaje, postura, ánimo y salud general.",
    },
  ],
};

const process = [
  "Elegimos la raza según el objetivo del cliente (huevos, carne o compañía)",
  "Criamos en corrales amplios con alimentación balanceada y pasto",
  "Revisamos cada ejemplar antes de publicarlo en el catálogo",
  "Coordinamos la entrega y acompañamos con asesoramiento post-venta",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Nosotros"
        title="Somos Pinapolis"
        description={business.shortDescription}
        tone="forest"
      />

      {/* Historia */}
      <section aria-label="Historia del criadero" className="py-14 sm:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                align="left"
                kicker="Nuestra historia"
                title="Un criadero de barrio, con criterio"
              />
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-700">
                {story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-cream-300">
                  <Image
                    src="/images/sitio/nosotros.webp"
                    alt="Aves camperas pastando en libertad"
                    width={900}
                    height={700}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="lazy"
                    className="aspect-[9/7] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 left-6 animate-float rounded-2xl bg-cream-50 px-5 py-4 shadow-lift ring-1 ring-cream-200">
                  <p className="font-display text-2xl font-semibold text-forest-900">
                    Corrales amplios
                  </p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-terra-600">
                    Sin jaulas
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Valores */}
      <section
        aria-label="Valores del criadero"
        className="texture-paper bg-cream-100 py-14 sm:py-20"
      >
        <Container>
          <SectionHeading
            kicker="Valores"
            title="Cómo trabajamos cada día"
            description="Cuatro principios que guían cada decisión, desde la elección de la raza hasta la entrega."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {story.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <article className="card card-hover flex h-full gap-5 p-6 sm:p-7">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-forest-700 text-cream-50 shadow-soft">
                    <value.icon aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-forest-950">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {value.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Proceso */}
      <section aria-label="Proceso" className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            kicker="Proceso"
            title="Del corral a tu gallinero"
            description="Un vistazo a lo que pasa con cada ejemplar antes de que llegue a vos."
          />
          <ol className="mx-auto mt-14 max-w-3xl space-y-0">
            {process.map((step, i) => (
              <Reveal key={step} delay={i * 90} as="li">
                <div className="relative flex gap-5 pb-10 last:pb-0">
                  {/* Línea vertical */}
                  {i < process.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.65rem] top-[3.5rem] h-[calc(100%-2.5rem)] w-0.5 bg-gradient-to-b from-olive-400 to-cream-300"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-forest-800 font-display text-lg font-bold text-honey-300 shadow-soft ring-4 ring-cream-100"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-3.5 text-lg font-semibold leading-snug text-forest-950">
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Compromiso + consulta */}
      <section
        aria-label="Compromiso y consulta"
        className="texture-paper bg-cream-100 py-14 sm:py-20"
      >
        <Container>
          <Ornament className="mb-12" />
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div>
                <SectionHeading
                  align="left"
                  kicker="Compromiso"
                  title="Honestidad por sobre todo"
                />
                <p className="mt-5 text-lg leading-relaxed text-ink-700">
                  Si no tenemos una raza, te lo decimos. Si una ave no está en
                  condiciones, no la vendemos. Y si tu primer gallinero necesita
                  otra raza de la que consultaste, te lo decimos también.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-ink-700">
                  Nuestra mejor publicidad es que vuelvas a consultar: por eso
                  el asesoramiento sigue después de la entrega.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ConsultPanel
                itemName="ejemplares disponibles"
                extra="quiero asesoramiento para elegir raza"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <script
        {...jsonLdScript(
          breadcrumbJsonLd([
            { label: "Inicio", href: "/" },
            { label: "Nosotros", href: "/nosotros" },
          ])
        )}
      />
    </>
  );
}
