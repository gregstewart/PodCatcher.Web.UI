module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js']
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
        cwd: 'src',
        src: [ '**' ],
        dest: '../PodCatcher.Web/public/js/',
        expand: true
      },
      vendor: {
        cwd: 'vendor',
        src: [ '**' ],
        dest: '../PodCatcher.Web/public/js/vendor',
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