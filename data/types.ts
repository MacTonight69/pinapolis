/** Tipos compartidos del catálogo de Pinapolis. */

/** Categorías del catálogo de aves. */
export type ProductCategory =
  | "gallinas"
  | "gallos"
  | "pollitas"
  | "pollos"
  | "parejas"
  | "especiales"
  | "huevos";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  gallinas: "Gallinas",
  gallos: "Gallos",
  pollitas: "Pollitas",
  pollos: "Pollos",
  parejas: "Parejas",
  especiales: "Razas especiales",
  huevos: "Huevos fértiles",
};

export const CATEGORIES: { id: ProductCategory; label: string; description: string }[] = [
  { id: "gallinas", label: "Gallinas", description: "Hembras de postura y doble propósito" },
  { id: "gallos", label: "Gallos", description: "Machos para crianza, compañía o engorde" },
  { id: "pollitas", label: "Pollitas", description: "Hembras jóvenes que comienzan a poner" },
  { id: "pollos", label: "Pollos", description: "Aves para engorde y carne" },
  { id: "parejas", label: "Parejas", description: "Macho y hembra para iniciar o renovar tu plantel" },
  { id: "especiales", label: "Razas especiales", description: "Razas con características particulares" },
  { id: "huevos", label: "Huevos fértiles", description: "Para incubar y criar tus propias aves" },
];

/** Disponibilidad de un ejemplar. */
export type Availability = "disponible" | "a-pedido" | "consultar";

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  disponible: "Disponible",
  "a-pedido": "A pedido",
  consultar: "Consultar",
};

/** Sexo del ejemplar. */
export type Sex = "Hembra" | "Macho" | "Mixto" | "Macho y hembra" | "—";

/** Aptitud de una raza. */
export type Aptitude = "postura" | "carne" | "doble-proposito" | "ornamental";

export const APTITUDE_LABELS: Record<Aptitude, string> = {
  postura: "Postura",
  carne: "Carne",
  "doble-proposito": "Doble propósito",
  ornamental: "Ornamental",
};

/** Raza de gallina/gallo (sección Razas del sitio). */
export interface Breed {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  origin: string;
  /** Tamaño orientativo (evitamos cifras que varían según manejo y genética). */
  size: "Mediana" | "Mediana-grande" | "Grande" | "Muy grande";
  description: string;
  physicalTraits: string[];
  coloration: string;
  eggProduction: "Baja" | "Media" | "Buena" | "Alta" | "Muy alta";
  eggColor: string;
  temperament: string;
  aptitudes: Aptitude[];
  /** Nivel de rusticidad: 1 (baja) a 5 (muy alta). */
  hardiness: 1 | 2 | 3 | 4 | 5;
  /** Nivel de docilidad: 1 (nerviosa) a 5 (muy dócil). */
  docility: 1 | 2 | 3 | 4 | 5;
  care: string[];
  curiosity: string;
  /** Texto de disponibilidad en Pinapolis (no inventa stock). */
  availabilityNote: string;
}

/** Producto / ejemplar del catálogo. */
export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  /** Raza asociada, si aplica. */
  breedSlug?: string;
  species: string;
  sex: Sex;
  age: string;
  description: string;
  traits: string[];
  availability: Availability;
  /**
   * Precio en la moneda local. `null` = "Consultar precio".
   * Pinapolis no publica precios de lista: cada cotización depende de
   * la edad, el sexo, la raza y la cantidad.
   */
  price: number | null;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

/** Pregunta frecuente. */
export interface Faq {
  question: string;
  answer: string;
}

  /** Artículo de la guía de crianza. */
export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  minutes: number;
  level: "Principiante" | "Intermedio";
  sections: { heading: string; paragraphs?: string[]; list?: string[] }[];
}

/** Testimonio de cliente (DEMO: reemplazar por reseñas reales). */
export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

/** Ítem de migas de pan (breadcrumbs). */
export interface BreadcrumbItem {
  label: string;
  href: string;
}
