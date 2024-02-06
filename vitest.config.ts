import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vitest/config";

dotenv.config(); // load env vars from .env

export default defineConfig({
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  test: {
    clearMocks: true,
    globals: true,
    include: ["**/*.vitest.ts"],
  },
  resolve: {
    alias: {
      R: path.resolve(__dirname, "./"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@queries": path.resolve(__dirname, "./src/infrastructure/queries"),
    },
  },
});
