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

  expect(page).toHaveTitle("Jeux | Ma collection Final Fantasy VII");

  await page.click('a:has-text("English")');

  await page.waitForURL(baseURL || "");

  expect(page).toHaveTitle("Games | My Final Fantasy VII collection");

  await context.close();
});
