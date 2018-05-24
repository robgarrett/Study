const path = require('path');

module.exports = {
  entry: './app/lib/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/dist')
  }
};
