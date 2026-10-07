import type { GuideArticle } from "./types";

/**
 * Guía de crianza. Contenido general y orientativo:
 * verificá siempre con un veterinario o criador local antes
 * de tomar decisiones sobre salud animal.
 */
export const guideArticles: GuideArticle[] = [
  {
    slug: "como-elegir-una-gallina",
    title: "Cómo elegir una gallina",
    description:
      "Qué mirar al elegir tu primera gallina: edad, raza, temperamento y estado del plumaje.",
    image: "/images/guia/como-elegir-una-gallina.webp",
    imageAlt: "Gallina en un corral",
    minutes: 6,
    level: "Principiante",
    sections: [
      {
        heading: "Empezá por el objetivo",
        paragraphs: [
          "Antes de elegir un animal, definí qué querés del gallinero. ¿Huevos para consumo familiar? ¿Carne? ¿Compañía? Cada objetivo empuja hacia razas distintas: las ponedoras rinden más huevos, las de doble propósito ofrecen un equilibrio, y las ornamentales aportan belleza con menor producción.",
          "Un error común es comprar por el color del plumaje o la ternura del pollito. Las necesidades de la ave y tu espacio importan más que la estética.",
        ],
      },
      {
        heading: "Edad: adulta, pollita o pollito",
        paragraphs: [
          "Una gallina adulta en postura es la opción más rápida: sabés qué esperas desde el primer día. Las pollitas jóvenes (próximas a poner) son un buen punto intermedio: se adaptan a tu gallinero y empiezan a poner en semanas.",
          "Los pollitos son la opción más económica pero demandan más trabajo: calor, protección y alimento de inicio durante las primeras semanas.",
        ],
      },
      {
        heading: "Cómo reconocer un buen ejemplar",
        list: [
          "Ojos brillantes y alerta, sin hinchazón ni secreciones",
          "Plumaje limpio y completo (en muda es normal ver huecos)",
          "Cresta y barbillas de color vivo, sin costras",
          "Se mueve con equilibrio, sin cojeras",
          "Ventana de hueso: las puntas de los huesos pélvicos flexibles indican puesta reciente",
        ],
      },
      {
        heading: "Preguntá al criador",
        paragraphs: [
          "Un buen criador te dice de qué se alimentan las aves, cómo fueron controladas sanitariamente y qué esperar según la raza. Si evita esas preguntas, es mejor buscar otro proveedor.",
        ],
      },
    ],
  },
  {
    slug: "gallinas-y-gallos",
    title: "Diferencias entre gallinas y gallos",
    description:
      "Cómo distinguirlos, cuándo conviene un gallo y cuándo no.",
    image: "/images/guia/gallinas-y-gallos.webp",
    imageAlt: "Gallo de perfil en primer plano",
    minutes: 5,
    level: "Principiante",
    sections: [
      {
        heading: "Para qué sirve cada uno",
        paragraphs: [
          "Las gallinas ponen huevos con o sin gallo: los huevos de mesa son fértiles solo si hay gallo. El gallo aporta fecundidad para criar pollitos, protección del grupo y, en algunos casos, plumajes espectaculares.",
          "A cambio, el gallo canta (a veces muy temprano), puede ser territorial y, según la zona, puede estar restringido por ordenanzas locales.",
        ],
      },
      {
        heading: "Cómo diferenciarlos",
        list: [
          "El gallo suele ser más grande, con cresta y barbillas más desarrolladas",
          "Cola larga y curvada en el gallo; plumas de silla y manto más brillantes",
          "Espuela en la pata trasera (marcada en el gallo)",
          "En muchas razas, el gallo muestra el dibujo de plumaje más definido",
        ],
      },
      {
        heading: "¿Cuántos gallos por gallinero?",
        paragraphs: [
          "Si buscás huevos de consumo, no necesitás gallo. Si querés pollitos, la proporción habitual es un gallo por cada 8 a 12 gallinas. Demasiados gallos en poco espacio generan peleas y estrés en el plantel.",
        ],
      },
    ],
  },
  {
    slug: "preparar-el-gallinero",
    title: "Cómo preparar un gallinero",
    description:
      "Espacio, nidos, perchas, ventilación y protección: lo esencial antes de recibir las aves.",
    image: "/images/guia/preparar-el-gallinero.webp",
    imageAlt: "Gallinero de madera",
    minutes: 8,
    level: "Principiante",
    sections: [
      {
        heading: "El espacio importa",
        paragraphs: [
          "Como referencia orientativa, cada ave necesita un área cubierta de alrededor de 0,2–0,3 m² y un espacio exterior varias veces mayor cuando es posible. Más libertad siempre mejora el bienestar y la calidad de los huevos.",
          "Sobrepoblar es la causa más frecuente de estrés, plumas rotas y menos huevos.",
        ],
      },
      {
        heading: "Los tres elementos indispensables",
        list: [
          "Nidos: uno por cada 4–5 gallinas, en rincón oscuro y tranquilo",
          "Perchas: una rama o tabla por ave, a unos 40–60 cm del piso",
          "Piso: cama seca (viruta, paja o hojas) que renueves regularmente",
        ],
      },
      {
        heading: "Ventilación sin corrientes de aire",
        paragraphs: [
          "El gallinero debe ventilarse para sacar la humedad del aliento y las heces, pero sin corrientes directas sobre las aves. La humedad persistente es la madre de las enfermedades respiratorias.",
        ],
      },
      {
        heading: "Protección",
        paragraphs: [
          "Malla resistente en todas las aberturas, cierre nocturno obligatorio y, si hay depredadores en la zona, revisar que no haya huecos de más de un par de dedos. El gallo avisa, pero no reemplaza una buena malla.",
        ],
      },
    ],
  },
  {
    slug: "alimentacion-basica",
    title: "Alimentación básica",
    description:
      "Balanceado, complementos y los alimentos que hay que evitar.",
    image: "/images/guia/alimentacion-basica.webp",
    imageAlt: "Gallinas pastando en un prado",
    minutes: 6,
    level: "Principiante",
    sections: [
      {
        heading: "La base: alimento balanceado",
        paragraphs: [
          "El alimento balanceado para gallinas de postura debe ser el pilar de la dieta adulta: suele ser el 80–90% de lo que comen. Para pollitos existe alimento de inicio con más proteína; para reproductores, uno específico.",
          "Cambios bruscos de alimento se hacen mezclando el viejo y el nuevo durante una semana.",
        ],
      },
      {
        heading: "Complementos útiles",
        list: [
          "Pasto verde y malezas del huerto",
          "Restos de verduras y frutas (sin sal ni condimentos)",
          "Grava o arena fina para la molleja",
          "Cáscara de huevo calcinada o piedra caliza, como suplemento de calcio según necesidad",
        ],
      },
      {
        heading: "Lo que hay que evitar",
        list: [
          "Restos salados, fritos o condimentados",
          "Aguacate, cebolla cruda y cualquier alimento mohoso",
          "Alimentos dulces o chatarra",
          "Plantas tóxicas de jardín (adelfa, azalea, entre otras)",
        ],
      },
      {
        heading: "Pastoreo libre y control",
        paragraphs: [
          "Una gallina en libertad complementa su dieta con pasto e insectos, pero igual necesita el balanceado: el pasto solo no alcanza en producción. Si la gallina deja de comer, revisá el alimento por humedad o moho.",
        ],
      },
    ],
  },
  {
    slug: "agua-y-cuidados",
    title: "Agua y cuidados diarios",
    description:
      "La rutina de diez minutos que mantiene sano un plantel.",
    image: "/images/guia/agua-y-cuidados.webp",
    imageAlt: "Bebedero para gallinas",
    minutes: 4,
    level: "Principiante",
    sections: [
      {
        heading: "Agua limpia, siempre",
        paragraphs: [
          "El agua es más importante que el alimento: una gallina puede dejar de comer antes que de beber, y sin agua la caída de postura es inmediata. Revisá los bebederos dos veces al día en verano, y protegé el agua del congelamiento en invierno.",
        ],
      },
      {
        heading: "Rutina diaria (10 minutos)",
        list: [
          "Abrir el gallinero al amanecer",
          "Revisar agua fresca y alimento",
          "Contar las aves y mirar comportamientos raros",
          "Recoger huevos (1–2 veces al día)",
          "Cerrar todo antes del anochecer",
        ],
      },
      {
        heading: "Rutina semanal",
        paragraphs: [
          "Renovar la cama, limpiar nidos y perchas, desinfectar bebederos y revisar la malla. Un gallinero limpio evita la mayoría de los problemas de salud.",
        ],
      },
    ],
  },
  {
    slug: "razas-para-empezar",
    title: "Introducción a las razas",
    description:
      "Un panorama de las razas más difundidas y para qué sirve cada una.",
    image: "/images/guia/razas-para-empezar.webp",
    imageAlt: "Grupo de gallinas de distintas razas",
    minutes: 7,
    level: "Principiante",
    sections: [
      {
        heading: "Ponedoras",
        paragraphs: [
          "Leghorn y Australorp destacan por su producción constante. Son ideales si el objetivo principal son huevos, aunque algunas variedades son más nerviosas o independientes.",
        ],
      },
      {
        heading: "Doble propósito",
        paragraphs: [
          "Plymouth Rock, Rhode Island Red y Sussex combinan huevos y carne con temperamento tranquilo. Son la opción más versátil para un criador casero.",
        ],
      },
      {
        heading: "Grandes y ornamentales",
        paragraphs: [
          "Orpington y Brahma impresionan por su tamaño y plumaje, y son dóciles, pero comen más y producen menos huevos. Son excelentes para familias con niños y espacio amplio.",
        ],
      },
      {
        heading: "Razas con algo especial",
        paragraphs: [
          "Araucana aporta huevos azulados y Marans los marrón más oscuros. Si te atrae un huevo de color particular, elegí la raza por eso, pero confirmá que el criador trabaja con aves de calidad genética.",
        ],
      },
    ],
  },
  {
    slug: "ejemplar-saludable",
    title: "Cómo reconocer un ejemplar saludable",
    description:
      "Señales de buena salud y señales de alerta que requieren consulta.",
    image: "/images/guia/ejemplar-saludable.webp",
    imageAlt: "Gallina en buen estado",
    minutes: 5,
    level: "Intermedio",
    sections: [
      {
        heading: "Señales de buena salud",
        list: [
          "Activa durante el día, con ganas de picotear",
          "Plumaje limpio, bien ceñido y completo (fuera de muda)",
          "Cresta y barbillas rojas y firmes",
          "Ojos brillantes, sin lagrimeo",
          "Heces con forma, sin sangre ni olor extremo",
        ],
      },
      {
        heading: "Señales de alerta",
        list: [
          "Ave apartada, postrada o con los ojos cerrados",
          "Plumaje erizado y apático",
          "Secreciones nasales o oculares, estornudos",
          "Cojera, hinchazón o costras en la cresta",
          "Bajón repentino de postura",
        ],
      },
      {
        heading: "Qué hacer ante la duda",
        paragraphs: [
          "Aislar al ave sospechosa, revisar alimento y agua, y consultar con un veterinario o criador experimentado. Muchas enfermedades son más manejables si se detectan temprano.",
        ],
      },
    ],
  },
  {
    slug: "consejos-para-principiantes",
    title: "Recomendaciones para principiantes",
    description:
      "Los ocho consejos que ahorran dolores de cabeza en el primer gallinero.",
    image: "/images/guia/consejos-para-principiantes.webp",
    imageAlt: "Gallina con sus pollitos",
    minutes: 5,
    level: "Principiante",
    sections: [
      {
        heading: "Ocho consejos clave",
        list: [
          "Empezá con pocas aves (3–4) y crece después",
          "Elegí razas dóciles y rústicas para tu primera experiencia",
          "Prepará el gallinero antes de traer las aves, no después",
          "No compres solo por el precio: preguntá por el manejo sanitario",
          "Dejá que las aves se adapten una semana antes de cambiarles la dieta",
          "Revisá las ordenanzas locales sobre cantidad de aves y gallos",
          "Mantené una libreta: postura, comportamiento, tratamientos",
          "Establecé contacto con un criador local para consultas",
        ],
      },
      {
        heading: "El primer mes",
        paragraphs: [
          "Las primeras semanas son de adaptación: pueden poner poco o nada mientras conocen el gallinero. Paciencia, rutina diaria y un ambiente tranquilo son la mejor inversión.",
        ],
      },
    ],
  },
];

/** Busca un artículo por su slug. */
export function getGuideArticle(slug: string) {
  return guideArticles.find((a) => a.slug === slug);
}
