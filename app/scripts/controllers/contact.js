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
      $document[0].title = 'Gregory Greer Contact Info and Photo';

      $scope.selectlink = links.links[links.indexFromView('Contact')];
      $scope.links = links.links;
      $scope.go = function(link) {
          if (link.view !== 'Contact') {
              links.go(link);
          }
      };

      $scope.name = "Gregory S. Greer";
      $scope.address1 = "1303 201st St SW";
      $scope.address2 = "Lynnwood, WA 98036";
      $scope.email = "GregoryGreer@yahoo.com";
      $scope.phone = "(425)835-0077";

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
