/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {

  output: {
    publicPath: '/',
    path: 'dist/',
    filename: '[hash].js'
  },

  debug: false,
  devtool: 'source-map',
  entry: './src/scripts/components/<%= pkg.mainInput %>.coffee',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^Modernizr$/, 'modernizr/modernizr.js'),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      title: 'Noisy',
      template: 'src/index.html'
    }),
    new AppCachePlugin({
      network: []
    })
  ],

  resolve: {
    extensions: ['', '.js', '.coffee'],
    modulesDirectories: ['web_modules', 'node_modules', 'src/bower_components']
  },

  module: {
    loaders: [{
      test: /\.coffee$/,
      loader: 'coffee-loader'
    }, {
      test: /[\\\/]bower_components[\\\/]modernizr[\\\/]modernizr\.js$/,
      loader: 'imports?this=>window!exports?window.Modernizr'
    }]
  }
};
