const withPWA = require("next-pwa")({
  dest: "public",
});

const config = {
  images: {
    domains: ["www.netgear.com", "downloads1.netgear.com", "images.contentstack.io"],
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH || "main",
    CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION || "us",
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    CONTENTSTACK_PREVIEW_HOST:
    process.env.CONTENTSTACK_PREVIEW_HOST || "rest-preview.contentstack.com",
    CONTENTSTACK_API_HOST:
    process.env.CONTENTSTACK_API_HOST || "api.contentstack.io",
    CONTENTSTACK_APP_HOST:
    process.env.CONTENTSTACK_APP_HOST || "app.contentstack.com",
    CONTENTSTACK_LIVE_PREVIEW: process.env.CONTENTSTACK_LIVE_PREVIEW || "true",
    CONTENTSTACK_LIVE_EDIT_TAGS:
    process.env.CONTENTSTACK_LIVE_EDIT_TAGS || "false",
    NEXT_PUBLIC_CONTENT_KEY: process.env.NEXT_PUBLIC_CONTENT_KEY,
    NEXT_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    HEADER_API_KEY: process.env.HEADER_API_KEY,
    HEADER_ACCESS_TOKEN: process.env.HEADER_ACCESS_TOKEN,
    SITE1_NAME: process.env.SITE1_NAME,
    SITE2_NAME: process.env.SITE2_NAME,
  },
  i18n: {
    locales: ['en-us', 'fr-fr','fr','de-de','de','es-ES','es','it-IT','it','ja-JP','ja'],
    defaultLocale: 'en-us',
    localeDetection: true,
  },
  experimental: { largePageDataBytes: 128 * 100000 },
};
module.exports =
  process.env.NODE_ENV === "development" ? config : withPWA(config);
