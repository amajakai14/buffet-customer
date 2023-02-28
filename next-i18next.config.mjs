import path from "path";

/** @type {import("next-i18next").UserConfig} */
const i18nconfig = {
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: {
    locales: ["en", "th"],
    defaultLocale: "en",
  },
  localePath: path.resolve("./public/locales"),
};
export default i18nconfig;
