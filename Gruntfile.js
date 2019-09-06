module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: [
          "bower_components/Blob.js/Blob.js",
          "bower_components/FileSaver/dist/FileSaver.js",
          "ics.js"
        ],
        dest: "ics.deps.js"
      }
    },
    terser: {
      options: {},
      main: {
        files: {
          "ics.min.js": ["ics.js"],
          "ics.deps.min.js": ["ics.deps.js"]
        }
      }
    },
    mocha: {
      all: {
        src: ["test/index.html"],
        options: {
          run: true,
          log: true,
          urls: [
            "http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html"
          ]
        }
      }
    },
    jshint: {
      files: ["Gruntfile.js", "ics.js", "test/spec/test.js"],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        laxcomma: true
      }
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint", "mocha"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-terser");

  grunt.registerTask("test", ["jshint", "mocha"]);

  grunt.registerTask("default", ["jshint", "concat", "terser"]);
};
