import * as path from "path";
import * as webpack from "webpack";

export default {
  devtool: "inline-source-map",
  entry: [
    path.resolve(__dirname, "src/index"),
  ],
  target: "web",  // As opposed to node
  // Webpack won't actually create any files,
  // but we want to simulate the output created
  // in memory.
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
  ],
  module: {
    rules: [
      // Add rules here to process typescript into our
      // bundled ES2015 JavaScript.
    ],
  },
};

