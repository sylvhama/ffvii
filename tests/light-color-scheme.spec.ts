import { test, expect } from "@playwright/test";

test.use({ colorScheme: "light" });

test("system prefers light", async ({ page }) => {
  await page.goto("settings");
  await expect(
    page.locator('input[name="theme"][value="light"]')
  ).toBeChecked();
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#f8f8f2"
  );
});
