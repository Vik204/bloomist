import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow remote images from Bing image host used in `data/flowers.ts`.
    // Add additional hosts or wildcard remotePatterns if you use more external sources.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tse4.mm.bing.net",
      },
    ],
  },
};

export default nextConfig;
