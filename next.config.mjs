/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['freeflo.ai', 'ik.imagekit.io', 'img.freepik.com', 'developers.google.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
