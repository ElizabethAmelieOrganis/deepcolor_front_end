import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: [
      "canglan.xyz",
      "zweshafupokm.sealoshzh.site",
      "owvkcxwzwwkd.sealoshzh.site",
      "localhost",
    ],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    chunkSizeWarningLimit: 5000,
  },
});
