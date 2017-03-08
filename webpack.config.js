var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});


module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'app.js',
    publicPath: '/js/'
  },
  module: {
    rules: [
      {
      test: /\.(scss|sass)$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
      },
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options : { name: '[name].[ext]' },
        },
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    
    ]
  },
  plugins: [
    extractSass
  ]  
};