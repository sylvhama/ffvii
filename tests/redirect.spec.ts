import { test, expect } from "@playwright/test";

test("games redirect", async ({ page }) => {
  await page.goto("/games");
  await page.waitForURL("http://localhost:4321");
  expect(page.url()).toBe("http://localhost:4321/");
});

test("fr/games redirect", async ({ page }) => {
  await page.goto("fr/games");
  await page.waitForURL("http://localhost:4321/fr");
  expect(page.url()).toBe("http://localhost:4321/fr");
});

test("French page redirection when browser is French", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    locale: "fr-FR",
  });
  const page = await context.newPage();
  await page.goto(baseURL || "");

  await expect(
    page.getByRole("heading", { name: "Jeux Final Fantasy 7", level: 2 })
  ).toBeVisible();

  await page.click('a:has-text("English")');

  await expect(
    page.getByRole("heading", { name: "Final Fantasy 7 games", level: 2 })
  ).toBeVisible();

  await context.close();
});
