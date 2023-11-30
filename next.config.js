// @ts-check

const urlConfig = process.env.CMS_ENDPOINT

const cmsUrl = new URL(urlConfig || "");

const cmsConfig = {
  protocol: cmsUrl.protocol.includes('https') ? 'https' : 'http',
  hostname: cmsUrl.hostname,
  pathname: '/**',
  port: cmsUrl.port,
}

//process.env.CMS_ENDPOINT_HOSTNAME;

const bucketEnv = process.env.NEXT_PUBLIC_BUCKET_HOST;

if (!bucketEnv) {
  throw new Error('NEXT_PUBLIC_BUCKET_HOST is not set')
}


const remotePatterns = [
  cmsConfig,
  {
    protocol: 'https',
    hostname: bucketEnv,
    pathname: '/**',
    port: '',
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
  }]

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    domains: [
      {
        domain: 'en.techos.dev',
        defaultLocale: 'en',
      },
      {
        domain: 'www.techos.dev',
        defaultLocale: 'fr',
      },
    ]
  },
  generateEtags: true,
  experimental: {
    optimizeCss: false,
    optimisticClientCache: true,
    optimizeServerReact: true,
    scrollRestoration: true,
    instrumentationHook: true,
    adjustFontFallbacks: true,
    windowHistorySupport: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP']
  },
  images: {
    minimumCacheTTL: 60,
    // @ts-ignore
    remotePatterns,
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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => config
}

module.exports = nextConfig
