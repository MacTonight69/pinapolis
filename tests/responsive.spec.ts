import { test, expect } from "@playwright/test";

/**
 * PRUEBAS RESPONSIVE Y RENDIMIENTO.
 *
 * - 375px (móvil), 768px (tablet), 1440px (desktop)
 * - Menú móvil vs navegación de escritorio
 * - Sin errores de consola
 * - Imágenes WebP y lazy loading
 */

const VIEWPORTS = [
  { name: "móvil 375px", width: 375, height: 720 },
  { name: "tablet 768px", width: 768, height: 1024 },
  { name: "desktop 1440px", width: 1440, height: 900 },
];

test.describe("Responsive", () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.name}: la portada se ve completa sin scroll horizontal`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");

      // Sin scroll horizontal
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= window.innerWidth;
      });
      expect(overflow).toBe(true);

      // Hero visible
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test(`${vp.name}: catálogo funciona`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/catalogo");
      const cards = await page
        .locator("article")
        .filter({ hasText: "Precio" })
        .count();
      expect(cards).toBeGreaterThan(5);
    });
  }

  test("móvil: navegación desktop oculta, botón de menú visible", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 720 });
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Abrir menú" })
    ).toBeVisible();
    const desktopNav = page.locator("nav[aria-label='Principal']");
    await expect(desktopNav).toBeHidden();
  });

  test("desktop: navegación visible, botón de menú oculto", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(
      page.locator("nav[aria-label='Principal']")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Abrir menú" })
    ).toBeHidden();
  });

  test("móvil: las tarjetas del catálogo son de una columna", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 720 });
    await page.goto("/catalogo");
    const first = page
      .locator("article")
      .filter({ hasText: "Precio" })
      .first();
    const second = page
      .locator("article")
      .filter({ hasText: "Precio" })
      .nth(1);
    const box1 = await first.boundingBox();
    const box2 = await second.boundingBox();
    expect(box1).not.toBeNull();
    expect(box2).not.toBeNull();
    // Misma columna: x casi igual, y diferente
    expect(Math.abs(box1!.x - box2!.x)).toBeLessThan(5);
    expect(box2!.y).toBeGreaterThan(box1!.y);
  });

  test("desktop: las tarjetas del catálogo son de 3 columnas", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/catalogo");
    const cards = page
      .locator("article")
      .filter({ hasText: "Precio" });
    const first = cards.first();
    const second = cards.nth(1);
    const third = cards.nth(2);
    const [b1, b2, b3] = await Promise.all([
      first.boundingBox(),
      second.boundingBox(),
      third.boundingBox(),
    ]);
    expect(b1 && b2 && b3).toBeTruthy();
    // Misma fila (y casi igual), x creciente
    expect(Math.abs(b1!.y - b2!.y)).toBeLessThan(10);
    expect(Math.abs(b1!.y - b3!.y)).toBeLessThan(10);
    expect(b2!.x).toBeGreaterThan(b1!.x);
    expect(b3!.x).toBeGreaterThan(b2!.x);
  });
});

test.describe("Rendimiento y consola", () => {
  test("la portada no lanza errores de consola", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("el catálogo no lanza errores de consola", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/catalogo");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("imágenes del catálogo son WebP y con lazy loading", async ({
    page,
  }) => {
    await page.goto("/catalogo");
    const images = page.locator("article img");
    const count = await images.count();
    expect(count).toBeGreaterThan(5);
    for (let i = 0; i < Math.min(count, 6); i++) {
      const src = (await images.nth(i).getAttribute("src")) ?? "";
      expect(src).toContain(".webp");
      expect(await images.nth(i).getAttribute("loading")).toBe("lazy");
    }
  });

  test("la imagen del hero no es lazy (es LCP)", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section[aria-label='Presentación de Pinapolis'] img").first();
    await expect(hero).toBeVisible();
    expect(await hero.getAttribute("fetchpriority")).toBe("high");
  });

  test("la portada carga en menos de 4 segundos", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "load" });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(4000);
  });
});
