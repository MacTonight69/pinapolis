import type { Metadata, Viewport } from "next";
import { business } from "@/data/business";
import { fontFraunces, fontNunito } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} — Venta de gallinas, gallos y aves de corral`,
    template: `%s | ${business.name}`,
  },
  description:
    "Pinapolis es un criadero especializado en venta de gallinas, gallos, pollitas y pollos de raza. Catálogo con razas ponedoras, de doble propósito y compañía. Consultá disponibilidad.",
  keywords:
    "gallinas, gallos, venta de gallinas, razas de gallinas, gallinas ponedoras, aves de corral, criadero, gallinas de raza, pollitas, pollos",
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: business.siteUrl,
    siteName: business.name,
    title: `${business.name} — Venta de gallinas, gallos y aves de corral`,
    description:
      "Criadero especializado en gallinas y gallos de raza. Razas ponedoras, doble propósito y compañía, con asesoramiento cercano.",
    images: [
      {
        url: "/images/sitio/hero.webp",
        width: 2000,
        height: 1200,
        alt: "Gallinas de corral en libertad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — Venta de gallinas y aves de corral`,
    description:
      "Criadero especializado en gallinas y gallos de raza. Razas ponedoras, doble propósito y compañía.",
    images: ["/images/sitio/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Añadí tu código de verificación de Search Console antes de publicar:
    // google: "TU_CODIGO",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6e9" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2e1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fontFraunces.variable} ${fontNunito.variable}`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-3 focus:rounded-lg focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-cream-50"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido-principal" tabIndex={-1} className="flex-1 outline-none">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
