import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables React <ViewTransition> for route navigations (project card -> case study morph).
    viewTransition: true,
  },
};

export default nextConfig;
