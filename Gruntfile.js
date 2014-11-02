'use strict';

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDemoConfig = require('./webpack.demo.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      dist: webpackDistConfig,
      demo: webpackDemoConfig
    },

    'webpack-dev-server': {
      options: {
        hot: true,
        port: 8000,
        webpack: webpackDevConfig,
        publicPath: '/',
        contentBase: './src/',
      },

      start: {
        keepAlive: true,
      }
    },

    connect: {
      options: {
        port: 8000
      },

      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
      },
      dist: {
        path: 'http://localhost:<%= connect.options.port %>/'
      }
    },

    clean: {
      dist: {
        files: [{
          dot: false,
          src: [
            'dist/**/*'
          ]
        }]
      }
    },

    coffeelint: {
      src: ['src/**/*.coffee'],
      options: {
        configFile: 'coffeelint.json'
      }
    },

    coffee_jshint: {
      src: ['src/**/*.coffee'],
      options: {
        jshintOptions: ['browser', 'node']
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:dist', 'connect:dist']);
    }

    grunt.task.run([
      'open:dev',
      'webpack-dev-server'
    ]);
  });

  grunt.registerTask('build', ['clean', 'webpack']);

  grunt.registerTask('default', ['coffeelint', 'coffee_jshint', 'build']);
};
