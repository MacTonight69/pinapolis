/**
 * Manifiesto de imágenes: título original en Wikimedia Commons → archivo local.
 * Las licencias y autores se extraen automáticamente al descargar
 * (scripts/fetch-images.cjs) y quedan en data/image-credits.ts.
 *
 * Para REEMPLAZAR por fotos reales de Pinapolis:
 *   1. Copiá tus fotos a public/images/{breeds|productos|sitio|guia}/
 *   2. Actualizá las rutas en data/breeds.ts y data/products.ts
 *   3. Podés borrar los archivos de demostración y su crédito en data/image-credits.ts
 */

/** width: ancho de salida en px (max). */
const manifest = [
  // ── Razas ──────────────────────────────────────────────────────────────
  { file: "breeds/plymouth-rock.webp", width: 1100, commons: "File:Barred Plymouth Rocks (21837709749).jpg" },
  { file: "breeds/rhode-island-red.webp", width: 1100, commons: "File:Rhode Island Red rooster.jpg" },
  { file: "breeds/leghorn.webp", width: 1100, commons: "File:ARS-White Leghorn hen (cropped).jpg" },
  { file: "breeds/sussex.webp", width: 1100, commons: "File:Light Sussex hen - Collingwood Children's Farm.jpg" },
  { file: "breeds/orpington.webp", width: 1100, commons: "File:A Buff Orpington Hen in Sunlight.jpg" },
  { file: "breeds/brahma.webp", width: 1100, commons: "File:Dark Brahma hen, Oregon.jpg" },
  { file: "breeds/australorp.webp", width: 1100, commons: "File:Black australorp hen.jpg" },
  { file: "breeds/wyandotte.webp", width: 1100, commons: "File:Golden Laced Wyandotte 2017.jpg" },
  { file: "breeds/araucana.webp", width: 1100, commons: "File:Araucana chicken 01.jpg" },
  { file: "breeds/marans.webp", width: 1100, commons: "File:Poule Marans coucou.jpg" },

  // ── Sitio (hero, galería, nosotros) ────────────────────────────────────
  { file: "sitio/hero.webp", width: 2000, commons: "File:Flock of Rhode Island Red, Easter Egger, and Barred Plymouth Rock Hens.jpg" },
  { file: "sitio/nosotros.webp", width: 1400, commons: "File:Volailles Bresse (cropped).JPG" },
  { file: "sitio/galeria-corral.webp", width: 1000, commons: "File:Farmland Animal Park - 20230116 - 06 - Ain't Nobody Here But Us Chickens.jpg" },
  { file: "sitio/galeria-gallo.webp", width: 1000, commons: "File:Rooster portrait, France.jpg" },
  { file: "sitio/galeria-gallinero.webp", width: 1000, commons: "File:Hühnerstall, Kloster, 2024 Bakonybél.jpg" },
  { file: "sitio/galeria-gallina-pollitos.webp", width: 1000, commons: "File:Hen and a pep of seven chicks - geograph.org.uk - 6278276.jpg" },
  { file: "sitio/galeria-huevos.webp", width: 1000, commons: "File:Eggs in basket 2020 G1.jpg" },
  { file: "sitio/galeria-campo.webp", width: 1000, commons: "File:Haushühner, Kloster, 2024 Bakonybél.jpg" },

  // ── Productos (complementan las fotos de raza) ─────────────────────────
  { file: "productos/gallo-plymouth-rock.webp", width: 1100, commons: "File:Barred Plymouth Rock Rooster (2).jpg" },
  { file: "productos/pollitas-sussex.webp", width: 1100, commons: "File:-2020-07-08 Young Light Sussex chicken, Trimingham (2).JPG" },
  { file: "productos/gallina-con-pollitos.webp", width: 1100, commons: "File:Buff Orpington hen with chicks.jpg" },
  { file: "productos/huevos-fertilizados.webp", width: 1100, commons: "File:Eggs in basket 2020 G1.jpg" },
  { file: "productos/gallo-andaluz.webp", width: 1100, commons: "File:Andalusian rooster head big (portrait).jpg" },
  { file: "productos/gallina-campera.webp", width: 1100, commons: "File:Chicken-IMG 5803.jpg" },

  // ── Guía ───────────────────────────────────────────────────────────────
  { file: "guia/como-elegir-una-gallina.webp", width: 1000, commons: "File:Chicken-IMG 5798.jpg" },
  { file: "guia/gallinas-y-gallos.webp", width: 1000, commons: "File:Andalusian rooster head big (portrait).jpg" },
  { file: "guia/preparar-el-gallinero.webp", width: 1000, commons: "File:Hühnerstall, Kloster, 2024 Bakonybél.jpg" },
  { file: "guia/alimentacion-basica.webp", width: 1000, commons: "File:Volailles Bresse (cropped).JPG" },
  { file: "guia/agua-y-cuidados.webp", width: 1000, commons: "File:Chicken waterer.jpg" },
  { file: "guia/razas-para-empezar.webp", width: 1000, commons: "File:Flock of Rhode Island Red, Easter Egger, and Barred Plymouth Rock Hens.jpg" },
  { file: "guia/ejemplar-saludable.webp", width: 1000, commons: "File:Penny the Buff Orpington.jpg" },
  { file: "guia/consejos-para-principiantes.webp", width: 1000, commons: "File:Hen and a pep of seven chicks - geograph.org.uk - 6278276.jpg" },
];

module.exports = { manifest };
