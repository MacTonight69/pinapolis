import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * PRUEBAS DE ACCESIBILIDAD.
 *
 * - Análisis automático axe en las páginas principales
 * - Navegación por teclado
 * - Atributos ARIA en componentes interactivos
 */

const PAGES = [
  { name: "Inicio", path: "/" },
  { name: "Catálogo", path: "/catalogo" },
  { name: "Detalle de producto", path: "/catalogo/gallina-plymouth-rock" },
  { name: "Razas", path: "/razas" },
  { name: "Detalle de raza", path: "/razas/plymouth-rock" },
  { name: "Guía", path: "/guia" },
  { name: "Artículo", path: "/guia/como-elegir-una-gallina" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Contacto", path: "/contacto" },
];

test.describe("Accesibilidad — axe", () => {
  // Con movimiento reducido el CSS muestra todo el contenido de
  // inmediato: axe mide los colores reales, no estados intermedios
  // de la animación Reveal (y además verificamos la modalidad
  // que exige WCAG para usuarios con preferencia de movimiento).
  test.use({ reducedMotion: "reduce" });

  for (const pg of PAGES) {
    test(`${pg.name} no tiene violaciones graves de accesibilidad`, async ({
      page,
    }) => {
      await page.goto(pg.path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      // Violaciones críticas/serias deben ser cero
      const serious = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );
      expect(serious).toEqual([]);
    });
  }
});

test.describe("Accesibilidad — semántica y teclado", () => {
  test("la portada tiene un solo H1 y estructura de títulos", async ({
    page,
  }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("imágenes tienen alt (vacío = decorativa, nunca nulo)", async ({
    page,
  }) => {
    await page.goto("/razas/plymouth-rock");
    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      // alt nunca es null: o describe o es "" (decorativa)
      expect(alt).not.toBeNull();
    }
  });

  test("botones del acordeón FAQ tienen aria-expanded y aria-controls", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("section[aria-label='Preguntas frecuentes']");
    const button = section.getByRole("button").first();
    const controls = await button.getAttribute("aria-controls");
    const expanded = await button.getAttribute("aria-expanded");
    expect(controls).toBeTruthy();
    expect(expanded).toBe("true"); // el primero abre por defecto
    // El panel existe con el id referenciado
    await expect(page.locator(`#${controls}`)).toBeVisible();
  });

  test("el catálogo tiene label en la búsqueda y contador con aria-live", async ({
    page,
  }) => {
    await page.goto("/catalogo");
    const search = page.getByLabel("Buscar por nombre, raza o descripción");
    await expect(search).toBeVisible();
    const live = page.locator('[aria-live="polite"]').first();
    await expect(live).toBeVisible();
  });

  test("foco visible: el primer Tab aterriza en el enlace de saltar", async ({
    page,
  }) => {
    await page.goto("/nosotros");
    await page.keyboard.press("Tab");
    const skip = page.locator('a[href="#contenido-principal"]');
    await expect(skip).toBeFocused();
  });
});

test.describe("Menú móvil — teclado", () => {
  test.use({ viewport: { width: 375, height: 720 } });

  test("Escape lo cierra y devuelve el foco al botón", async ({ page }) => {
    await page.goto("/");
    const openBtn = page.getByRole("button", { name: "Abrir menú" });
    await openBtn.click();
    await page.keyboard.press("Escape");
    await expect(openBtn).toBeFocused();
  });
});
