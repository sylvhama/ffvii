import { test, expect } from "@playwright/test";

test("games redirect", async ({ page }) => {
  await page.goto("/games");
  await page.waitForURL("https://ff7.rocks/");
  expect(page.url()).toBe("https://ff7.rocks/");
});

test("fr/games redirect", async ({ page }) => {
  await page.goto("fr/games");
  await page.waitForURL("https://ff7.rocks/fr/");
  expect(page.url()).toBe("https://ff7.rocks/fr/");
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
    page.locator("h2", { hasText: "Jeux Final Fantasy 7" })
  ).toBeVisible();

  await page.click('a:has-text("English")');

  await expect(
    page.locator("h2", { hasText: "Final Fantasy 7 Games" })
  ).toBeVisible();

  await context.close();
});
