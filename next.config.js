const bucketEnv = process.env.NEXT_PUBLIC_BUCKET_HOST;
const cmsImagesHostname = process.env.CMS_ENDPOINT_HOSTNAME;

if (!bucketEnv) {
  throw new Error('NEXT_PUBLIC_BUCKET_HOST is not set')
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: true,
  experimental: {
    instrumentationHook: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP']
  },
  images: {
    minimumCacheTTL: 60,
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
      },
      {
        protocol: 'https',
        hostname: cmsImagesHostname,
        pathname: '/**',
        port: '',
      },
      {
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
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=600, s-maxage=1200, stale-while-revalidate=60',
          },
          {
            key: 'yolo',
            value: 'yolo',
          }
        ]
      },
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
      }
    ]
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {

  //   return config
  // }
}

module.exports = nextConfig
