/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['localhost'],
  },
  experimental: {
    serverComponentsExternalPackages: ['payload'],
  },
};

module.exports = nextConfig;
