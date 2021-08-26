const { merge } = require("webpack-merge");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJSON = require("../package.json");
console.log("checks");
const commonConfig = require("./webpack.common");
const domain = process.env.PRODUCTION_DOMAIN;
const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  plugins: [
    new moduleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJSON.dependencies,
    }),
  ],
};
module.exports = merge(commonConfig, prodConfig);
