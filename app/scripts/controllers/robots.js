/**
 * @ngdoc function
 * @name resumeApp.controller:RobotsCtrl
 * @description
 * # RobotsCtrl
 * Controller of the resumeApp
 */
/*global angular */
angular.module('resumeApp')
    .controller('RobotsCtrl', ['$scope', '$location', '$sce', '$document', 'links', 'robot', function ($scope, $location, $sce, $document, links, robot) {
        'use strict';
        var video, i;
        $document[0].title = 'Robots and Kinetic Art That David Dawes Worked On';
        $scope.selectlink = links.links[links.indexFromView('Robots')];
        $scope.links = links.links;
        $scope.go = function (link) {
            if (link.view !== 'Robots') {
                links.go(link);
            }
        };

        $scope.robotsarray = robot.getRobots();
        $scope.selectrobot = robot.getRobot(0);
        $scope.choose = function (robot) {
            $scope.rname = robot.view;
            $scope.type = robot.type;
            $scope.rdesc = robot.description;
            $scope.longer = robot.longform;
            $scope.rimg = robot.img;
            $scope.rix = robot.ix;
            $scope.riy = robot.iy;
            $scope.videos = robot.videos;
        };
        $scope.choose($scope.selectrobot);

        $scope.trustedEmbedded = [];
        for (i = 0; i < $scope.robotsarray[2].videos.length; i = i + 1) {
            video = $scope.robotsarray[2].videos[i];
            $scope.trustedEmbedded.push($sce.trustAsHtml(
                '<object src="//www.youtube.com/embed/' + video.ytid +
                    '" width="640" height="360" frameborder="4" allowfullscreen>' +
                    '</object>'
            ));
        }

        $scope.showVideo = function () {
            if ($scope.selectrobot.videos === undefined) {
                return false;
            } else {
                return ($scope.selectrobot.videos.length > 0);
            }
        };
    }]);
