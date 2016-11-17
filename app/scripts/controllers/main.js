'use strict';

/*jslint node: true */
/*jshint strict:false */

/**
 * @ngdoc function
 * @name resumeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('MainCtrl', function ($scope) {

      $scope.show_manage = true;
      $scope.show_process = true;
      $scope.show_operations = true;
      $scope.show_training = true;
      $scope.show_support = true;
      $scope.show_backend = true;
      $scope.show_realtime = true;
      $scope.show_database = true;
  });
