/*jslint node: true */
/**
 * @ngdoc function
 * @name resumeApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the resumeApp
 */
/*global angular */
angular.module('resumeApp')
    .controller('CardsCtrl', ['$scope', '$location', '$document', 'cardsprites', 'links', function ($scope, $location, $document, cardsprites, links) {
        'use strict';
        $document[0].title = 'Experimental: 2D sprite panel and Angular factory wrapper to draw them on a canvas.';
        $scope.selectlink = links.links[links.indexFromView('Cards')];
        $scope.links = links.links;
        $scope.go = function (link) {
            if (link.view !== 'Cards') {
                links.go(link);
            }
        };

        $scope.cardSpritesPanel = new Image();
        $scope.cardSpritesPanel.src = 'images/simplecards.jpg';
        cardsprites.init($scope.cardSpritesPanel);

        $scope.drawSprite = function (i, j, x, y) {
            cardsprites.drawSprite(i, j, x, y);
        };
    }]);
