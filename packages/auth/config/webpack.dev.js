const { merge } = require("webpack-merge");
const HTMLwebpackPlugin = require("html-webpack-plugin");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new HTMLwebpackPlugin({
      template: "./public/index.html",
    }),
    new moduleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./authApp": "./src/bootstrap",
      },
      shared: packageJSON.dependencies,
    }),
  ],
};
module.exports = merge(commonConfig, devConfig);
