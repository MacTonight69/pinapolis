import Link from "next/link";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons";
import Logo from "@/components/Logo";
import {
  business,
  hasAddress,
  hasEmail,
  hasFacebook,
  hasInstagram,
  hasPhone,
  hasSchedule,
} from "@/data/business";
import { CATEGORY_LINKS, LEGAL_LINKS, NAV_LINKS } from "@/data/navigation";
import { imageCredits } from "@/data/image-credits";
import { Ornament } from "@/components/ui/Section";

/** Año actual para el copyright. */
const year = new Date().getFullYear();

export default function Footer() {
  const contactItems = [
    hasAddress && {
      icon: MapPin,
      label: "Dónde estamos",
      value: business.address,
    },
    hasSchedule && {
      icon: Clock,
      label: "Horario",
      value: business.schedule,
    },
    hasPhone && {
      icon: Phone,
      label: "Teléfono",
      value: business.phone,
      href: `tel:${business.phone.replace(/\s/g, "")}`,
    },
    hasEmail && {
      icon: Mail,
      label: "Email",
      value: business.email,
      href: `mailto:${business.email}`,
    },
  ].filter((item): item is { icon: typeof MapPin; label: string; value: string; href?: string } => Boolean(item));

  const socials = [
    hasInstagram && {
      label: "Instagram",
      Icon: InstagramIcon,
      href: business.instagram,
    },
    hasFacebook && {
      label: "Facebook",
      Icon: FacebookIcon,
      href: business.facebook,
    },
  ].filter((s): s is { label: string; Icon: typeof InstagramIcon; href: string } => Boolean(s));

  return (
    <footer className="texture-paper bg-forest-900 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="space-y-4">
            <Logo size="sm" reversed />
            <p className="max-w-xs text-sm leading-relaxed text-cream-200/90">
              {business.shortDescription}
            </p>
            {socials.length > 0 ? (
              <ul className="flex gap-3" aria-label="Redes sociales">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pinapolis en ${s.label}`}
                      className="grid h-10 w-10 place-items-center rounded-full bg-cream-50/10 text-cream-100 transition-all hover:bg-cream-50/20 hover:text-honey-300"
                    >
                      <s.Icon aria-hidden="true" className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-cream-200/60">
                Redes sociales: pendientes de configurar
                (NEXT_PUBLIC_INSTAGRAM / NEXT_PUBLIC_FACEBOOK).
              </p>
            )}
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-honey-400">
              Explorar
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-200/90 transition-colors hover:text-honey-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categorías */}
          <nav aria-label="Categorías del catálogo">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-honey-400">
              Catálogo
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-200/90 transition-colors hover:text-honey-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-honey-400">
              Contacto
            </h2>
            {contactItems.length > 0 ? (
              <ul className="mt-4 space-y-3 text-sm">
                {contactItems.map(
                  (item) =>
                    item && (
                      <li key={item.label} className="flex gap-3">
                        <item.icon
                          aria-hidden="true"
                          className="mt-0.5 h-4.5 w-4.5 shrink-0 text-olive-400"
                        />
                        <div>
                          <p className="text-xs uppercase tracking-wider text-cream-200/60">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-cream-100 transition-colors hover:text-honey-300"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-cream-100">{item.value}</p>
                          )}
                        </div>
                      </li>
                    )
                )}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-cream-200/70">
                Datos de contacto pendientes de configurar.
                <br />
                <Link
                  href="/contacto"
                  className="font-semibold text-honey-300 underline-offset-4 hover:underline"
                >
                  Usá el formulario de contacto →
                </Link>
              </p>
            )}
          </div>
        </div>

        <Ornament className="my-10 !text-olive-600" />

        {/* Legal + créditos */}
        <div className="flex flex-col gap-4 text-xs text-cream-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-honey-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-cream-200/50">
          Imágenes de demostración: {imageCredits.length} fotos de Wikimedia
          Commons con licencias libres (ver <Link href="/creditos" className="underline underline-offset-2 hover:text-cream-100">Créditos</Link>).
          Reemplazar por fotografías propias antes de publicar.
        </p>
      </div>
    </footer>
  );
}
