'use strict';

/**
 * @ngdoc service
 * @name resumeApp.tower
 * @description
 * # tower
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('tower', function () {
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
