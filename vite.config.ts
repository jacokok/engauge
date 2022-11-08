import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },

    watch: {},
    minify: false,
  },
});
