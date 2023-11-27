import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "@svgr/rollup";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    react(),
    svgr({
      typescript: true,
    }),
  ],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "HomeAssistant React Dashboard",
      fileName: (format) => `ha-dashboard.${format}.js`,
    },
    watch: {},
  },
  preview: {
    cors: true,
    host: true,
    port: 8080,
  },
});
