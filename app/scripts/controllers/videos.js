'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:VideosCtrl
 * @description
 * # VideosCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('VideosCtrl', ['$scope', '$document', function ($scope, $document) {


      $scope.player = {};
      var player;
      function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
              height: '390',
              width: '640',
              videoId: 'M7lc1UVf-VE',
              events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
              }
          });
          $scope.player = player;
      }

      function onPlayerReady(event) {
          $scope.playerReady = true;
          event.target.playVideo();
      }


      $scope.playerReady = false;

      var done = false;
      function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.PLAYING && !done) {
              setTimeout(stopVideo, 6000);
              done = true;
          }
      }

      function stopVideo() {
          player.stopVideo();
      }

      $scope.play = function(e) {
          player.startVideo();

      };
  }]);
