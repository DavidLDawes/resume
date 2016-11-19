'use strict';

/**
 * @ngdoc service
 * @name resumeApp.canvastower
 * @description
 * # canvastower
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('canvastower', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
