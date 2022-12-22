/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '5nn73jb7.directus.app',
        port: '',
        pathname: '/assets',
      },
    ],
  },
}

module.exports = nextConfig
