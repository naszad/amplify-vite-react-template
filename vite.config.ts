import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
  plugins: [
    react(),
    differMuiSourcemapsPlugins(),
  ],
  build: {
    sourcemap: mode === "development" || "hidden",
    rollupOptions: {
      maxParallelFileOps: 20,
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        sourcemapIgnoreList: (relativeSourcePath) => {
          const normalizedPath = path.normalize(relativeSourcePath);
          return normalizedPath.includes("node_modules");
        },
      },
      cache: false,
    },
  },
};
});

function differMuiSourcemapsPlugins() {
  const muiPackages = ["@mui/material", "@emotion/styled", "@emotion/react"];

  return {
    name: "differ-mui-sourcemap",
    transform(code: string, id: string) {
      if (muiPackages.some((pkg) => id.includes(pkg))) {
        return {
          code: code,
          map: null,
        };
      }
    },
  };
}