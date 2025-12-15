import { join } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true, typedRoutes: true },
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      { source: '/growth-engine.html', destination: '/products/growth-engine', permanent: true },
      { source: '/admin-assassin.html', destination: '/products/admin-assassin', permanent: true },
      { source: '/reputation-defender.html', destination: '/products/reputation-defender', permanent: true },
      { source: '/tradesmen.html', destination: '/industries/tradesmen-services', permanent: true },
      { source: '/privacy-policy.html', destination: '/legal/privacy', permanent: true },
      { source: '/terms-of-service.html', destination: '/legal/terms', permanent: true },
      // PRODUCT/tools -> /tools
      { source: '/PRODUCT/tools/:path*.html', destination: '/tools/:path*', permanent: true },
      { source: '/PRODUCT/tools/:path*', destination: '/tools/:path*', permanent: true },
      // generic rule: strip .html
+      { source: '/:file(.+)\.html', has: [{ type: 'host', value: 'vexellogic.com' }], destination: '/:file', permanent: true },
+      // fallthrough generic strip (keeps prior behavior)
       { source: '/:path(.*)\.html', destination: '/:path', permanent: true }
    ];
  }
};

export default nextConfig;
