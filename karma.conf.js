module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'lib/bower_components/jquery/dist/jquery.js',
      'lib/bower_components/jasmine-jquery/lib/jasmine-jquery.js',

      'src/moj_init.js',
      'src/rsr-calc.js',

      'test/RsrCalcSpec.js',

      // fixtures
      { pattern: 'data/*.json',
        watched: true,
        served:  true,
        included: false
      }
    ],

    browsers: ["Firefox"] //"Chrome",
  });
};
