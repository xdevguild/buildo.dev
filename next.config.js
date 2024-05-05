/** @type {import('next').NextConfig} */

const externals = ['pino-pretty', 'lokijs', 'utf-8-validate', 'bufferutil'];

const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push(...externals);
    return config;
  },
  eslint: {
    dirs: ['components', 'hooks', 'lib', 'app'],
  },
  experimental: {
    webpackBuildWorker: true,
  },
  async redirects() {
    return [
      {
        source: '/inscriptions/create',
        destination: '/general-operations/inscriptions',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
