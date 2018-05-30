import path from "path";

export default {
  debug: true,
  devtool: "inline-source-map",
  noInfo: false,  // Show files bundled.
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
  plugins: [],
  module: {
    rules: [
      // Add rules here to process typescript into our
      // bundled ES2015 JavaScript.
    ],
  },
};

