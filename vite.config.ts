import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import shims from "./shims";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "node16",
    ssr: true,
    lib: {
      name: "DocumentReview",
      fileName: "document-review",
      entry: resolve(__dirname, "src/DocumentReview.tsx"),
    },
  },
  ssr: {
    target: "node",
    noExternal: true,
    external: ["react", "react-dom"],
  },
});
