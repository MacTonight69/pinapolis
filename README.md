# Pinapolis

Sitio web comercial de **Pinapolis**, venta de gallinas y aves de corral. Construido con Next.js (App Router), TypeScript y Tailwind CSS.

## Requisitos

- Node.js 20+
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

## Producción

```bash
npm run build
npm start
```

## Estructura

```
app/            layout, página principal, estilos, iconos
components/     Header, Hero, ProductGrid, ProductCard, Benefits, HowItWorks,
                Gallery, About, FAQ, FinalCTA, Contact, Footer, WhatsAppFloat
data/           business.ts (datos del negocio), products.ts (productos)
lib/            whatsapp.ts (generación de enlaces de WhatsApp)
public/images/  imágenes (placeholders SVG reemplazables)
scripts/        generador de placeholders
```

## Configurar el negocio

Los datos editables viven en `data/business.ts` o en `.env.local` (ver `.env.example`):

```ts
export const business = {
  name: "Pinapolis",
  whatsapp: "",   // ej: "54911XXXXXXXX" (sin + ni espacios)
  phone: "",
  email: "",
  address: "",
  schedule: "",
  instagram: "",
  facebook: "",
  siteUrl: "https://tu-dominio.com",
};
```

Si un dato está vacío, el bloque correspondiente se oculta automáticamente.

## WhatsApp

- El número se configura una sola vez (variable `whatsapp` o `NEXT_PUBLIC_WHATSAPP`).
- El mensaje por defecto vive en `lib/whatsapp.ts`.
- Cada producto genera su mensaje propio: `"Hola, quiero consultar por [PRODUCTO]. ¿Tienen disponibilidad?"`.
- Si no hay número configurado, los botones de WhatsApp no se muestran (se reemplazan por anclas a Contacto). **No uses números falsos.**

## Productos

Editá `data/products.ts`. Cada producto: nombre, categoría, edad/raza/característica, descripción, disponibilidad, precio (`null` si no confirmado, muestra "Consultar precio") e imagen. Si la lista queda vacía, se muestra un estado elegante invitando a consultar por WhatsApp.

## Imágenes

Las imágenes actuales son placeholders SVG en `public/images/`. Para usar fotos reales:

1. Copiá tus fotos a `public/images/` con nombres claros (ej. `hero-gallinas.jpg`).
2. Actualizá las rutas en `data/products.ts`, `components/Hero.tsx`, `components/Gallery.tsx` y `components/About.tsx` (cambiar `.svg` por `.jpg`).
3. Podés regenerar los placeholders con `node scripts/gen-placeholders.cjs`.

## Calidad

```bash
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript estricto
npm run build       # build de producción
```

## Licencia

Este proyecto se distribuye bajo la **GNU General Public License v3 (GPL-3.0-only)**.
Ver [`LICENSE`](./LICENSE). Las dependencias de terceros en `node_modules/` conservan sus propias licencias.

## SEO y accesibilidad

- Metadata completa (title, description, Open Graph, Twitter card, canonical).
- Schema.org: `LocalBusiness` y `FAQPage` siempre; `Product` solo cuando el precio está configurado (nunca se inventan precios).
- HTML semántico, jerarquía H1/H2/H3, alt text, focus visible, menú y FAQ accesibles por teclado, `prefers-reduced-motion` respetado.

## Despliegue

Cualquier plataforma compatible con Next.js (Vercel, Netlify, hosting propio con `npm run build && npm start`). Recordá configurar las variables de entorno en la plataforma.
