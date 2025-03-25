import { test, expect } from "@playwright/test";

test("aria snapshots", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.locator("body")).toMatchAriaSnapshot(
    isMobile
      ? `
    - banner:
      - link "About my collection"
      - heading "My Final Fantasy VII collection" [level=1]:
        - link "My Final Fantasy VII collection"
    - navigation "Categories"
    - main
      `
      : `
    - complementary:
      - heading "My Final Fantasy VII collection" [level=1]:
        - link "My Final Fantasy VII collection"
    - banner:
      - link "Français"
      - link "Settings":
        - img "Settings"
      - link "About my collection":
        - img "About my collection"
    - navigation "Categories":
      - list:
        - listitem:
          - link "Games"
        - listitem:
          - link "Movies"
        - listitem:
          - link "Books"
        - listitem:
          - link "Music"
        - listitem:
          - link "Events"
        - listitem:
          - link "Merch"
    - main:
      - heading "Final Fantasy 7 games" [level=2]
      - list:
        - listitem:
          - link "Final Fantasy VII (PS1)":
            - heading "Final Fantasy VII (PS1)" [level=3]
    - img "Outline of the Buster Sword from Final Fantasy 7"
    - separator
    - contentinfo:
      - paragraph: Crafted by
      - link "Sylvain Hamann"
      - link "GitHub"
    `
  );
  await page.getByRole("link", { name: "Français" }).click();
  await page.getByRole("link", { name: "Paramètres" }).click();
  await expect(page.locator("body")).toMatchAriaSnapshot(`
    - main:
      - heading "Paramètres" [level=2]
      - group "Choisissez le thème du site":
        - radio "Thème Sombre"
        - radio "Thème Clair" [checked]
        - radio "Thème FF7"
    `);
  await page.getByRole("link", { name: "À propos de ma collection" }).click();
  await expect(page.locator("body")).toMatchAriaSnapshot(`
    - main:
      - heading "À propos de ma collection" [level=2]
      - paragraph: "/En tant que fan de Final Fantasy 7 depuis sa sortie en \\\\d+, ce site présente ma collection dédiée à mon jeu préféré\\\\. J'ai rassemblé ces objets dans tous les pays où j'ai vécu : France, Corée du Sud, Japon et Canada\\\\. Mon objectif est de partager les souvenirs attachés à chaque pièce, et non de posséder tous les objets possibles\\\\. Il comprend également des photos de concerts et d'événements auxquels j'ai assisté, mettant en valeur certains de mes moments les plus précieux\\\\./"
      - img "Une photo de toute ma collection Final Fantasy 7"
    `);
  await page.getByRole("link", { name: "Accueil" }).click();
  await page.getByRole("link", { name: "Final Fantasy VII (PS1)" }).click();
  await page.getByRole("link", { name: "English" }).click();
  await expect(page.locator("body")).toMatchAriaSnapshot(`
    - main:
      - article:
        - img "front"
        - heading "Final Fantasy VII (PS1)" [level=2]
        - paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et facilisis lectus, ut porttitor arcu. Duis tortor arcu, bibendum non orci ac, mollis convallis arcu. Mauris ultricies lacus eu nulla fermentum, consequat blandit lacus efficitur. Suspendisse sit amet lectus volutpat eros condimentum finibus eu eu velit. Ut et mollis tortor, ut viverra odio. Quisque congue tempus lorem. Curabitur sollicitudin semper molestie. Proin sed cursus tortor. Donec ultricies consequat enim sit amet placerat. Mauris consectetur, nulla non blandit malesuada, libero ante euismod libero, sed rutrum lectus elit posuere justo. Sed pharetra mi id lorem feugiat pellentesque.
        - group "Set main picture":
          - radio "Pick front" [checked]
          - img "front"
          - radio "Pick back"
          - img "back"
    `);
});
