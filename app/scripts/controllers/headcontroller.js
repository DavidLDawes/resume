/**
 * @ngdoc function
 * @name resumeApp.controller:HeadcontrollerCtrl
 * @description
 * # HeadcontrollerCtrl
 * Controller of the resumeApp
 */
/*global angular */
angular.module('resumeApp')
    .controller('HeadcontrollerCtrl', ['$scope', 'personal', function ($scope, personal) {
        'use strict';
        $scope.name = personal.name;
        return {
            'name': personal.name
        };
    }]);
