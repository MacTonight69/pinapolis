import type { Testimonial } from "./types";

/**
 * Testimonios de DEMOSTRACIÓN.
 *
 * ⚠️ Estos son ejemplos inventados para mostrar el diseño.
 * NO son reseñas reales. Antes de publicar, reemplazalos por
 * reseñas reales de clientes (o vaciá el array para ocultar
 * la sección). Cada tarjeta muestra una etiqueta "DEMO" mientras
 * el dato sea de ejemplo.
 */
export const testimonials: Testimonial[] = [
  {
    name: "María G. (DEMO)",
    location: "Zona rural (ejemplo)",
    text: "Pedí tres gallinas Plymouth Rock y me las trajeron con una explicación clarísima de cómo armar el nido y qué darles de comer. Se nota que conocen lo que crían.",
    rating: 5,
  },
  {
    name: "José L. (DEMO)",
    location: "Ciudad cercana (ejemplo)",
    text: "Consulté por una pareja Sussex y me respondieron enseguida, con paciencia y sin apuro. Las aves llegaron sanas y adaptadas. Muy buena experiencia.",
    rating: 5,
  },
  {
    name: "Ana R. (DEMO)",
    location: "Chacra (ejemplo)",
    text: "Tenía dudas sobre cuál raza elegir para mi primer gallinero y me asesoraron según mi espacio. Elegí Australorps y estoy encantada con los huevos.",
    rating: 5,
  },
];

/**
 * Verdadero cuando los testimonios son de ejemplo.
 * La interfaz lo usa para mostrar la etiqueta DEMO.
 */
export const testimonialsAreDemo = true;
