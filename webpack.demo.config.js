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
  externals: [
    {
      './index': 'noisy'
    }
  ],

  debug: false,
  devtool: 'source-map',
  entry: './src/demo.coffee',

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
      template: 'src/demo.html'
    }),
    new AppCachePlugin({
      network: [],
      cache: [
        'noisy.min.js',
        '//s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png'
      ]
    })
  ],

  resolve: {
    extensions: ['', '.js', '.coffee'],
    modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
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
