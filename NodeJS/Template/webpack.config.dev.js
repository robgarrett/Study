var path = require('path');

module.exports = {
  devtool: "inline-source-map",
  target: "web",
  entry: [
    path.resolve(__dirname, "src/index.ts")
  ],
  output: {
    path: path.resolve(__dirname, "lib"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  resolve: {
    enforceExtension: false,
    extensions: [
      ".ts", ".js"
    ]
  },
  loader: [
    {
      test: /\.ts$/,
      use: [
        { loader: "ts-loader" }
      ]
    }
  ],
  plugins: []
};
