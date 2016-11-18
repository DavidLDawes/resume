'use strict';

/**
 * @ngdoc service
 * @name resumeApp.randomseed
 * @description
 * # randomseed
 * Service in the resumeApp.
 */
angular.module('resumeApp')
  .factory('randomSeed', function () {
      // Service logic
      // ...

      var library = {
          'version': '0.0.1',
          'const': {
              // LCG using GCC's constants
              m: 0x80000000,
              a: 1103515245,
              c: 12345
          },
          x86: {},
          state: 0
      };


      // Public API here


      library.x86.init = function (seed) {
          library.state = seed;
      };

      library.x86.nextInt = function () {
          library.state = (library.const.a * library.state + library.const.c) % library.const.m;
          return library.state;
      };

      library.x86.nextFloat = function () {
          // returns in range [0,1]
          return library.x86.nextInt() / (library.const.m - 1);
      };

      return library;
  });
