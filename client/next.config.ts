import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  async rewrites() {
    // Local development uses Next.js as the gateway to the host API.
    // Production requests are routed by the Nginx container.
    if (process.env.NODE_ENV !== 'development') return [];
    return [
      { source: '/api/:path*', destination: 'http://127.0.0.1:4000/api/:path*' },
      { source: '/health/:path*', destination: 'http://127.0.0.1:4000/health/:path*' },
    ];
  },
};
export default config;
