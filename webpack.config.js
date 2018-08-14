var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    "faker", "lodash", "react", "react-dom", "react-input-range", "react-redux",
    "react-router", "redux", "redux-form", "redux-thunk"
]; // copy all from dependencies at package.json

module.exports = {
  // entry: {'./src/index.js'},
  entry: {
      bundle: './src/index.js', // bundle.js
      vendor: VENDOR_LIBS // vendor.js
  }, // multiple entry points
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
      rules:[
          {
              use: 'babel-loader',
              test: /\.js$/,
              exclude: /node_modules/
          },
          {
              use: ['style-loader', 'css-loader'],
              test: /\.css$/
          }
      ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          // manifest.js to tell the browser wether vendor.js changed or not
          names: ['vendor', 'manifest']
      }), // if any same point(exp. reactJS) in both vendor.js and bundle.js, only use vendor.js
      new HtmlWebpackPlugin({
          template: 'src/index.html'
      })
  ]
};
