import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dev',
        permanent: true, // true: 301 리다이렉트, false: 302 리다이렉트
      },
    ];
  }
};

export default nextConfig;
