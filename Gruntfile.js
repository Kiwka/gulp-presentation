module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      build: {
        src: 'js/*.js',
        dest: 'build/all.min.js'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: 'js/*.js',
        dest: 'build/all.js',
      }
    },
    cssmin: {
      build: {
        src: 'css/*.css',
        dest: 'build/all.min.css'
      }
    },
    watch: {

      stylesheets: {
        files: ['src/*.css'],
        tasks: ['cssmin']
      },

      // for scripts, run jshint and uglify
      scripts: {
        files: 'src/*.js',
        tasks: ['uglify']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('jsMin', ['jsMino']);

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
