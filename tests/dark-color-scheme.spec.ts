import { test, expect } from "@playwright/test";

test.use({ colorScheme: "dark" });

test("system prefers dark", async ({ page }) => {
  await page.goto("settings");
  await expect(page.locator('input[name="theme"][value="dark"]')).toBeChecked();
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#1d1e26"
  );
});
