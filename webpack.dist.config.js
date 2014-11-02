'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {

  output: {
    path: 'dist/',
    filename: 'noisy.min.js',
    library: 'noisy',
    libraryTarget: 'umd'
  },

  debug: false,
  devtool: 'source-map',
  entry: './src/index.coffee',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.coffee'],
  },

  module: {
    loaders: [{
      test: /\.coffee$/,
      loader: 'coffee-loader'
    }]
  }
};
