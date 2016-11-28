'use strict';

/*jslint node: true */
/*jshint strict:false */
/**
 * @ngdoc function
 * @name resumeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('ContactCtrl', ['$scope', '$document', '$location', 'links', function ($scope, $document, $location, links) {
      $scope.selectlink = links.links[links.indexFromView('Contact')];
      $scope.links = links.links;
      $scope.go = function(link) {
          if (link.view !== 'Contact') {$location.path( link.link );}
      };

      $scope.name = "David L. Dawes";
      $scope.address1 = "18924 72nd Ct. NE";
      $scope.address2 = "Kenmore WA 98028";
      $scope.email = "davidlymandawes@yahoo.com";
      $scope.phone = "(206)271-7382";

      $scope.address = $scope.name + "\n" +
          $scope.address1 + "\n" +
          $scope.address2;

      $scope.copy2clipboard = function(e) {
          var targ = e.target;
          targ.select();
          try {
                  $document[0].execCommand('copy');
          }
          catch (err) {
              alert('please press Ctrl/Cmd+C to copy');
          }
      };

  }]);
