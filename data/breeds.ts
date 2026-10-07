import type { Breed } from "./types";

/**
 * Razas de demostración.
 *
 ⚠️ Información general de dominio público sobre las razas. Los
 * indicadores (postura, rusticidad, docilidad) son orientativos y
 * varían según línea genética, manejo y alimentación. Revisa y ajusta
 * según los ejemplares que realmente criés en Pinapolis.
 */
export const breeds: Breed[] = [
  {
    slug: "plymouth-rock",
    name: "Plymouth Rock",
    image: "/images/breeds/plymouth-rock.webp",
    imageAlt: "Gallinas Plymouth Rock barradas en un corral",
    origin: "Estados Unidos",
    size: "Mediana-grande",
    description:
      "Raza de doble propósito muy apreciada por su equilibrio: pone huevos marrones con regularidad y ofrece una canal de buen tamaño. Reconocida por su plumaje barrado, blanco y negro, y por su temperamento tranquilo.",
    physicalTraits: [
      "Plumaje barrado (blanco y negro)",
      "Cuerpo compacto y pecho ancho",
      "Cresta simple roja",
      "Piel y tarsos amarillos",
    ],
    coloration: "Barrado blanco y negro (la variedad más conocida)",
    eggProduction: "Buena",
    eggColor: "Marrón claro",
    temperament: "Dócil y sociable; se adapta bien a patios y manejo familiar",
    aptitudes: ["doble-proposito"],
    hardiness: 4,
    docility: 5,
    care: [
      "Espacio para picotear y rascar: se mantiene activa en libertad",
      "Alimentación equilibrada para postura en la etapa adulta",
      "Revisar el plumaje en épocas de muda",
    ],
    curiosity:
      "Fue una de las razas más populares de Estados Unidos durante más de medio siglo, antes de la era de las razas industriales.",
    availabilityNote:
      "Tenemos ejemplares barrados con cierta frecuencia; consultá por disponibilidad actual.",
  },
  {
    slug: "rhode-island-red",
    name: "Rhode Island Red",
    image: "/images/breeds/rhode-island-red.webp",
    imageAlt: "Gallo Rhode Island Red en un corral",
    origin: "Estados Unidos",
    size: "Mediana-grande",
    description:
      "Raza rústica y resistente, conocida por su plumaje rojizo cobrizo y su buena producción de huevos marrones. Muy popular en criaderos domésticos por su carácter firme y su facilidad de manejo.",
    physicalTraits: [
      "Plumaje rojizo cobrizo intenso",
      "Cuerpo rectangular y robusto",
      "Cresta simple roja",
      "Ojos anaranjados rojizos",
    ],
    coloration: "Roja cobriza (negra en algunas variedades antiguas)",
    eggProduction: "Buena",
    eggColor: "Marrón",
    temperament: "Activas y resistentes; las hembras suelen llevarse bien en grupo",
    aptitudes: ["doble-proposito"],
    hardiness: 5,
    docility: 3,
    care: [
      "Tolera bien el frío y el calor moderado",
      "Se desarrolla mejor con espacio para moverse",
      "Mantener la alimentación constante en plena postura",
    ],
    curiosity:
      "Es la ave oficial del estado de Rhode Island, su lugar de origen.",
    availabilityNote:
      "Suele haber gallinas y gallos jóvenes; pedí turno para ver el plantel.",
  },
  {
    slug: "leghorn",
    name: "Leghorn",
    image: "/images/breeds/leghorn.webp",
    imageAlt: "Gallina Leghorn blanca de perfil",
    origin: "Italia (región de Liguria)",
    size: "Mediana",
    description:
      "La ponedora por excelencia: activa, ligera y de gran producción de huevos blancos. Existen variedades de varios colores, aunque la blanca es la más difundida.",
    physicalTraits: [
      "Silueta ligera y erguida",
      "Cresta simple grande (caída en la hembra)",
      "Plumaje blanco ajustado",
      "Tarsos y piel amarillos",
    ],
    coloration: "Blanca (también hay barradas, negras y coloradas)",
    eggProduction: "Muy alta",
    eggColor: "Blanco",
    temperament: "Activa, alerta y algo independiente; no es la más dócil",
    aptitudes: ["postura"],
    hardiness: 3,
    docility: 2,
    care: [
      "Prefiere moverse: necesita espacio o libertad diaria",
      "Excelente conversora de alimento en huevos",
      "Vigila que no vuelen alto: les gusta posarse en lo alto",
    ],
    curiosity:
      "El personaje del dibujo animado Foghorn Leghorn está inspirado en esta raza.",
    availabilityNote:
      "Disponible bajo pedido según temporada de postura.",
  },
  {
    slug: "sussex",
    name: "Sussex",
    image: "/images/breeds/sussex.webp",
    imageAlt: "Gallina Sussex clara en una granja",
    origin: "Inglaterra",
    size: "Mediana-grande",
    description:
      "Raza inglesa de doble propósito, apreciada por su temperamento tranquilo y su buena producción. Existen varias variedades de color, todas con el mismo carácter apacible.",
    physicalTraits: [
      "Plumaje amplio y bien ceñido al cuerpo",
      "Cola amplia en abanico",
      "Cresta simple roja",
      "Tarsos rosados",
    ],
    coloration: "Clara, roja y moteada (variedades tradicionales)",
    eggProduction: "Buena",
    eggColor: "Marrón claro",
    temperament: "Tranquila, curiosa y muy sociable con las personas",
    aptitudes: ["doble-proposito"],
    hardiness: 4,
    docility: 5,
    care: [
      "Se adapta muy bien a la vida en patio cerrado",
      "Buena madre: suele empollar y criar sus pollitos",
      "Alimentación equilibrada para mantener la postura",
    ],
    curiosity:
      "Es una de las razas más antiguas de Inglaterra, con antecedentes desde el siglo XIX.",
    availabilityNote:
      "Gallinas claras disponibles con regularidad; gallos a pedido.",
  },
  {
    slug: "orpington",
    name: "Orpington",
    image: "/images/breeds/orpington.webp",
    imageAlt: "Gallina Orpington búfalo al sol",
    origin: "Inglaterra",
    size: "Grande",
    description:
      "Ave de gran tamaño, plumaje abundante y carácter dulce. Muy elegida para crianza doméstica y familias con niños por su temple apacible.",
    physicalTraits: [
      "Cuerpo ancho y redondeado",
      "Plumaje muy abundante y suave",
      "Cresta simple pequeña",
      "Patas cortas y emplumadas parcialmente",
    ],
    coloration: "Búfala, negra, blanca y azul",
    eggProduction: "Media",
    eggColor: "Marrón claro",
    temperament: "Muy dócil; suele ser la primera en acercarse a la mano",
    aptitudes: ["doble-proposito", "ornamental"],
    hardiness: 4,
    docility: 5,
    care: [
      "El plumaje denso necesita gallinero seco y ventilado",
      "Tende a engordar: controlar la cantidad de alimento",
      "Buena empolladora si querés renovar el plantel",
    ],
    curiosity:
      "Fue creada en el siglo XIX por William Cook, quien buscaba un ave bonita y productiva a la vez.",
    availabilityNote: "A pedido; consultá por parejas y pollitos de temporada.",
  },
  {
    slug: "brahma",
    name: "Brahma",
    image: "/images/breeds/brahma.webp",
    imageAlt: "Gallina Brahma oscura en Oregón",
    origin: "Estados Unidos (desarrollada con aves asiáticas)",
    size: "Muy grande",
    description:
      "La más imponente del catálogo: tamaño considerable, patas emplumadas y porte majestuoso. Pese a su apariencia, es apacible y de crecimiento sostenido.",
    physicalTraits: [
      "Tamaño muy grande y hueso pesado",
      "Patas emplumadas",
      "Plumaje ceñido y cabeza pequeña",
      "Cresta de guisante",
    ],
    coloration: "Clara, oscura y lavada (buff, dark, light)",
    eggProduction: "Media",
    eggColor: "Marrón",
    temperament: "Dócil y tranquila, aunque puede ser algo desconfiada al inicio",
    aptitudes: ["carne", "doble-proposito", "ornamental"],
    hardiness: 5,
    docility: 4,
    care: [
      "Proteger las patas emplumadas del barro y la humedad",
      "Muy resistente al frío por su plumaje denso",
      "Requiere más espacio y alimento por su tamaño",
    ],
    curiosity:
      "Fue una de las razas más grandes conocidas y dominó la avicultura estadounidense en el siglo XIX.",
    availabilityNote: "Bajo pedido, en cantidades limitadas por su ciclo de crecimiento.",
  },
  {
    slug: "australorp",
    name: "Australorp",
    image: "/images/breeds/australorp.webp",
    imageAlt: "Gallina Australorp negra en el suelo",
    origin: "Australia",
    size: "Mediana-grande",
    description:
      "Criada en Australia a partir de Orpingtons, es una ponedora excepcional de temperamento apacible. Su plumaje negro con reflejos verdes la hace muy vistosa.",
    physicalTraits: [
      "Plumaje negro con reflejos verdes",
      "Cuerpo bien desarrollado",
      "Cresta simple roja",
      "Piel y tarsos blancos",
    ],
    coloration: "Negra (también azul y blanca en algunas líneas)",
    eggProduction: "Muy alta",
    eggColor: "Marrón claro",
    temperament: "Dócil y confiada; muy apreciada en crianza doméstica",
    aptitudes: ["postura", "doble-proposito"],
    hardiness: 4,
    docility: 4,
    care: [
      "Se desarrolla bien en climas templados y frescos",
      "Buena conversora: produce mucho con alimento de calidad",
      "Vigila el plumaje en mudas",
    ],
    curiosity:
      "Su nombre es un guiño a Australia ('Austral') y a la Orpington, su raza de origen.",
    availabilityNote: "Gallinas disponibles; pollitos de temporada en primavera.",
  },
  {
    slug: "wyandotte",
    name: "Wyandotte",
    image: "/images/breeds/wyandotte.webp",
    imageAlt: "Gallina Wyandotte plateada",
    origin: "Estados Unidos",
    size: "Mediana-grande",
    description:
      "Raza de doble propósito con plumaje muy denso y atractivo dibujado (plateado y dorado). Resistente y de carácter equilibrado.",
    physicalTraits: [
      "Plumaje ancho y bien dibujado",
      "Cresta simple de roseta",
      "Cuerpo compacto y profundo",
      "Tarsos amarillos",
    ],
    coloration: "Plateada y dorada (las más difundidas)",
    eggProduction: "Buena",
    eggColor: "Marrón claro",
    temperament: "Dócil y equilibrada; se adapta a grupos mixtos",
    aptitudes: ["doble-proposito", "ornamental"],
    hardiness: 4,
    docility: 4,
    care: [
      "Plumaje denso: mantener el gallinero seco",
      "Buena opción para patio cerrado",
      "Alimentación equilibrada para postura",
    ],
    curiosity:
      "Lleva el nombre del pueblo Wyandot de Norteamérica.",
    availabilityNote: "Consultá por disponibilidad según temporada.",
  },
  {
    slug: "araucana",
    name: "Araucana",
    image: "/images/breeds/araucana.webp",
    imageAlt: "Gallina Araucana en un corral",
    origin: "América del Sur (Chile)",
    size: "Mediana",
    description:
      "Famosa por sus huevos de color azulado, una característica única entre las gallinas. Activa y resistente, con crestas y orejeras según la variedad.",
    physicalTraits: [
      "Huevos de cáscara azulada",
      "Cresta de guisante",
      "A menudo con orejeras o moño (varía)",
      "Porte ágil",
    ],
    coloration: "Negra, blanca, colorada y otras variedades",
    eggProduction: "Buena",
    eggColor: "Azul verdoso",
    temperament: "Activa y algo independiente; se maneja bien en libertad",
    aptitudes: ["postura", "doble-proposito"],
    hardiness: 4,
    docility: 3,
    care: [
      "Buena forrajeadora: aprovecha espacio amplio",
      "Resistente a enfermedades comunes de corral",
      "Los huevos azules son su rasgo más buscado",
    ],
    curiosity:
      "El gen del huevo azul proviene de poblaciones originarias de Sudamérica.",
    availabilityNote: "Disponible en cantidades reducidas; consultá con anticipación.",
  },
  {
    slug: "marans",
    name: "Marans",
    image: "/images/breeds/marans.webp",
    imageAlt: "Gallinas Marans en un campo",
    origin: "Francia (región de Marans)",
    size: "Mediana-grande",
    description:
      "Buscada por sus huevos marrón muy oscuro, casi chocolate. Dócil y de doble propósito, requiere un poco más de paciencia en su crianza.",
    physicalTraits: [
      "Huevos marrón oscuro (los más oscuros según la línea)",
      "Plumaje tupido",
      "Tarsos y piel amarillentos",
      "Porte robusto",
    ],
    coloration: "Negra cobriza, blanca y wheat (variedades)",
    eggProduction: "Buena",
    eggColor: "Marrón oscuro",
    temperament: "Dócil y tranquila, aunque puede ser algo arisca en invierno",
    aptitudes: ["doble-proposito"],
    hardiness: 3,
    docility: 4,
    care: [
      "Prefiere ambientes secos y no muy húmedos",
      "El color del huevo se oscurece con buena alimentación",
      "Apta para manejo extensivo",
    ],
    curiosity:
      "Sus huevos son tan oscuros que la intensidad varía dentro de la temporada de postura.",
    availabilityNote: "Bajo pedido, ejemplares seleccionados por intensidad de huevo.",
  },
];

/** Busca una raza por su slug. */
export function getBreed(slug: string) {
  return breeds.find((b) => b.slug === slug);
}
