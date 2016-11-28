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

        $scope.showAbout = false;
        $scope.toggleAbout = function() {
            $scope.showAbout = !$scope.showAbout;
        }
        $scope.showAbout = function () {
            return $scope.showAbout;
        };

        $scope.showCards = false;
        $scope.toggleCards = function() {
            $scope.showCards = !$scope.showCards;
        }
        $scope.showCards = function () {
            return $scope.showCards;
        };

        $scope.showContact = false;
        $scope.toggleContact = function() {
            $scope.showContact = !$scope.showContact;
        }
        $scope.showContact = function () {
            return $scope.showContact;
        };

        $scope.showGalaxy = false;
        $scope.toggleGalaxy = function() {
            $scope.showGalaxy = !$scope.showGalaxy;
        }
        $scope.showGalaxy = function () {
            return $scope.showGalaxy;
        };

        $scope.showMain = false;
        $scope.toggleMain = function() {
            $scope.showMain = !$scope.showMain;
        }
        $scope.showMain = function () {
            return $scope.showMain;
        };

        $scope.showResume = false;
        $scope.toggleResume = function() {
            $scope.showResume = !$scope.showResume;
        }
        $scope.showResume = function () {
            return $scope.showResume;
        };

        $scope.showTower = false;
        $scope.toggleTower = function() {
            $scope.showTower = !$scope.showTower;
        }
        $scope.showTower = function () {
            return $scope.showTower;
        };

        $scope.showVideos = false;
        $scope.toggleVideos = function() {
            $scope.showVideos = !$scope.showVideos;
        }
        $scope.showVideos = function () {
            return $scope.showVideos;
        };

        $scope.selectlink = links.links[links.indexFromView('About')];
        $scope.links = links.links;
        $scope.go = function(link) {
            if (link.view !== 'About') {
                $location.path(link.link);
            }
        };

  }]);
