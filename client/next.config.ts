import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,

  async rewrites() {
    const apiUrl = (process.env.API_URL || 'http://127.0.0.1:4000').replace(/\/$/, '');

    return [
      { source: '/api/:path*', destination: `${apiUrl}/api/:path*` },
      { source: '/health/:path*', destination: `${apiUrl}/health/:path*` },
    ];
  },
};

export default config;
