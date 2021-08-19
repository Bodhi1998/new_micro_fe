const { merge } = require("webpack-merge");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJSON = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new moduleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJSON.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
