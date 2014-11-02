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
    './src/scripts/components/<%= pkg.mainInput %>.coffee'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee'],
    modulesDirectories: ['web_modules', 'node_modules', 'src/bower_components']
  },

  module: {
    preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],

    loaders: [{
      test: /\.coffee$/,
      loader: 'coffee-loader'
    }, {
      test: /\.jsx$/,
      loader: 'react-hot!jsx-loader?harmony'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
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
      template: 'src/index.html'
    })
  ]

};
