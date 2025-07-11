/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
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
