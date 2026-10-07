import type { Faq } from "./types";

/**
 * Preguntas frecuentes generales (portada).
 * Contenido de demostración: reemplazá por las dudas reales
 * de tus clientes antes de publicar.
 */
export const faqs: Faq[] = [
  {
    question: "¿Cómo puedo consultar por un ejemplar?",
    answer:
      "Desde cada ficha de producto o raza tenés el botón “Consultar”. Se abre el canal de contacto que prefieras —WhatsApp, email o el formulario— con el nombre del ejemplar ya cargado para que no tengas que escribirlo.",
  },
  {
    question: "¿Venden gallinas y gallos de todas las edades?",
    answer:
      "Trabajamos con gallinas adultas en postura, pollitas jóvenes próximas a poner y, en algunas temporadas, pollitos criados por madre. La disponibilidad exacta cambia según la época del año, por eso conviene consultar antes de acercarte.",
  },
  {
    question: "¿Cómo sé qué raza conviene para mi caso?",
    answer:
      "Si buscás huevos, priorizá razas de postura como Leghorn o Australorp. Si querés un plantel equilibrado, las de doble propósito (Plymouth Rock, Sussex) son la mejor opción. Si es tu primera vez, elegí razas dóciles y rústicas. Contanos tu espacio y experiencia y te asesoramos sin cargo.",
  },
  {
    question: "¿Hacen envíos o hay que retirar en el criadero?",
    answer:
      "Las formas de entrega se coordinan según tu zona y la cantidad de ejemplares. Escribinos tu consulta con la ciudad o localidad y te respondemos con las opciones disponibles.",
  },
  {
    question: "¿Las aves vienen desparasitadas y controladas?",
    answer:
      "Nuestro plantel se mantiene con controles sanitarios regulares y las aves que entregamos pasan por una revisión previa. Los detalles del manejo sanitario los coordinamos en la consulta, según el destino y la cantidad de ejemplares.",
  },
  {
    question: "¿Puedo visitar el criadero antes de comprar?",
    answer:
      "Las visitas se coordinan con turno previo para cuidar el manejo del plantel. En la sección Contacto dejá tu mensaje indicando que querés visitarnos y te confirmamos día y horario.",
  },
];

/**
 * FAQ específicas sobre crianza (sección Guía).
 */
export const breedingFaqs: Faq[] = [
  {
    question: "¿Gallina o gallo? ¿Cuál elijo si empiezo?",
    answer:
      "Para huevos y compañía, empezá con gallinas: ponen sin necesidad de gallo. El gallo solo hace falta si querés pollitos fértiles, y suele sumar canto y temperamento más firme al grupo.",
  },
  {
    question: "¿Cuántas gallinas necesita un principiante?",
    answer:
      "Un grupo pequeño de 3 a 4 gallinas es el punto de partida habitual: alcanza para huevos de consumo familiar y es fácil de manejar. Siempre verificá las normas locales de tu zona sobre cantidad de aves.",
  },
  {
    question: "¿Qué comerán mis gallinas?",
    answer:
      "La base es un alimento balanceado para gallinas de postura, complementado con pasto, verduras y restos de cocina aptos. Evitá restos salados, aguacate, cebolla cruda y alimentos mohosos. Agua limpia siempre disponible.",
  },
  {
    question: "¿Un gallo es ruidoso molesta a los vecinos?",
    answer:
      "El canto del gallo puede escucharse a cierta distancia, especialmente al amanecer. Si vivís en zona urbana o con vecinos cercanos, revisá las ordenanzas locales y considerá empezar solo con gallinas.",
  },
];
