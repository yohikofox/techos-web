/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP']
  },
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
      port: "1337",
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
  headers: async () => {
    return [
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
  }
}

module.exports = nextConfig
