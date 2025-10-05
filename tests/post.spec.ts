import { test, expect } from "@playwright/test";

test("scroll to main image when not in viewport", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile);
  await page.setViewportSize({ width: 400, height: 400 });
  await page.goto("games/final-fantasy-vii-pal");
  await page.mouse.wheel(0, 9999);

  await expect(
    page.getByAltText("Pick  Box front").first()
  ).not.toBeInViewport();

  await page.getByLabel("Pick  Box back").click();

  await expect(page.getByAltText("Box back").first()).toBeInViewport();
});

test("save scroll position in post list", async ({ page, baseURL }) => {
  await page.goto("music");

  const postLink = page.getByRole("link", { name: "Black Materia Vinyl" });
  await postLink.scrollIntoViewIfNeeded();

  const savedScrollY = await page.evaluate(() => {
    return window.scrollY;
  });

  await postLink.click();

  await page.waitForURL(baseURL + "/music/black-materia-vinyl");

  const resetScrollY = await page.evaluate(() => {
    return window.scrollY;
  });

  expect(resetScrollY).toBe(0);

  await page.getByRole("link", { name: "Music", exact: true }).click();

  await page.waitForURL(baseURL + "/music");

  const ecpectedScrollY = await page.evaluate(() => {
    return window.scrollY;
  });

  expect(ecpectedScrollY).toBe(savedScrollY);
});
