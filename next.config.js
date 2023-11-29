/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push(
      'pino-pretty',
      'lokijs',
      'utf-8-validate',
      'bufferutil'
    );
    return config;
  },
  eslint: {
    dirs: ['components', 'hooks', 'lib', 'app'],
  },
  experimental: {
    webpackBuildWorker: true,
  },
};

module.exports = nextConfig;
