import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/api": "https://lss-currency.onrender.com//",
    },
  },
  plugins: [react()],
});
