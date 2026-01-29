const path = require("path");

module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,

  images: {
    domains: ["res.cloudinary.com"],
  },

  env: {
    NEXT_BLOG_ROUTE: process.env.NEXT_BLOG_ROUTE,
  },
  
  webpack(config, { isServer }) {
    config.resolve.modules.push(
      path.resolve(__dirname, "data"),
      path.resolve(__dirname, "pages"),
      path.resolve(__dirname, "redux"),
      path.resolve(__dirname, "context"),
      path.resolve(__dirname, "components"),
      path.resolve(__dirname, "style")
    );
    return config;
  },
};
