import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pathnames = [
  "",
  "games/final-fantasy-vii-ps1",
  "about",
  "settings",
] as const;

test.describe("axe a11y scan", () => {
  for (const pathname of pathnames) {
    test(pathname, async ({ page }) => {
      await page.goto(pathname);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
