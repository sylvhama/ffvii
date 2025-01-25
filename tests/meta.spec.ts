import { test, expect } from "@playwright/test";

const locales = ["", "fr/"] as const;

for (const locale of locales) {
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

    expect(page).toHaveTitle(title);
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

    if (isFrench) {
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href")
      ).toBe("https://ff7.rocks/");
    }
  });
}
