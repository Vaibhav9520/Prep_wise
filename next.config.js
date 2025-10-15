/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // disable Turbopack so dev & prod use Webpack
  },
};
module.exports = nextConfig;
