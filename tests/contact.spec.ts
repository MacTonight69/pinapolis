import { test, expect } from "@playwright/test";

/**
 * PRUEBAS DE ERROR Y VALIDACIÓN — formulario de contacto.
 *
 * Cubre: validación en cliente (vacío, email inválido,
 * mensaje corto) y re-validación del servidor, además
 * del comportamiento honesto cuando no hay transporte
 * de email configurado (nunca finge un envío).
 */

const VALID = {
  nombre: "María Ejemplo",
  email: "maria.ejemplo@mail.com",
  mensaje:
    "Hola! Quiero consultar por dos gallinas Plymouth Rock para mi primer gallinero. Vivo en zona rural.",
};

test.describe("Formulario de contacto — validación", () => {
  test("enviar vacío muestra errores en todos los campos obligatorios", async ({
    page,
  }) => {
    await page.goto("/contacto");
    await page.getByRole("button", { name: "Enviar consulta" }).click();

    // Resumen de errores accesible
    await expect(page.getByRole("alert").first()).toContainText(
      "Revisá los campos"
    );
    // Errores por campo
    await expect(page.getByText("Ingresá tu nombre")).toBeVisible();
    await expect(page.getByText("Ingresá tu email para poder responderte")).toBeVisible();
    await expect(page.getByText("Elegí un motivo de consulta.")).toBeVisible();
    await expect(page.getByText("Contanos un poco más")).toBeVisible();
  });

  test("email inválido muestra error al perder el foco", async ({
    page,
  }) => {
    await page.goto("/contacto");
    const email = page.getByLabel("Email");
    await email.fill("no-es-un-email");
    await page.getByLabel("Nombre y apellido").click(); // blur
    await expect(page.getByText("Ingresá un email válido")).toBeVisible();
  });

  test("email válido limpia el error al corregir", async ({
    page,
  }) => {
    await page.goto("/contacto");
    const email = page.getByLabel("Email");
    await email.fill("invalido");
    await page.getByLabel("Nombre y apellido").click();
    await expect(page.getByText("Ingresá un email válido")).toBeVisible();
    await email.fill("maria@mail.com");
    await expect(page.getByText("Ingresá un email válido")).toHaveCount(0);
  });

  test("mensaje muy corto muestra error", async ({ page }) => {
    await page.goto("/contacto");
    const msg = page.getByLabel("Mensaje");
    await msg.fill("Hola");
    await page.getByLabel("Nombre y apellido").click();
    await expect(page.getByText("Contanos un poco más")).toBeVisible();
  });

  test("teléfono con letras muestra error", async ({ page }) => {
    await page.goto("/contacto");
    const tel = page.getByLabel("Teléfono (opcional)");
    await tel.fill("abc-def");
    await page.getByLabel("Nombre y apellido").click();
    await expect(page.getByText("Ingresá un teléfono válido")).toBeVisible();
  });
});

test.describe("Formulario de contacto — envío", () => {
  test("envío válido pasa la validación del servidor", async ({
    page,
  }) => {
    await page.goto("/contacto");
    await page.getByLabel("Nombre y apellido").fill(VALID.nombre);
    await page.getByLabel("Email").fill(VALID.email);
    await page.getByLabel("Motivo").selectOption("consulta");
    await page.getByLabel("Mensaje").fill(VALID.mensaje);

    await page.getByRole("button", { name: "Enviar consulta" }).click();

    // Sin CONTACT_FORM_ENDPOINT el servidor responde en modo
    // demo explícito (nunca finge éxito).
    await expect(
      page.getByRole("alert").filter({ hasText: /modo demostración|servicio de email/ })
    ).toBeVisible();
  });

  test("el servidor rechaza datos inválidos aunque el cliente los acepte", async ({
    page,
  }) => {
    await page.goto("/contacto");
    // Llenamos todo correctamente, pero intervamos el envío
    // con datos inválidos para probar la validación del servidor.
    const responsePromise = page.waitForResponse(
      (r) => r.url().includes("/api/contacto") && r.request().method() === "POST"
    );

    const response = await page.evaluate(async () => {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: "",
          email: "no-email",
          telefono: "",
          motivo: "",
          producto: "",
          mensaje: "x",
        }),
      });
      return res.json();
    });

    // La API responde 422 con los errores
    expect(response.ok).toBe(false);
    expect(response.errors).toBeTruthy();
    expect(Object.keys(response.errors).length).toBeGreaterThanOrEqual(4);
    // No se lanza la petición de la UI (solo verificamos la API)
    responsePromise.catch(() => {});
  });
});

test.describe("Formulario — prefill desde el catálogo", () => {
  test("?producto= precarga el producto y lo muestra", async ({
    page,
  }) => {
    await page.goto(
      "/contacto?producto=Gallina%20Plymouth%20Rock&motivo=consulta"
    );
    await expect(page.getByText("Tu consulta incluye")).toBeVisible();
    await expect(page.getByText("Gallina Plymouth Rock")).toBeVisible();
    await expect(page.getByLabel("Motivo")).toHaveValue("consulta");
  });
});

test.describe("API /api/contacto", () => {
  test("rechaza JSON malformado", async ({ request }) => {
    // Buffer crudo: Playwright no lo serializa, así llega JSON realmente inválido.
    const res = await request.post("/api/contacto", {
      data: Buffer.from("{no es json"),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(400);
    expect((await res.json()).ok).toBe(false);
  });

  test("rechaza JSON válido que no es un objeto", async ({ request }) => {
    // "no-json" se serializa como string JSON válido ("no-json").
    const res = await request.post("/api/contacto", {
      data: "no-json",
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(400);
    expect((await res.json()).ok).toBe(false);
  });

  test("honeypot: devuelve éxito silencioso para bots", async ({
    request,
  }) => {
    const res = await request.post("/api/contacto", {
      data: {
        nombre: "Bot",
        email: "bot@mail.com",
        telefono: "",
        motivo: "consulta",
        producto: "",
        mensaje: "mensaje de prueba largo",
        honey: "relleno",
      },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });
});
