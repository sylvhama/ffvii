import { defineConfig } from "astro/config";
import satori from "satori";
import type { AstroIntegration } from "astro";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import fs from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import sitemap from "@astrojs/sitemap";
import { translations } from "./src/i18n/translations";

const render = (title: string, subtitle: string) => ({
  type: "div",
  props: {
    style: {
      border: "8px solid white",
      padding: 32,
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 32,
      alignItems: "center",
      justifyContent: "center",
      backgroundImage:
        "radial-gradient(circle at -180px 0px, #0053ad 300px, #001b85 500px, #000223)",
      backgroundRepeat: "no-repeat",
      color: "#f8f8f2",
      fontSize: 56,
      fontWeight: 400,
      fontFamily: "RobotoMono",
      textAlign: "center",
    },
    children: [
      {
        type: "div",
        props: {
          children: title,
        },
      },
      {
        type: "div",
        props: {
          children: subtitle,
          style: {
            fontSize: 48,
            color: "#20B2AA",
          },
        },
      },
    ],
  },
});

const openGraphImages = (): AstroIntegration => ({
  name: "open-graph-images",
  hooks: {
    "astro:build:done": async ({ dir, pages }) => {
      try {
        const robotoMonoArrayBuffer = await fs.readFile(
          "src/assets/RobotoMono.ttf"
        );

        for (const { pathname } of pages) {
          if (pathname.includes("404")) {
            continue;
          }

          const locale = pathname.includes("fr/") ? "fr" : "en";
          const cleanedPaths = pathname
            .replace("fr/", "")
            .slice(0, -1)
            .split("/");
          const lastPath =
            cleanedPaths[cleanedPaths.length - 1].replaceAll("-", " ") ||
            "games";

          const svg = await satori(
            render(
              translations[locale].title.toUpperCase(),
              // @ts-ignore
              translations[locale][lastPath]?.toUpperCase() ||
                lastPath.toUpperCase()
            ),
            {
              width: 1200,
              height: 630,
              fonts: [
                {
                  name: "RobotoMono",
                  data: robotoMonoArrayBuffer,
                  weight: 400,
                  style: "normal",
                },
              ],
            }
          );

          const resvg = new Resvg(svg, {
            fitTo: {
              mode: "width",
              value: 1200,
            },
          });

          await fs.writeFile(
            `${dir.pathname}${pathname}og.png`,
            resvg.render().asPng()
          );
        }

        console.log(`\x1b[32mog:\x1b[0m Generated OpenGraph images\n`);
      } catch (e) {
        console.log(`\x1b[31mog:\x1b[0m OpenGraph image generation failed\n`);
        console.error(e);
      }
    },
  },
});

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), openGraphImages(), sitemap()],
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  redirects: {
    "/games": "/",
    "/fr/games": "/fr",
  },
  site: "https://ff7.rocks",
});
