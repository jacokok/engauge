import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "src/index.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
