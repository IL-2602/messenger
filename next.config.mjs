/** @type {import('next').NextConfig} */
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig1 = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/trainee-instagram-api/Image/**'
      }
    ]
  },
};


const nextConfig = {
  ...nextConfig1,
  webpack(config, options) {
    const { webpack } = options;
    if (!options.isServer) {
      config.plugins.push(
          new NextFederationPlugin({
            name: 'messenger',
            filename: 'static/chunks/remoteEntry.js',
            remotes: {},
            exposes: {
              './messenger': './src/widgets/messenger/messenger.tsx',
            },
            shared: {},
          }),
      );
    }

    return config;
  },
};

export default nextConfig

