'use strict';
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/helpers/**/*.js',
      'test/spec/components/**/*.js'
    ],
    preprocessors: {
      'test/spec/components/**/*.js': ['webpack']
    },
    webpack: {
      cache: true,
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
      },
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/^Modernizr$/, 'modernizr/modernizr.js'),
        new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
      ]
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 60000,
    singleRun: true
  });
};
