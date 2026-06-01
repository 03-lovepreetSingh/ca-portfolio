import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Tooling infrastructure — never lint these
  globalIgnores([
    ".claude/**",
    ".claude-flow/**",
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;
