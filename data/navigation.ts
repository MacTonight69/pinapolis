/** Navegación principal del sitio. */
export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/razas", label: "Razas" },
  { href: "/guia", label: "Guía" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const LEGAL_LINKS = [
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/terminos", label: "Términos y condiciones" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/creditos", label: "Créditos de imágenes" },
] as const;

/** Enlaces del catálogo para el footer (categorías). */
export const CATEGORY_LINKS = [
  { href: "/catalogo?categoria=gallinas", label: "Gallinas" },
  { href: "/catalogo?categoria=gallos", label: "Gallos" },
  { href: "/catalogo?categoria=pollitas", label: "Pollitas" },
  { href: "/catalogo?categoria=pollos", label: "Pollos" },
  { href: "/catalogo?categoria=parejas", label: "Parejas" },
  { href: "/catalogo?categoria=especiales", label: "Razas especiales" },
  { href: "/catalogo?categoria=huevos", label: "Huevos fértiles" },
] as const;
