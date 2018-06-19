import * as path from "path";
import * as webpack from "webpack";

export default {
  mode: "development",
  entry: [
    // __dirname is app/lib.
    path.resolve(__dirname, "../src/index.ts"),
  ],
  target: "web",  // As opposed to node
  // Webpack won't actually create any files,
  // when we use the webpack-dev-middleware
  // but we want to simulate the output created
  // in memory.
  output: {
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    // Create source maps with our bundle.
    new webpack.SourceMapDevToolPlugin({}),
  ],
  resolve: {
    // Resolve extensions.
    extensions: [".ts", ".tsx", ".js"],
  },
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
    ],
  },
};

