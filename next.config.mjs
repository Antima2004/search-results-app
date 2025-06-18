/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: false, // change to true if it's a permanent redirect
      },
    ];
  },
};

export default nextConfig;
