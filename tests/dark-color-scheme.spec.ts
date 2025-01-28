import { test, expect } from "@playwright/test";

test.use({ colorScheme: "dark" });

test("system prefers dark", async ({ page }) => {
  await page.goto("settings");
  await expect(page.locator('input[name="theme"][value="dark"]')).toBeChecked();
});
