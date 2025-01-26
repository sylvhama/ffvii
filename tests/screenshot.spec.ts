import { test, expect } from "@playwright/test";

const locales = ["", "fr/"] as const;
const pathnames = [
  "",
  "games/final-fantasy-vii-ps1",
  "about",
  "settings",
  "404",
] as const;

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
          await expect(page).toHaveScreenshot({ fullPage: true });
        });
      });
    }
  }

  test("change theme via focus", async ({ page, isMobile }) => {
    test.skip(isMobile);
    await page.goto("settings");
    await page.getByLabel("dark").focus();
    await page.getByLabel("dark").check();
    await expect(page).toHaveScreenshot();
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveScreenshot();
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveScreenshot();
  });

  test("hover and focus link", async ({ page, isMobile }) => {
    test.skip(isMobile);
    await page.goto("");
    await page.getByRole("link", { name: "Movies" }).hover();
    const nav = page.locator("nav");
    await expect(nav).toHaveScreenshot();
    await page.getByRole("link", { name: "Books" }).hover();
    await expect(nav).toHaveScreenshot();
  });

  test("change main image via focus", async ({ page, isMobile }) => {
    test.skip(isMobile);
    await page.goto("games/final-fantasy-vii-ps1/");
    await page.getByLabel("Pick front").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
