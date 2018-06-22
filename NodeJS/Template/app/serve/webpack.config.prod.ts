import * as path from "path";
import * as webpack from "webpack";

export default {
  mode: "production",
  devtool: "source-map",
  entry: [
    // __dirname is app/lib.
    path.resolve(__dirname, "../src/index.ts"),
  ],
  target: "web",
  // Production webpack is not used via middleware,
  // so we generate the files needed in dist folder.
  output: {
    publicPath: "/",
    path: path.join(__dirname, "../dist"),
    filename: "bundle.js",
  },
  plugins: [
    // Create source maps with our bundle.
    new webpack.SourceMapDevToolPlugin({}),
    // Process HTML.
    new (require("html-webpack-plugin"))({
      template: path.resolve(__dirname, "../src/index.html"),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  module: {
    rules: [
      // Use ts-loader to transpile TS when called from express.
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },
      // Use css loaders for embedded css.
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
};

