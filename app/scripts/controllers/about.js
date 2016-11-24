'use strict';

/*jslint node: true */
/*jshint strict:false */

/**
 * @ngdoc function
 * @name resumeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('AboutCtrl', ['$scope', '$location', 'links', function ($scope, $location, links) {
      $scope.selectlink = links.links[links.indexFromView('Resume')];
      $scope.links = links.links;
      $scope.go = function(link) {
          if (link.view !== 'Resume') {$location.path( link.link );}
      };
  }]);
