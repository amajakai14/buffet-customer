import i18nconfig from "./next-i18next.config.mjs";

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  i18n: i18nconfig.i18n,
  images: {
    domains: [
      "cdn.discordapp.com",
      "profile.line-scdn.net",
      "images.unsplash.com",
      "raw.githubusercontent.com",
      "d1xgtoppp2m1fw.cloudfront.net",
    ],
  },
};
export default config;
