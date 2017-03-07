var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'app.js',
    publicPath: '/js/'
  }
};