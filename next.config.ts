import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // Map "bouajila-resume-generator/types" to a local proxy that
      // imports from the package's types-only subpath via a relative
      // path, bypassing the exports restriction.
      "bouajila-resume-generator/types": "./types/resumeTypes/generator-proxy.js",
    },
  },
};

export default nextConfig;
