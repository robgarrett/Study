var path = require("path");

/**
 * Public Path maps to the location of the webpack files.
 * WebPack will bundle typescript files and javascript files.
 * TS-Loader transpiles TypeScript before bundling.
 */
module.exports = {
  cache: true,
   entry: './src/index.ts',
   output: {
     path: path.join(__dirname, "dist"),
     publicPath: "/assets/",
     filename: "index.js"
   },
   resolve: {
     extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
   },
   plugins: [],
   module: {
     loaders: [
       { test: /\.ts$/, loader: 'ts-loader' }
     ]
   }
}