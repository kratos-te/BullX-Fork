/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");
const CopyPlugin = require("copy-webpack-plugin");

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const getCorsHeaders = () => {
  const headers = {};

  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Credentials"] = "true";
  headers["Access-Control-Allow-Methods"] = "GET,OPTIONS,PATCH,DELETE,POST,PUT";
  headers["Access-Control-Allow-Headers"] =
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization";

  return Object.entries(headers).map(([key, value]) => ({ key, value }));
};

const getSecurityHeaders = () => {
  const headers = {};

  headers["Content-Security-Policy"] =
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://recaptcha.net https://www.gstatic.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https://explorer-api.walletconnect.com; " +
    "connect-src 'self' https://tizz-be-api-sepolia-production.up.railway.app https://arbitrum-sepolia.blockpi.network/v1/rpc/public wss://tizz-be-api-sepolia-production.up.railway.app wss://relay.walletconnect.com https://walletconnect.com https://walletconnect.org wss://www.walletlink.org https://verify.walletconnect.com https://tizz-guild-be-production-1cf6.up.railway.app https://verify.walletconnect.org https://explorer-api.walletconnect.com https://api.ipify.org; " +
    "font-src 'self'; " +
    "object-src 'none'; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-src 'self' blob: https://verify.walletconnect.com https://recaptcha.net; " +
    "style-src-elem 'self' 'unsafe-inline';";
  headers["X-Frame-Options"] = "DENY";
  headers["X-Content-Type-Options"] = "nosniff";
  headers["Referrer-Policy"] = "no-referrer";
  headers["Strict-Transport-Security"] =
    "max-age=63072000; includeSubDomains; preload";

  return Object.entries(headers).map(([key, value]) => ({ key, value }));
};

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: "proto/client.proto",
              to: "proto/client.proto",
            },
            {
              from: "proto/client.proto",
              to: "app/[locale]/tizz-trade/proto/client.proto",
            },
            {
              from: "proto/client.proto",
              to: "/opt/build/repo/proto/client.proto",
            },
          ],
        }),
      );
    }

    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [...getCorsHeaders(), ...getSecurityHeaders()],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
