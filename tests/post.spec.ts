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
