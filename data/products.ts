import type { Product } from "./types";

/**
 * Catálogo de demostración.
 *
 * ⚠️ TODOS los productos son datos DEMO:
 * - `price: null` → la interfaz muestra "Consultar precio".
 *   Pinapolis no publica precios de lista; cada cotización
 *   depende de raza, edad, sexo y cantidad.
 * - Las descripciones y características son de ejemplo.
 *
 * Para AGREGAR o QUITAR ejemplares, editá este archivo:
 * no hay que tocar la interfaz. Ver README → "Agregar productos".
 */
export const products: Product[] = [
  // ── GALLINAS ──────────────────────────────────────────────────
  {
    slug: "gallina-plymouth-rock",
    name: "Gallina Plymouth Rock",
    category: "gallinas",
    breedSlug: "plymouth-rock",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta, en postura",
    description:
      "Hembra Plymouth Rock barrada en plena etapa de postura. Plumaje barrado característico, carácter sociable y huevos marrones claros.",
    traits: [
      "Raza de doble propósito",
      "Plumaje barrado blanco y negro",
      "Temperamento dócil",
      "Huevos marrones claros",
      "Se adapta a patio y libertad",
    ],
    availability: "disponible",
    price: null,
    image: "/images/breeds/plymouth-rock.webp",
    imageAlt: "Gallinas Plymouth Rock barradas en un corral",
    featured: true,
  },
  {
    slug: "gallina-rhode-island-red",
    name: "Gallina Rhode Island Red",
    category: "gallinas",
    breedSlug: "rhode-island-red",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta, en postura",
    description:
      "Hembra Rhode Island Red de plumaje rojizo cobrizo. Rústica, resistente y de buena producción de huevos marrones.",
    traits: [
      "Excelente rusticidad",
      "Plumaje rojizo cobrizo",
      "Buena producción de huevos",
      "Tolerante a climas variados",
      "Ideal para crianza doméstica",
    ],
    availability: "disponible",
    price: null,
    image: "/images/sitio/hero.webp",
    imageAlt: "Gallinas de postura en libertad, entre ellas Rhode Island Red",
  },
  {
    slug: "gallina-leghorn",
    name: "Gallina Leghorn",
    category: "gallinas",
    breedSlug: "leghorn",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta, en postura",
    description:
      "Hembra Leghorn blanca: la ponedora clásica de huevos blancos. Activa, ligera y gran conversora de alimento.",
    traits: [
      "Producción de huevos blancos",
      "Activa y resistente",
      "Silueta ligera",
      "Prefiere espacio o libertad",
    ],
    availability: "a-pedido",
    price: null,
    image: "/images/breeds/leghorn.webp",
    imageAlt: "Gallina Leghorn blanca de perfil",
  },
  {
    slug: "gallina-sussex",
    name: "Gallina Sussex",
    category: "gallinas",
    breedSlug: "sussex",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta, en postura",
    description:
      "Hembra Sussex clara de temperamento tranquilo. Buena productora y excelente madre cuando empolla.",
    traits: [
      "Temperamento tranquilo",
      "Buena producción",
      "Variedades de color",
      "Muy sociable con las personas",
    ],
    availability: "disponible",
    price: null,
    image: "/images/breeds/sussex.webp",
    imageAlt: "Gallina Sussex clara en una granja",
    featured: true,
  },
  {
    slug: "gallina-orpington",
    name: "Gallina Orpington",
    category: "gallinas",
    breedSlug: "orpington",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta",
    description:
      "Hembra Orpington búfala de gran tamaño y plumaje abundante. Muy dócil, ideal para familias con niños.",
    traits: [
      "Gran tamaño",
      "Plumaje abundante y suave",
      "Temperamento muy dócil",
      "Buena opción para crianza doméstica",
    ],
    availability: "a-pedido",
    price: null,
    image: "/images/breeds/orpington.webp",
    imageAlt: "Gallina Orpington búfala al sol",
  },
  {
    slug: "gallina-australorp",
    name: "Gallina Australorp",
    category: "gallinas",
    breedSlug: "australorp",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta, en postura",
    description:
      "Hembra Australorp de plumaje negro con reflejos verdes. Excelente ponedora de huevos marrones claros.",
    traits: [
      "Excelente ponedora",
      "Plumaje negro con reflejos",
      "Buena adaptación",
      "Temperamento dócil",
    ],
    availability: "disponible",
    price: null,
    image: "/images/breeds/australorp.webp",
    imageAlt: "Gallina Australorp negra en el suelo",
  },
  {
    slug: "gallina-brahma",
    name: "Gallina Brahma",
    category: "gallinas",
    breedSlug: "brahma",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta",
    description:
      "Hembra Brahma oscura de imponente tamaño y patas emplumadas. Dócil pese a su porte majestuoso.",
    traits: [
      "Tamaño muy grande",
      "Patas emplumadas",
      "Apariencia imponente",
      "Muy resistente al frío",
    ],
    availability: "a-pedido",
    price: null,
    image: "/images/breeds/brahma.webp",
    imageAlt: "Gallina Brahma oscura en Oregón",
  },
  {
    slug: "gallina-araucana",
    name: "Gallina Araucana",
    category: "gallinas",
    breedSlug: "araucana",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta, en postura",
    description:
      "Hembra Araucana que pone huevos de cáscara azulada. Activa, resistente y buena forrajeadora.",
    traits: [
      "Huevos azulados únicos",
      "Activa e independiente",
      "Buena forrajeadora",
      "Resistente",
    ],
    availability: "consultar",
    price: null,
    image: "/images/breeds/araucana.webp",
    imageAlt: "Gallina Araucana en un corral",
  },
  {
    slug: "gallina-marrans",
    name: "Gallina Marans",
    category: "gallinas",
    breedSlug: "marans",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta, en postura",
    description:
      "Hembra Marans de huevos marrón muy oscuro, casi chocolate. Dócil y de doble propósito.",
    traits: [
      "Huevos marrón oscuro",
      "Temperamento dócil",
      "Doble propósito",
      "Apta para manejo extensivo",
    ],
    availability: "consultar",
    price: null,
    image: "/images/breeds/marans.webp",
    imageAlt: "Gallinas Marans en un campo",
  },
  {
    slug: "gallina-campera",
    name: "Gallina campera",
    category: "gallinas",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta, en postura",
    description:
      "Gallina campera de postura, criada en libertad. Ave rústica, desparasitada y lista para integrarse a tu plantel.",
    traits: [
      "Criada en libertad",
      "Rústica y resistente",
      "Desparasitada y controlada",
      "Postura regular",
    ],
    availability: "disponible",
    price: null,
    image: "/images/productos/gallina-campera.webp",
    imageAlt: "Gallina campera en un corral",
  },
  {
    slug: "gallina-orpington-con-pollitos",
    name: "Gallina Orpington con pollitos",
    category: "gallinas",
    breedSlug: "orpington",
    species: "Gallina",
    sex: "Hembra",
    age: "Adulta con crías",
    description:
      "Gallina Orpington criando su nidada: la opción más natural para sumar pollitos ya criados por madre.",
    traits: [
      "Madre empolladora",
      "Pollitos criados por ella",
      "Plumaje abundante",
      "Muy dócil",
    ],
    availability: "consultar",
    price: null,
    image: "/images/productos/gallina-con-pollitos.webp",
    imageAlt: "Gallina Orpington búfala con sus pollitos",
  },

  // ── GALLOS ────────────────────────────────────────────────────
  {
    slug: "gallo-plymouth-rock",
    name: "Gallo Plymouth Rock",
    category: "gallos",
    breedSlug: "plymouth-rock",
    species: "Gallo",
    sex: "Macho",
    age: "Adulto",
    description:
      "Gallo Plymouth Rock barrado de porte erguido y plumaje barrado marcado. Vigoroso y de carácter equilibrado.",
    traits: [
      "Plumaje barrado marcado",
      "Porte erguido",
      "Vigoroso",
      "Buen reproductor",
    ],
    availability: "disponible",
    price: null,
    image: "/images/productos/gallo-plymouth-rock.webp",
    imageAlt: "Gallo Plymouth Rock barrado",
  },
  {
    slug: "gallo-rhode-island-red",
    name: "Gallo Rhode Island Red",
    category: "gallos",
    breedSlug: "rhode-island-red",
    species: "Gallo",
    sex: "Macho",
    age: "Adulto",
    description:
      "Gallo Rhode Island Red de plumaje rojizo intenso. Protege el plantel y da vigor a la prole.",
    traits: [
      "Plumaje rojizo cobrizo",
      "Vigoroso y resistente",
      "Buen reproductor",
      "Carácter protector",
    ],
    availability: "a-pedido",
    price: null,
    image: "/images/breeds/rhode-island-red.webp",
    imageAlt: "Gallo Rhode Island Red en un corral",
  },

  // ── POLLITAS ──────────────────────────────────────────────────
  {
    slug: "pollitas-sussex",
    name: "Pollitas Sussex",
    category: "pollitas",
    breedSlug: "sussex",
    species: "Pollita",
    sex: "Hembra",
    age: "Jóvenes, próximas a poner",
    description:
      "Pollitas Sussex jóvenes a punto de comenzar la postura. Sanas, desparasitadas y sociadas al manejo diario.",
    traits: [
      "Próximas a poner",
      "Desparasitadas",
      "Sociadas a personas",
      "Temperamento tranquilo",
    ],
    availability: "disponible",
    price: null,
    image: "/images/productos/pollitas-sussex.webp",
    imageAlt: "Pollita Sussex joven en un campo",
    featured: true,
  },
  {
    slug: "pollitas-camperas",
    name: "Pollitas camperas",
    category: "pollitas",
    species: "Pollita",
    sex: "Hembra",
    age: "Jóvenes",
    description:
      "Pollitas camperas criadas en libertad, listas para crecer en tu gallinero. Sanas y activas.",
    traits: [
      "Criadas en libertad",
      "Activas y sanas",
      "Fáciles de adaptar",
      "Postura asegurada",
    ],
    availability: "disponible",
    price: null,
    image: "/images/sitio/galeria-corral.webp",
    imageAlt: "Pollitas en un corral campero",
  },

  // ── POLLOS ────────────────────────────────────────────────────
  {
    slug: "pollos-engorde",
    name: "Pollos camperos de engorde",
    category: "pollos",
    species: "Pollo",
    sex: "Mixto",
    age: "En crecimiento",
    description:
      "Pollos camperos de crecimiento vigoroso para engorde con alimentación natural. Crianza extensiva, sin jaulas.",
    traits: [
      "Crecimiento vigoroso",
      "Crianza extensiva",
      "Alimentación natural",
      "Sin jaulas",
    ],
    availability: "a-pedido",
    price: null,
    image: "/images/sitio/nosotros.webp",
    imageAlt: "Pollos camperos en un prado",
  },
  {
    slug: "pollo-doble-proposito",
    name: "Pollo de doble propósito",
    category: "pollos",
    species: "Pollo",
    sex: "Mixto",
    age: "En crecimiento",
    description:
      "Pollos de razas de doble propósito (Sussex × Plymouth Rock): sirven para postura y luego para carne.",
    traits: [
      "Doble propósito",
      "Cruza equilibrada",
      "Crecimiento firme",
      "Rústicos",
    ],
    availability: "consultar",
    price: null,
    image: "/images/sitio/galeria-campo.webp",
    imageAlt: "Pollos de corral en un patio de campo",
  },

  // ── PAREJAS ───────────────────────────────────────────────────
  {
    slug: "pareja-plymouth-rock",
    name: "Pareja Plymouth Rock",
    category: "parejas",
    breedSlug: "plymouth-rock",
    species: "Pareja",
    sex: "Macho y hembra",
    age: "Adultos",
    description:
      "Pareja formada por un gallo y una gallina Plymouth Rock barrada: la forma más fácil de iniciar un plantel propio.",
    traits: [
      "Macho y hembra",
      "Listos para reproducir",
      "Raza de doble propósito",
      "Asesoramiento incluido",
    ],
    availability: "a-pedido",
    price: null,
    image: "/images/productos/gallo-plymouth-rock.webp",
    imageAlt: "Gallo Plymouth Rock barrado, parte de la pareja",
  },
  {
    slug: "pareja-sussex",
    name: "Pareja Sussex",
    category: "parejas",
    breedSlug: "sussex",
    species: "Pareja",
    sex: "Macho y hembra",
    age: "Adultos",
    description:
      "Pareja Sussex: gallo y gallina de temperamento tranquilo, ideal para quienes empiezan con un solo plantel.",
    traits: [
      "Macho y hembra",
      "Temperamento tranquilo",
      "Buena producción",
      "Aptos para patio",
    ],
    availability: "consultar",
    price: null,
    image: "/images/breeds/sussex.webp",
    imageAlt: "Gallina Sussex clara, parte de la pareja",
  },

  // ── RAZAS ESPECIALES ─────────────────────────────────────────
  {
    slug: "gallo-andaluz",
    name: "Gallo Andaluz",
    category: "especiales",
    species: "Gallo",
    sex: "Macho",
    age: "Adulto",
    description:
      "Gallo de raza Andaluza: ave mediterránea de porte elegante, activa y de plumaje azulado en su variedad clásica.",
    traits: [
      "Raza mediterránea",
      "Porte elegante",
      "Muy activo",
      "Buena postura de la hembra",
    ],
    availability: "consultar",
    price: null,
    image: "/images/productos/gallo-andaluz.webp",
    imageAlt: "Gallo andaluz en primer plano",
    featured: true,
  },

  // ── HUEVOS FÉRTILES ──────────────────────────────────────────
  {
    slug: "huevos-fertilizados-plymouth",
    name: "Huevos fértiles Plymouth Rock",
    category: "huevos",
    breedSlug: "plymouth-rock",
    species: "Huevos",
    sex: "—",
    age: "Frescos de la semana",
    description:
      "Huevos fértiles de Plymouth Rock para incubar. Vendidos por docena; ideales para criar en incubadora o con madre.",
    traits: [
      "Fértiles garantizados",
      "Frescos de la semana",
      "Venta por docena",
      "Apto para incubadora",
    ],
    availability: "disponible",
    price: null,
    image: "/images/productos/huevos-fertilizados.webp",
    imageAlt: "Huevos en una canasta",
  },
];

/** Busca un producto por su slug. */
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** Productos destacados para la portada. */
export const featuredProducts = products.filter((p) => p.featured);

/** Ejemplares de una raza (para la ficha de raza). */
export function productsByBreed(breedSlug: string) {
  return products.filter((p) => p.breedSlug === breedSlug);
}

/** Productos de una categoría. */
export function productsByCategory(category: Product["category"]) {
  return products.filter((p) => p.category === category);
}
