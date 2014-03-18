module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
        // autoWatch: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};
