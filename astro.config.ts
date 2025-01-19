import { defineConfig } from "astro/config";
import satori from "satori";
import type { AstroIntegration } from "astro";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import fs from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import sitemap from "@astrojs/sitemap";
import { translations } from "./src/i18n/translations";

const svg = {
  type: "svg",
  props: {
    version: "1.2",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 227 197",
    width: "227",
    height: "197",
    style: {
      position: "absolute",
      right: 0,
      bottom: "-20px",
      transform: "rotate(-30deg)",
    },
    children: [
      {
        type: "g",
        props: {
          children: [
            {
              type: "path",
              props: {
                fill: "#f8f8f2",
                fillRule: "evenodd",
                d: "m0.2 196.2c0-0.4 34.3-34.9 76.1-76.7 56-56 76-76.3 75.8-77-0.3-0.9 1.6-5.2 2.2-5.2 0.2 0 0.8 0.4 1.4 0.9 1 1 7.1-4.1 6.5-5.5-0.1-0.4 0.2-0.9 0.6-1.3 0.7-0.6 1.7 0.2 6.3 4.8 4.8 4.8 5.7 5.4 6.4 4.8 0.7-0.5 1-0.5 1.8 0.2 0.9 0.8 2.1-0.3 21.1-19.4 22.4-22.5 23-22.9 26.3-19.6 3.3 3.3 2.9 3.9-19.6 26.3-19.4 19.3-20.2 20.2-19.4 21.2 0.7 0.7 0.8 1.2 0.3 1.9-0.5 0.7 0.3 1.7 4.8 6.3 5.2 5.3 6.5 7.7 3.6 6.9-1.8-0.5-6.8 5.2-5.7 6.4 0.5 0.6 0.9 1.2 0.9 1.4 0 0.7-4.4 2.5-5.3 2.2-0.8-0.3-14 12.1-62.6 58.6-33.8 32.4-62 59.1-62.6 59.3-3.1 1.1-58.9 4.4-58.9 3.5zm36.4-3.6l22.3-1.5 4.9-4.8c2.6-2.6 30.3-29.1 61.4-58.9 31.2-29.8 56.7-54.3 56.8-54.4 0.1-0.2-1.8-2.3-4.1-4.6l-4.3-4.2-9.9 9.9c-5.5 5.4-32.6 31.5-60.3 57.9l-50.3 48.1-21.2 6.9c-23.1 7.4-24.2 7.8-20.2 7.4 1.4-0.1 12.7-0.9 24.9-1.8zm-7-6.8l22.6-7.4 49.4-47.2c27.2-26 49.5-47.3 49.6-47.4 0.1 0-1.5-1.7-3.6-3.7-5.8-5.6-5.9-5.3 5.8-17l9.6-9.6-4.4-4.4c-2.4-2.4-4.5-4.3-4.8-4.2-0.2 0-33.9 33.7-75 74.7-41 41-74 74.3-73.2 74 0.7-0.2 11.5-3.8 24-7.8zm139-119.2l14.9-14.9-8-8-14.8 14.7c-16.8 16.9-16.2 15.9-11.9 20.2 4 4.1 3.1 4.6 19.8-12zm-14.9 8.9c-3.2-1.8-3.4-6-0.2-7.6 4.1-2.2 8.2 2.9 5.1 6.3-1.4 1.6-3.4 2.1-4.9 1.3zm3.3-2.1c0.4-0.4 0.7-1.2 0.7-1.8 0-0.6-0.3-1.4-0.7-1.7-0.3-0.4-1.1-0.7-1.7-0.7-0.6 0-1.4 0.3-1.8 0.7-0.3 0.3-0.6 1.1-0.6 1.7 0 0.6 0.3 1.4 0.6 1.8 0.4 0.3 1.2 0.6 1.8 0.6 0.6 0 1.4-0.3 1.7-0.6zm29.3-0.9c0.4-0.3-1.1-2.1-4.7-5.7-4.2-4.2-5.4-5.1-5.9-4.6-0.6 0.5 0.4 1.7 4.3 5.7 5.3 5.3 5.2 5.3 6.3 4.6zm3.2-6.6l2.8-2.8-4.4-4.4-4.5-4.4-2.8 2.9-2.9 3 4.2 4.2c5 5.1 4.2 4.9 7.6 1.5zm-28.9 0.4c-3.9-3.8 1.5-9.5 5.8-6.1 1.1 0.9 1.4 1.6 1.4 3.2 0 3.8-4.5 5.6-7.2 2.9zm4.4-1.1c2.4-1.7 0.1-5.4-2.5-4-1.4 0.8-1.5 3.5-0.2 4.2 1.3 0.8 1.3 0.8 2.7-0.2zm0.3-14c0.2-0.2-2.2-2.9-5.2-5.9-4.5-4.5-5.5-5.3-5.8-4.5-0.7 1.8 10.1 11.9 11 10.4zm4.9-4.9l2.6-2.6-4.5-4.5-4.5-4.6-2.9 3-2.9 2.9 4.2 4.2c5 5.1 4.7 5 8 1.6zm49.3-38.9l-2-2-18.7 18.7c-10.3 10.3-18.8 19-18.8 19.3 0 0.3 0.8 1.3 1.7 2.3l1.7 1.7 38.1-38zm3.6 0.5c0-0.1-1-1.1-2.3-2.3l-2.2-2.1 2.1 2.3c1.9 2.1 2.4 2.5 2.4 2.1zm0.8-3.5c-0.3-1-1.8-1.9-2.3-1.4-0.2 0.2 0.3 0.9 0.9 1.6 1.4 1.5 1.9 1.4 1.4-0.2z",
                children: [],
              },
            },
          ],
        },
      },
    ],
  },
};

const render = (title: string, subtitle: string) => ({
  type: "div",
  props: {
    style: {
      position: "relative",
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
      {
        ...svg,
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
