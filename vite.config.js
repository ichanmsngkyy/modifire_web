import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/modifire_web/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000", // or your Rails backend URL
    },
  },
});
