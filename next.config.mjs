/** @type {import('next').NextConfig} */

// Relative path: Turbopack resolveAlias does not support absolute paths
const emptyModule = './lib/empty-module.js';

const nextConfig = {
  turbopack: {
    resolveAlias: {
      fs: emptyModule,
      'pino-pretty': emptyModule,
      lokijs: emptyModule,
      'utf-8-validate': emptyModule,
      bufferutil: emptyModule,
    },
  },
  experimental: {},
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

export default nextConfig;
