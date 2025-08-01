// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import astroIcon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://www.epicswagger.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    astroIcon(),
    // other integrations here if you have them
  ],

  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Outfit",
        cssVariable: "--font-outfit",
        weights: [100, 200, 300, 400, 500, 600, 700],
        styles: ["normal"],
      },
      {
        provider: fontProviders.fontsource(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: [100, 200, 300, 400, 500, 600, 700],
        styles: ["normal"],
      },
    ],
  },

  // Only use the adapter in production
  adapter: process.env.NODE_ENV === "production" ? netlify() : undefined,
});
