// Karma configuration
module.exports = function (config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: './',

    // frameworks to use
    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher'
    ],

    // list of files / patterns to load in the browser
    files: [
      'lib/sinon-1.7.3.js',
      'vendor/js/jquery-1.8.2.min.js',
      'vendor/js/lodash.underscore.min.js',
      'vendor/js/backbone-min.js',
      'vendor/js/mediaelement-and-player.min.js',
      'helper/SpecHelper.js',
      {pattern: 'src/js/*.js'},
      {pattern: 'spec/**/*.js'}
    ],


    // list of files to exclude
    exclude: [
      'src/js/main.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: ['progress', 'coverage'],

    preprocessors: {
      '**/src/**/*.js': 'coverage'
    },

    coverageReporter: {
      reporters: [
        { type: 'html'},
        { type: 'text-summary' }
      ],
      dir: 'coverage/'
    },

    // web server port
    port: 9876,


    // cli runner port
    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
