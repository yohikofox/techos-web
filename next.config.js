const fs = require('fs');
const { resolve } = require('path');

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
