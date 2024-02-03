const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")

const withTM = require('next-transpile-modules')(['gsap']); // pass the modules you would like to see transpiled

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

module.exports = withMDX(withPWA(withTM({
  images: {
    domains: ['source.unsplash.com'],
  },
    pageExtensions: ["tsx", "mdx", "js"],
    pwa: {
      disable: !isProd,
      dest: "public",
    },
    webpack: (config, { isServer, defaultLoaders }) => {
      // Fixes npm packages (mdx) that depend on `fs` module
      if (!isServer) {
        config.node = {
          dgram: "empty",
          fs: "empty",
          net: "empty",
          tls: "empty",
          child_process: "empty",
        };
      }

      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });

      return config;
    },
  })
));
