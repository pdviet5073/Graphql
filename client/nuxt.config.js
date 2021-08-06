import en from "./locales/en.json";
import vi from "./locales/vi.json";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "client",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/main.scss"],

  loading: {
    color: "#28a2b8",
    continuous: true,
    duration: 2000,
    throttle: 0,
  },

  layoutTransition: {
    name: "layout",
    mode: "out-in",
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/vee-validate.ts", "~/plugins/bootstrap-icon.ts"],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/apollo",
    [
      "nuxt-i18n",
      {
        locales: [
          {
            code: "en",
            name: "English",
          },
          {
            code: "vi",
            name: "Viet Nam",
          },
        ],
        defaultLocale: "en",
        strategy: "no_prefix",
        vueI18n: {
          fallbackLocale: "en",
          messages: {
            en,
            vi,
          },
        },
      },
    ],
  ],
  // Apollo configuration
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.NUXT_ENV_YOUR_ENDPOINT,
      },
    },
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: "loading",
        fetchPolicy: "cache-and-network",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate"],
  },
};
