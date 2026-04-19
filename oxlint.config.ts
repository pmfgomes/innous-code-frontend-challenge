import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["src/routeTree.gen.ts"],
  plugins: ["typescript", "react", "unicorn", "oxc"],
  env: {
    builtin: true,
  },
  categories: {
    correctness: "error",
  },
  rules: {},
});
