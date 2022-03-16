const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  // Context is the root of the project
  context: __dirname,
  entry: "./src/index.js",
  output: {
    // Output is the dist folder.
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: ['sass-loader'],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      // Template and output
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
