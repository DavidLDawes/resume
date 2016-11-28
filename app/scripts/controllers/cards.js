'use strict';

/*jslint node: true */
/*jshint strict:false */
/**
 * @ngdoc function
 * @name resumeApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('CardsCtrl', ['$scope', '$location', 'cardsprites', 'links', function ($scope, $location, cardsprites, links) {
      $scope.selectlink = links.links[links.indexFromView('Cards')];
      $scope.links = links.links;
      $scope.go = function(link) {
          if (link.view !== 'Cards') {$location.path( link.link );}
      };

      $scope.cardSpritesPanel = new Image();
      $scope.cardSpritesPanel.src = 'images/simplecards.jpg';
      cardsprites.init($scope.cardSpritesPanel);

      $scope.drawSprite = function(i, j, x, y) {
          cardsprites.drawSprite(i, j, x, y);
      };
  }]);
