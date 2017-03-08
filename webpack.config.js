var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});


module.exports = {
  entry: {app: './app/index.js', vendor: ['angular', 'angular-route','moment','angular-ui-grid']},
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].js',
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      })
  ]  
};