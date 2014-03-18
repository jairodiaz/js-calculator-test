module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'lib/jquery-1.11.0/jquery.js',
      'lib/jasmine-jquery-2.1.0/jasmine-jquery.js',

      'src/moj_init.js',
      'src/rsr-calc.js',

      'test/SpecHelper.js',
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
