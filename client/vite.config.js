import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // In dev, /api requests go to the Express server, so no CORS or URL config is needed.
    proxy: { "/api": { target: "http://127.0.0.1:3000", changeOrigin: true } },
  },
});
