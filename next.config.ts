import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add more config options below as needed
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
