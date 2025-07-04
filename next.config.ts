import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
/*   Set ignoreBuildErrors: false and ignoreDuringBuilds: false to enforce stricter checks

Add more trusted domains under remotePatterns if needed

You can also customize things like:

ts
Copy
Edit
compress: true,
poweredByHeader: false,
experimental: { serverActions: true }, */
};

export default nextConfig;
