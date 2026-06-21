import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/labs/saas1/:path*",
        destination: "https://saas1-gray.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
