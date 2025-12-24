/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '44355',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
