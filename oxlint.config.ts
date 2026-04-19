import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "react", "unicorn", "oxc"],
  env: {
    builtin: true,
  },
  categories: {
    correctness: "error",
  },
  rules: {},
});
