import { test, expect } from "@playwright/test";

for (const locale of ["", "fr/"] as const) {
  test(`${locale} meta tags`, async ({ page }) => {
    await page.goto(locale);
    const isFrench = locale === "fr/";

    const title = isFrench
      ? "Jeux | Ma collection Final Fantasy VII"
      : "Games | My Final Fantasy VII collection";
    const description = isFrench
      ? "Une galerie de tous mes objets en rapport avec Final Fantasy 7"
      : "A gallery of all my Final Fantasy 7 collectibles";
    const url = isFrench ? "https://ff7.rocks/fr/" : "https://ff7.rocks/";
    const image = isFrench
      ? "https://ff7.rocks/fr/og.png"
      : "https://ff7.rocks/og.png";

    await expect(page).toHaveTitle(title);
    expect(
      await page.locator('meta[name="description"]').getAttribute("content")
    ).toBe(description);

    expect(
      await page.locator('meta[property="twitter:url"]').getAttribute("content")
    ).toBe(url);
    expect(
      await page
        .locator('meta[property="twitter:title"]')
        .getAttribute("content")
    ).toBe(title);
    expect(
      await page
        .locator('meta[property="twitter:description"]')
        .getAttribute("content")
    ).toBe(description);
    expect(
      await page
        .locator('meta[property="twitter:image"]')
        .getAttribute("content")
    ).toBe(image);

    expect(
      await page.locator('meta[property="og:url"]').getAttribute("content")
    ).toBe(url);
    expect(
      await page.locator('meta[property="og:title"]').getAttribute("content")
    ).toBe(title);
    expect(
      await page
        .locator('meta[property="og:description"]')
        .getAttribute("content")
    ).toBe(description);
    expect(
      await page.locator('meta[property="og:image"]').getAttribute("content")
    ).toBe(image);
    expect(
      await page.locator('meta[property="og:type"]').getAttribute("content")
    ).toBe("website");

    expect(
      await page
        .locator('link[rel="preload"][as="image"][type="image/webp"]')
        .getAttribute("href")
    ).toBe("/cursor.webp");

    if (isFrench) {
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href")
      ).toBe("https://ff7.rocks/");
    }
  });
}

for (const action of ["focus", "hover"] as const) {
  test(`preload post image on ${action} once`, async ({ page }) => {
    await page.goto("");

    await expect(
      page.locator('link[rel="preload"][as="image"][imagesrcset]')
    ).toHaveCount(0);

    const link = page.locator('a[href="/games/final-fantasy-vii-ps1/"]');
    const srcset = await link.getAttribute("data-srcset");
    await link[action]();
    await page.getByText("Français")[action]();
    await link[action]();

    await expect(
      page.locator(`link[rel="preload"][as="image"][imagesrcset="${srcset}"]`)
    ).toHaveCount(1);

    expect(await link.getAttribute("data-srcset")).toBeNull();
  });
}

test(`preload second image on hover once`, async ({ page, isMobile }) => {
  test.skip(isMobile);
  await page.goto("games/final-fantasy-vii-ps1");

  await expect(
    page.locator('link[rel="preload"][as="image"][imagesrcset]')
  ).toHaveCount(0);

  const input = page.getByLabel("Pick back").locator("input");
  await input.hover();
  await page.getByText("Français").hover();
  await input.hover();

  await expect(
    page.locator('link[rel="preload"][as="image"][imagesrcset]')
  ).toHaveCount(1);
});
