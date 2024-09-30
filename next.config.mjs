/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/user/:path*',
        destination: 'http://localhost:8088/user/:path*', // Proxy to backend
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:8088/api/:path*', // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
