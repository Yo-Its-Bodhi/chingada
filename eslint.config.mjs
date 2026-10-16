import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      // These Vinext routes deliberately use full-document navigation. Keep
      // their native hrefs consistent across server-rendered and enhanced pages.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    files: [
      "app/page.tsx",
      "app/our-story/page.tsx",
      "app/components/EditorialPage.tsx",
      "app/components/PhotoSlot.tsx",
      "app/components/AgaveLibrary.tsx",
    ],
    rules: {
      // These components intentionally serve public photo exports, responsive
      // variants and the retained archive's original bottle assets. Their native
      // img dimensions/loading attributes do not require a Next image optimizer.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
