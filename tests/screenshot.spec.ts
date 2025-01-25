import { test, expect } from "@playwright/test";

const locales = ["", "fr/"] as const;
const pathnames = ["", "games/final-fantasy-vii-ps1", "about"] as const;

// axe, redirects, change main image screenshot, focus and hover scrrenshot (not full page)

test.describe("screenshots", () => {
  test.skip(!process.env.CI);

  for (const locale of locales) {
    for (const pathname of pathnames) {
      const url = locale + pathname;
      test.describe(url, () => {
        test.beforeEach(async ({ page }) => {
          if (locale === "fr/") {
            await page.goto("settings");
            await page.getByLabel("Dark Theme").check();
            await page.goto(url);
          } else {
            await page.goto(url);
          }
        });

        test.afterEach(async ({ page }) => {
          await page.evaluate(() => localStorage.clear());
        });

        test("screenshot", async ({ page }) => {
          await expect(page).toHaveScreenshot();
        });
      });
    }
  }

  test("themes", async ({ page }) => {
    await page.goto("settings");

    await page.getByLabel("Dark Theme").check();

    await expect(page).toHaveScreenshot();

    await page.getByLabel("Light Theme").check();

    await expect(page).toHaveScreenshot();

    await page.getByLabel("FF7 Theme").check();

    await expect(page).toHaveScreenshot();
  });
});
