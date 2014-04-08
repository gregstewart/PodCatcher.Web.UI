module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'src/js/**/*.js', 'spec/**/*.js']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      build: {
        configFile: 'karma.conf.js',
        singleRun : true
      }
    },
    copy: {
      build: {
        cwd: 'src/js',
        src: [ '**' ],
        dest: '../PodCatcher.Web/public/js',
        expand: true
      },
      vendorJs: {
        cwd: 'vendor/js',
        src: [ '**' ],
        dest: '../PodCatcher.Web/public/js/vendor',
        expand: true
      },
      vendorCss: {
        cwd: 'vendor/css',
        src: [ '**' ],
        dest: '../PodCatcher.Web/public/css/vendor',
        expand: true
      },
      vendorFonts: {
        cwd: 'vendor/fonts',
        src: [ '**' ],
        dest: '../PodCatcher.Web/public/fonts',
        expand: true
      },
      vendorHtml: {
        cwd: 'src/html',
        src: [ '**' ],
        dest: '../PodCatcher.Web/public/',
        expand: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('build', ['jshint', 'karma:build', 'copy']);
};