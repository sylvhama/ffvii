import { test, expect } from "@playwright/test";

const locales = ["", "fr"] as const;
const pathnames = [
  "",
  "/games/final-fantasy-vii-ps1",
  "/about",
  "/settings",
  "/404",
] as const;

test.describe("screenshots", () => {
  test.skip(!process.env.CI);

  for (const locale of locales) {
    for (const pathname of pathnames) {
      const url = locale + pathname;
      test.describe(url, () => {
        test.beforeEach(async ({ page }) => {
          if (locale === "fr") {
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
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#1d1e26"
    );
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveScreenshot();
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#f8f8f2"
    );
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveScreenshot();
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#000"
    );
  });

  test("hover and focus nav link", async ({ page, isMobile }) => {
    test.skip(isMobile);
    await page.goto("");
    await page.getByRole("link", { name: "Movies" }).hover();
    const nav = page.locator("nav");
    await expect(nav).toHaveScreenshot();
    await page.getByRole("link", { name: "Books" }).hover();
    await expect(nav).toHaveScreenshot();
  });

  test("hover and focus image grid link", async ({ page, isMobile }) => {
    test.skip(isMobile);
    await page.goto("");
    const link = page.getByRole("link", { name: "Final Fantasy VII (PS1)" });
    await link.hover();
    await expect(link).toHaveScreenshot();
    await page.getByText("Français").hover();
    await link.focus();
    await expect(link).toHaveScreenshot();
  });

  test("change main image via focus", async ({ page, isMobile }) => {
    test.skip(isMobile);
    await page.goto("games/final-fantasy-vii-ps1");
    await page.getByLabel("Pick front").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test("focus ring and theme local storage", async ({ page, isMobile }) => {
    const reloadFocusAndScreenshot = async () => {
      await page.reload();
      await page
        .getByRole("link", {
          name: "My Final Fantasy VII collection",
        })
        .focus();
      if (isMobile) {
        await expect(
          page.getByRole("heading", {
            name: "My Final Fantasy VII collection",
          })
        ).toHaveScreenshot();
      } else {
        await expect(page.getByRole("complementary")).toHaveScreenshot();
      }
    };

    await page.goto("settings");
    await page.getByLabel("Dark Theme").check();
    await reloadFocusAndScreenshot();

    await page.getByLabel("Light Theme").check();
    await reloadFocusAndScreenshot();

    await page.getByLabel("FF7 Theme").check();
    await reloadFocusAndScreenshot();
  });

  test("skip to main content", async ({ page, isMobile }) => {
    await page.goto("");
    await page.keyboard.press("Tab");
    expect(page.url().endsWith("#main-content")).toBe(false);
    await expect(page).toHaveScreenshot();
    await page.keyboard.press("Enter");
    expect(page.url().endsWith("#main-content")).toBe(true);
    await expect(page.getByRole("main")).toHaveAttribute("id", "main-content");
  });
});
