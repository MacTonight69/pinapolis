import { Fraunces, Nunito_Sans } from "next/font/google";

/**
 * Fuentes auto-hospedadas vía next/font (sin requests externos en runtime).
 * Fraunces: serif editorial con carácter, para títulos.
 * Nunito Sans: humanista cálida, para textos.
 */
export const fontFraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fraunces",
});

export const fontNunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-nunito",
});
