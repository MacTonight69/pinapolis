import { test, expect } from "@playwright/test";

/**
 * PRUEBAS FUNCIONALES — navegación y estructura.
 *
 * Verifican: navegación principal, footer, enlaces
 * internos, página 404 y menú móvil.
 */

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Razas", href: "/razas" },
  { label: "Guía", href: "/guia" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

test.describe("Navegación principal", () => {
  test("la portada carga con hero y CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const hero = page.locator("section[aria-label='Presentación de Pinapolis']");
    await expect(
      hero.getByRole("link", { name: "Explorar el catálogo" })
    ).toBeVisible();
    // Logo con nombre del negocio
    await expect(page.getByText("Pinapolis").first()).toBeVisible();
  });

  test("todos los enlaces de la navegación llevan a su página", async ({
    page,
  }) => {
    await page.goto("/");
    const headerNav = page.locator("nav[aria-label='Principal']");
    for (const link of NAV) {
      const anchor = headerNav.getByRole("link", {
        name: link.label,
        exact: true,
      });
      await expect(anchor).toBeVisible();
      await Promise.all([
        page.waitForURL(`**${link.href}`),
        anchor.click(),
      ]);
      expect(page.url()).toContain(link.href);
    }
  });

  test("el enlace 'saltar al contenido' funciona con teclado", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator('a[href="#contenido-principal"]');
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#contenido-principal")).toBeFocused();
  });

  test("el pie de página tiene navegación, categorías y legal", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Catálogo" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Gallinas" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Privacidad" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Créditos de imágenes" })).toBeVisible();
  });

  test("página no encontrada muestra 404 con opciones", async ({ page }) => {
    await page.goto("/esta-pagina-no-existe");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "se voló del gallinero"
    );
    await expect(page.getByRole("link", { name: "Volver al inicio" })).toBeVisible();
  });
});

test.describe("Menú móvil", () => {
  test.use({ viewport: { width: 375, height: 720 } });

  test("abre y cierra con el botón, con aria-expanded", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Abrir menú" });
    await expect(button).toBeVisible();
    await button.click();
    await expect(page.getByRole("button", { name: "Cerrar menú" })).toBeVisible();

    const menu = page.locator("nav[aria-label='Menú móvil']");
    await expect(
      menu.getByRole("link", { name: "Catálogo", exact: true })
    ).toBeVisible();

    await page.getByRole("button", { name: "Cerrar menú" }).click();
    await expect(button).toBeVisible();
    await expect(page.locator("#menu-movil")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  test("navegar desde el menú cierra el menú", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menú" }).click();
    const menu = page.locator("nav[aria-label='Menú móvil']");
    await menu.getByRole("link", { name: "Razas", exact: true }).click();
    await page.waitForURL("**/razas");
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeVisible();
  });
});

test.describe("Secciones de la portada", () => {
  test("razones, razas destacadas, ejemplares, guía y FAQ", async ({
    page,
  }) => {
    await page.goto("/");

    // Razones para elegir (con título de sección)
    await expect(
      page.getByRole("heading", { name: "Un criadero que acompaña" })
    ).toBeVisible();

    // Razas destacadas
    await expect(
      page.getByRole("heading", { name: "Razas con carácter y propósito" })
    ).toBeVisible();

    // Ejemplares destacados
    await expect(
      page.getByRole("heading", { name: "Ejemplares que buscan hogar" })
    ).toBeVisible();

    // Testimonios con etiqueta DEMO
    await expect(page.getByText("DEMO").first()).toBeVisible();

    // FAQ
    await expect(
      page.getByRole("heading", { name: "Preguntas que nos hacen seguido" })
    ).toBeVisible();

    // CTA final
    await expect(
      page.getByRole("heading", { name: "¿Listo para armar tu gallinero?" })
    ).toBeVisible();
  });

  test("el acordeón FAQ: el primero abre por defecto, se cierra y reabre", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("section[aria-label='Preguntas frecuentes']");
    const firstQuestion = section.getByRole("button").first();

    // Por defecto, el primer item está abierto
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");

    // Clic lo cierra
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");

    // Otro clic lo reabre
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");

    // El panel visible corresponde
    const panelId = await firstQuestion.getAttribute("aria-controls");
    await expect(page.locator(`#${panelId}`)).toBeVisible();
  });
});
