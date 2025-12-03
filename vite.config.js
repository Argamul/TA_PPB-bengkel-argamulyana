import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [" "],
      manifest: {
        name: "Bengkel GAMUL - E-Commerce Parts Kendaraan",
        short_name: "BengkelGAMUL",
        description:
          "E-commerce untuk pembelian sparepart bus, mobil, lokomotif, dan pesawat tempur.",
        theme_color: "#030213",
        background_color: "#717182",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
