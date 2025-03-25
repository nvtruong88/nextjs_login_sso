// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Enables React's Strict Mode
  swcMinify: true,       // Enables the SWC compiler for minification
  // async headers() {
  //   return [
  //     {
  //       source: "/vi/certcms/cert/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
  //         { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
  //       ],
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      {
        // source: "/api/cms/:path*", // Proxy route
        // destination: "https://test-cms.vnpt-ca.vn/api/cms/:path*", // Target API
        source: "/api/openid-config:path*",
        destination: "https://rmidp.vnptit.vn/:path*",
      },
      {
        source: "/vi/certcms/cert/:path*",
        destination: "https://rmgateway.vnptit.vn/:path*",
      },
    ];
  },
};

export default nextConfig;
