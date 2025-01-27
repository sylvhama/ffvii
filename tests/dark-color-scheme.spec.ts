import { test, expect } from "@playwright/test";

test.use({ colorScheme: "dark" });

test("system prefers dark", async ({ page }) => {
  await page.goto("settings");
  expect(page.locator('input[name="theme"][value="dark"]')).toBeChecked();

  // doing this to prevent the page to get destroyed
  await page.getByRole("link", { name: "Français" }).focus();
});
