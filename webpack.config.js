const path = require("path");
const webpack = require("webpack");
const isDev = process.env.NODE_ENV === "development";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? "style-loader" : 
          MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
            options: {
                importLoaders: 2
            } 
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(svg|png|jpg|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              outputPath: "./images/",
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.[chunkhash].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html",
      filename: "index.html",
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};