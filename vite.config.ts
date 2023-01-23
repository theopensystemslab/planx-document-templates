import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "node16",
    lib: {
      fileName: "index",
      formats: ['cjs'],
      entry: resolve(__dirname, "src/index.tsx"),
    },
    ssr: {
      noExternal: true
    }
  },
});
