import { test, expect } from "@playwright/test";

/**
 * PRUEBAS FUNCIONALES — catálogo:
 * filtros, búsqueda, estados vacíos y flujo de consulta.
 */

test.describe("Catálogo", () => {
  test("lista ejemplares con contador", async ({ page }) => {
    await page.goto("/catalogo");
    const counter = page.getByText(/ejemplar(es)?$/).first();
    await expect(counter).toContainText("ejemplares");
    // Hay tarjetas de producto
    const cards = page.locator("article").filter({ hasText: "Precio" });
    expect(await cards.count()).toBeGreaterThan(10);
  });

  test("filtrar por categoría 'Gallinas'", async ({ page }) => {
    await page.goto("/catalogo");
    const totalBefore = await page
      .locator("article")
      .filter({ hasText: "Precio" })
      .count();

    await page
      .getByRole("button", { name: "Gallinas", exact: true })
      .click();

    const totalAfter = await page
      .locator("article")
      .filter({ hasText: "Precio" })
      .count();
    expect(totalAfter).toBeLessThan(totalBefore);
    expect(totalAfter).toBeGreaterThan(0);

    // El contador se actualiza
    await expect(
      page.getByText(/con 1 filtro/).first()
    ).toBeVisible();

    // Todas las tarjetas visibles son gallinas
    const species = await page
      .locator("article p.text-xs")
      .allTextContents();
    const filtered = species.filter((s) => s.includes("Gallina"));
    expect(filtered.length).toBeGreaterThan(0);
  });

  test("buscar por raza (Brahma) reduce resultados", async ({
    page,
  }) => {
    await page.goto("/catalogo");
    const search = page.getByLabel("Buscar por nombre, raza o descripción");
    await search.fill("brahma");
    await expect(
      page.getByText(/1 ejemplar/).first()
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Gallina Brahma" })).toBeVisible();
  });

  test("búsqueda sin resultados muestra estado vacío", async ({
    page,
  }) => {
    await page.goto("/catalogo");
    const search = page.getByLabel("Buscar por nombre, raza o descripción");
    await search.fill("zzz-no-existe");
    await expect(page.getByRole("heading", { name: "No encontramos ejemplares" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Limpiar búsqueda y filtros" })
    ).toBeVisible();
  });

  test("limpiar filtros restaura el listado", async ({ page }) => {
    await page.goto("/catalogo");
    await page
      .getByRole("button", { name: "Gallos", exact: true })
      .click();
    await expect(page.getByText(/con 1 filtro/).first()).toBeVisible();
    await page
      .getByRole("button", { name: "Limpiar filtros" })
      .click();
    await expect(page.getByText(/con 1 filtro/)).toHaveCount(0);
    // Vuelven todas las tarjetas
    const cards = await page
      .locator("article")
      .filter({ hasText: "Precio" })
      .count();
    expect(cards).toBeGreaterThan(10);
  });

  test("los filtros se sincronizan con la URL", async ({ page }) => {
    await page.goto("/catalogo");
    await page
      .getByRole("button", { name: "Gallos", exact: true })
      .click();
    await expect(page).toHaveURL(/categoria=gallos/);
    // Recargar mantiene el filtro
    await page.reload();
    await expect(page.getByText(/con 1 filtro/).first()).toBeVisible();
  });

  test("select de disponibilidad filtra", async ({ page }) => {
    await page.goto("/catalogo");
    await page.getByLabel("Disponibilidad").selectOption("disponible");
    await expect(
      page.getByText(/con 1 filtro/).first()
    ).toBeVisible();
  });
});

test.describe("Flujo de consulta desde el catálogo", () => {
  test("'Consultar' lleva al formulario con el producto precargado", async ({
    page,
  }) => {
    await page.goto("/catalogo");
    // Sin WhatsApp configurado, el botón es un enlace al formulario
    const firstConsult = page
      .getByRole("link", { name: /Consultar por/ })
      .first();
    await firstConsult.click();
    await expect(page).toHaveURL(/\/contacto/);
    await expect(page).toHaveURL(/producto=/);
    // Aviso de producto precargado
    await expect(page.getByText("Tu consulta incluye")).toBeVisible();
  });

  test("detalle de producto tiene panel de consulta con mensaje preparado", async ({
    page,
  }) => {
    await page.goto("/catalogo/gallina-plymouth-rock");
    await expect(page.getByRole("heading", { level: 1, name: "Gallina Plymouth Rock" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Consultá por Gallina Plymouth Rock" })
    ).toBeVisible();
    // Mensaje preparado contiene el nombre del producto
    await expect(
      page.getByText(/Quiero consultar por "Gallina Plymouth Rock"/)
    ).toBeVisible();
    // Botones de canal
    await expect(
      page.getByRole("link", { name: "Consultar por el formulario" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Copiar mensaje" })
    ).toBeVisible();
    // Sin WhatsApp configurado: no aparece el botón de WhatsApp
    await expect(page.getByRole("link", { name: "Enviar por WhatsApp" })).toHaveCount(0);
  });

  test("detalle muestra datos del ejemplar y productos relacionados", async ({
    page,
  }) => {
    await page.goto("/catalogo/gallina-sussex");
    // Especie, sexo, edad, disponibilidad
    await expect(page.getByText("Especie")).toBeVisible();
    // El valor de sexo vive en el <dd> de la ficha de datos
    await expect(
      page.getByRole("definition").filter({ hasText: /^Hembra$/ })
    ).toBeVisible();
    // Precio del ejemplar (el de la ficha, antes que los relacionados)
    await expect(page.getByText("Consultar precio").first()).toBeVisible();
    // Relacionados
    await expect(
      page.getByRole("heading", { name: "También te puede interesar" })
    ).toBeVisible();
  });

  test("slug inválido de producto muestra 404", async ({ page }) => {
    await page.goto("/catalogo/no-existe-xyz");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "se voló del gallinero"
    );
  });
});

test.describe("Razas", () => {
  test("índice de razas muestra todas las fichas", async ({ page }) => {
    await page.goto("/razas");
    const cards = page.locator("a[href^='/razas/']");
    expect(await cards.count()).toBeGreaterThanOrEqual(10);
    await expect(page.getByRole("heading", { name: "Plymouth Rock" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Brahma" })).toBeVisible();
  });

  test("ficha de raza muestra indicadores y cuidados", async ({
    page,
  }) => {
    await page.goto("/razas/plymouth-rock");
    await expect(
      page.getByRole("heading", { level: 1, name: "Plymouth Rock" })
    ).toBeVisible();
    await expect(page.getByText("Indicadores orientativos")).toBeVisible();
    await expect(page.getByText("Recomendaciones de crianza")).toBeVisible();
    await expect(page.getByText("¿Lo sabías?")).toBeVisible();
    // Ejemplares disponibles de la raza
    await expect(
      page.getByRole("heading", { name: "Disponibilidad en Pinapolis" })
    ).toBeVisible();
  });

  test("slug inválido de raza muestra 404", async ({ page }) => {
    await page.goto("/razas/no-existe-xyz");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "se voló del gallinero"
    );
  });
});

test.describe("Guía de crianza", () => {
  test("índice de la guía lista artículos", async ({ page }) => {
    await page.goto("/guia");
    const cards = page.locator("a[href^='/guia/']");
    expect(await cards.count()).toBeGreaterThanOrEqual(8);
    await expect(
      page.getByRole("heading", { name: "Cómo elegir una gallina" })
    ).toBeVisible();
  });

  test("artículo muestra contenido e índice lateral", async ({
    page,
  }) => {
    await page.goto("/guia/como-elegir-una-gallina");
    await expect(
      page.getByRole("heading", { level: 1, name: "Cómo elegir una gallina" })
    ).toBeVisible();
    // Índice lateral (desktop)
    await expect(page.getByText("En este artículo")).toBeVisible();
    // Secciones del artículo
    await expect(
      page.getByRole("heading", { name: "Empezá por el objetivo" })
    ).toBeVisible();
  });
});
