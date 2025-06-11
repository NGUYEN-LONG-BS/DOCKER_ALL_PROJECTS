import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['chart.js', 'react-chartjs-2']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://172.16.0.4:3000', // Cho phép truy cập từ máy LAN
  ],
};

export default nextConfig;
