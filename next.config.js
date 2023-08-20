const bucketEnv = process.env.NEXT_PUBLIC_BUCKET_HOST;

if (!bucketEnv) {
  throw new Error('NEXT_PUBLIC_BUCKET_HOST is not set')
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: bucketEnv,
        pathname: '/**',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'host.docker.internal',
        port: "13371",
        pathname: '/**',
      }, {
        protocol: 'http',
        hostname: 'localhost',
        port: "1337",
        pathname: '/**',
      }, {
        protocol: 'http',
        hostname: 'localhost',
        port: "13371",
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'eu.ui-avatars.com',
        pathname: '/**',
        port: '',
      }],
  },
  //Service-Worker-Allowed
  headers: async () => {
    return [
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {

    return config
  }
}

module.exports = nextConfig
