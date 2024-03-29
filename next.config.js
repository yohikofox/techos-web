// @ts-check

const path = require('path');

const urlConfig = process.env.CMS_ENDPOINT

if (!urlConfig || !URL.canParse(urlConfig)) {
  throw new Error(`CMS_ENDPOINT is not set or not a valid URL: [${urlConfig}]`)
}

const cmsUrl = new URL(urlConfig);

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
    hostname: 'lh3.googleusercontent.com',
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
  },
  {
    protocol: 'https',
    hostname: 'ui-avatars.com',
    pathname: '/**',
    port: '',
  },
  {
    protocol: 'https',
    hostname: 'api.dicebear.com',
    pathname: '/**',
    port: '',
  },
  {
    protocol: 'https',
    hostname: 'via.assets.so',
    pathname: '/**',
    port: '',
  },
]

const storeEndpointConfig = process.env.STORE_ENDPOINT;

if (storeEndpointConfig && URL.canParse(storeEndpointConfig)) {
  const storeEndpointUrl = new URL(storeEndpointConfig || "");
  remotePatterns.push({
    protocol: storeEndpointUrl.protocol.includes('https') ? 'https' : 'http',
    hostname: storeEndpointUrl.hostname,
    pathname: '/**',
    port: '',
  })
} else {
  console.warn(`STORE_ENDPOINT is not set or not a valid URL: [${storeEndpointConfig}]`)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // try to not rerender components on every change DEV ONLY
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
  compiler: {
    styledComponents: true,
  },
  generateEtags: true,
  experimental: {
    optimisticClientCache: true,
    optimizeServerReact: true,
    scrollRestoration: true,
    instrumentationHook: true,
    adjustFontFallbacks: true,
    windowHistorySupport: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
  },
  images: {
    minimumCacheTTL: 60,
    // @ts-ignore
    remotePatterns,
  },
  //Service-Worker-Allowed
  headers: async () => {

    return [
      // {
      //   source: '/:path*',
      //   headers: [
      //     {
      //       key: 'Cache-Control',
      //       value: 'public, max-age=600, s-maxage=1200, stale-while-revalidate=60',
      //     },
      //     {
      //       key: 'yolo',
      //       value: 'yolo',
      //     }
      //   ]
      // },
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
  env: {
    NEXT_PUBLIC_REDIS_INSIGHT_URL: process.env.REDIS_INSIGHT_URL ?? 'http://localhost:8001',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@admin': path.resolve(__dirname, 'src/app/(admin)/theme'),
      '@main': path.resolve(__dirname, 'src/app/(main)/theme'),
      '@R': path.resolve(__dirname, 'src/theme'),
    };

    return config;
  },
}

module.exports = nextConfig
