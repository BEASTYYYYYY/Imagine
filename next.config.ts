import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
  experimental: {
    middlewarePrefetch: "strict", // Prefetch middleware only when necessary
  },
};

export default nextConfig;
