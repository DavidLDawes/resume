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
    .controller('AboutCtrl', ['$scope', '$location', '$document', 'links', function ($scope, $location, $document, links) {
        $document[0].title = 'About this web site and it\'s pages';

        $scope.showAngular = false;
        $scope.toggleAngular = function() {
            $scope.showAngular = !$scope.showAngular;
        }

        $scope.showAbout = false;
        $scope.toggleAbout = function() {
            $scope.showAbout = !$scope.showAbout;
        }

        $scope.showCards = false;
        $scope.toggleCards = function() {
            $scope.showCards = !$scope.showCards;
        }

        $scope.showContact = false;
        $scope.toggleContact = function() {
            $scope.showContact = !$scope.showContact;
        }

        $scope.showGalaxy = false;
        $scope.toggleGalaxy = function() {
            $scope.showGalaxy = !$scope.showGalaxy;
        }

        $scope.showMain = false;
        $scope.toggleMain = function() {
            $scope.showMain = !$scope.showMain;
        }

        $scope.showResume = false;
        $scope.toggleResume = function() {
            $scope.showResume = !$scope.showResume;
        }

        $scope.showTower = false;
        $scope.toggleTower = function() {
            $scope.showTower = !$scope.showTower;
        }

        $scope.showVideos = false;
        $scope.toggleVideos = function() {
            $scope.showVideos = !$scope.showVideos;
        }

        $scope.selectlink = links.links[links.indexFromView('About')];
        $scope.links = links.links;
        $scope.go = function(link) {
            if (link.view !== 'About') {
                links.go(link);
            }
        };

  }]);
