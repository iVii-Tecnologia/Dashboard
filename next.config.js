/** @type {import('next').NextConfig} */
const nextConfig = {
  // Change to standard output for development
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;