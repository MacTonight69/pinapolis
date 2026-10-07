import { test, expect } from "@playwright/test";

/**
 * PRUEBAS DE TRANSICIÓN ENTRE PÁGINAS.
 *
 * Al navegar se muestra una pantalla con un huevo animado que:
 * - aparece al empezar a navegar y se retira al llegar,
 * - nunca bloquea el puntero ni queda visible sin navegar,
 * - respeta `prefers-reduced-motion` (no se muestra).
 */

test.describe("Transición entre páginas", () => {
  test("la pantalla del huevo aparece al navegar y se oculta al llegar", async ({
    page,
  }) => {
    await page.goto("/");
    const overlay = page.getByTestId("transicion-huevo");

    // Estado inicial: oculta, decorativa y sin bloquear el puntero
    await expect(overlay).toHaveCSS("opacity", "0");
    await expect(overlay).toHaveAttribute("aria-hidden", "true");
    await expect(overlay).toHaveCSS("pointer-events", "none");

    // Navegar: la pantalla se muestra durante la transición…
    await page
      .locator("nav[aria-label='Principal']")
      .getByRole("link", { name: "Catálogo", exact: true })
      .click();
    await expect(overlay).not.toHaveCSS("opacity", "0");

    // …y se retira cuando la nueva página ya está visible.
    await page.waitForURL("**/catalogo");
    await expect(overlay).toHaveCSS("opacity", "0", { timeout: 4000 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // La nueva página entró con su animación de fundido.
    await expect(
      page.locator("#contenido-principal .animate-page-enter")
    ).toHaveCount(1);
  });

  test("al volver con 'atrás' también muestra la transición", async ({
    page,
  }) => {
    await page.goto("/");
    const overlay = page.getByTestId("transicion-huevo");
    await page
      .locator("nav[aria-label='Principal']")
      .getByRole("link", { name: "Razas", exact: true })
      .click();
    await page.waitForURL("**/razas");
    await expect(overlay).toHaveCSS("opacity", "0", { timeout: 4000 });

    await page.goBack();
    await expect(page).toHaveURL("/");
    await expect(overlay).not.toHaveCSS("opacity", "0");
    await expect(overlay).toHaveCSS("opacity", "0", { timeout: 4000 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Transición con movimiento reducido", () => {
  test.use({ reducedMotion: "reduce" });

  test("no muestra la pantalla del huevo al navegar", async ({ page }) => {
    await page.goto("/");
    const overlay = page.getByTestId("transicion-huevo");

    await page
      .locator("nav[aria-label='Principal']")
      .getByRole("link", { name: "Guía", exact: true })
      .click();
    await page.waitForURL("**/guia");

    // Deja pasar el tiempo en el que se habría mostrado.
    await page.waitForTimeout(900);
    await expect(overlay).toHaveCSS("opacity", "0");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
