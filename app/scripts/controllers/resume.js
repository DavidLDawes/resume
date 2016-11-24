'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:ResumeCtrl
 * @description
 * # ResumeCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
    .controller('ResumeCtrl', ['links', '$scope', '$location', function (links, $scope, $location) {

        $scope.selectlink = links.links[links.indexFromView('Resume')];
        $scope.links = links.links;
        $scope.go = function(link) {
            if (link.view !== 'Resume') {$location.path( link.link );}
        };
        $scope.show_manage = true;
        $scope.show_process = true;
        $scope.show_operations = true;
        $scope.show_training = true;
        $scope.show_support = true;
        $scope.show_backend = true;
        $scope.show_realtime = true;
        $scope.show_database = true;
  }]);
