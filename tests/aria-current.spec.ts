import { test, expect } from "@playwright/test";

test("aria-current categories", async ({ page, baseURL }) => {
  await page.goto("");

  await expect(
    page.locator("a[aria-current]").locator("visible=true")
  ).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "My Final Fantasy VII collection" })
  ).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("link", { name: "Games" })).toHaveAttribute(
    "aria-current",
    "page"
  );

  await page.getByRole("link", { name: "Français" }).click();
  await page.waitForURL(baseURL + "/fr");

  await expect(
    page.locator("a[aria-current]").locator("visible=true")
  ).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "Ma collection Final Fantasy VII" })
  ).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("link", { name: "Jeux" })).toHaveAttribute(
    "aria-current",
    "page"
  );

  await page.getByRole("link", { name: "English" }).click();
  await page.waitForURL(baseURL + "/");

  await expect(page.getByRole("link", { name: "Movies" })).not.toHaveAttribute(
    "aria-current"
  );

  await page.getByRole("link", { name: "movies" }).click();
  await page.waitForURL(baseURL + "/movies");

  await expect(
    page.locator("a[aria-current]").locator("visible=true")
  ).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Movies" })).toHaveAttribute(
    "aria-current",
    "page"
  );

  await page.getByRole("link", { name: "Settings" }).click();
  await page.waitForURL(baseURL + "/settings");

  await expect(
    page.locator("a[aria-current]").locator("visible=true")
  ).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "Settings" }).nth(0)
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("link", { name: "Settings" }).nth(1)
  ).toHaveAttribute("aria-current", "page");
});
