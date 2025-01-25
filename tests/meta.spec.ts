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

    const descriptionContent = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(descriptionContent).toBe(description);

    const twitterUrl = await page
      .locator('meta[property="twitter:url"]')
      .getAttribute("content");
    expect(twitterUrl).toBe(url);

    const twitterTitle = await page
      .locator('meta[property="twitter:title"]')
      .getAttribute("content");
    expect(twitterTitle).toBe(title);

    const twitterDescription = await page
      .locator('meta[property="twitter:description"]')
      .getAttribute("content");
    expect(twitterDescription).toBe(description);

    const twitterImage = await page
      .locator('meta[property="twitter:image"]')
      .getAttribute("content");
    expect(twitterImage).toBe(image);

    // Check OG meta tags
    const ogUrl = await page
      .locator('meta[property="og:url"]')
      .getAttribute("content");
    expect(ogUrl).toBe(url);

    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(ogTitle).toBe(title);

    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogDescription).toBe(description);

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).toBe(image);

    const ogType = await page
      .locator('meta[property="og:type"]')
      .getAttribute("content");
    expect(ogType).toBe("website");

    if (isFrench) {
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href")
      ).toBe("https://ff7.rocks/");
    }
  });
}
