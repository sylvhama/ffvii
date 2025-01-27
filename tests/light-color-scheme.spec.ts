import { test, expect } from "@playwright/test";

test.use({ colorScheme: "light" });

test("system prefers light", async ({ page }) => {
  await page.goto("settings");
  expect(page.locator('input[name="theme"][value="light"]')).toBeChecked();

  // doing this to prevent the page to get destroyed
  await page.getByRole("link", { name: "Français" }).focus();
});
