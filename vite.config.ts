import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import sass from "sass";
import path from "path";
const resolvePath = (str: string) => path.resolve(__dirname, str);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // Configure the necessary loaders
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        sassOptions: {
          includePaths: ["./node_modules"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolvePath("src"),
    },
  },

  server: {
    port: 3000,
  },
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      input: {
        main: resolvePath("index.html"),
        legacy: resolvePath("index.html"),
      },
    },
  },
});