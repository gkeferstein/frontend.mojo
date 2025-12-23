/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'https://mojo-institut.de/wp-json',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mojo-institut.de',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'bunny-wp-pullzone-xli5tq6kt4.b-cdn.net',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig

