'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:HeadcontrollerCtrl
 * @description
 * # HeadcontrollerCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('HeadcontrollerCtrl', ['$scope', 'personal', function ($scope, personal) {
    $scope.name = personal.name;
      return {
          'name': personal.name
      };
  }]);
