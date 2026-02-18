import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/inloggen",
        destination: "https://app.calvora.nl/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
