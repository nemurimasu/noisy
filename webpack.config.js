/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpak-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */

'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/'
  },

  cache: true,
  debug: true,
  devtool: 'source-map',
  entry: [
    'webpack/hot/only-dev-server',
    './src/demo.coffee'
  ],

  stats: {
    colors: true,
    reasons: true
  },

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
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^Modernizr$/, 'modernizr/modernizr.js'),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Noisy',
      template: 'src/demo.html'
    })
  ]

};
