const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Webpack Configuration
 */
/** @type import('webpack').Configuration */
const config = {
  mode: "development",
  entry: path.join(__dirname, "examples/index.tsx"),
  // output: {
  //   path: path.join(__dirname, "examples/dist"),
  //   filename: "bundle.js",
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: "tsconfig.dev.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "examples/index.html"),
      filename: "./index.html",
    }),
  ],
};

module.exports = config;
