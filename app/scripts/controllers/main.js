'use strict';

/*jslint node: true */
/*jshint strict:false */

/*jslint node: true */
/*jshint strict:false */
/**
 * @ngdoc function
 * @name resumeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('MainCtrl', ['$document', '$scope', '$location', 'ngDialog', 'links', function ($document, $scope, $location, ngDialog, links) {
      $scope.selectlink = links.links[links.indexFromView('Main')];
      $scope.links = links.links;
      $scope.go = function(link) {
          if (link.view !== 'Main') {$location.path( link.link );}
      };

      $scope.hideModal = function () {
          ngDialog.close();
      };

      $scope.robots = [
          {
              'name':'Guitar Robot',
              'img': 'images/if6were9.jpg',
              'ix':460 , 'iy': 670,
              'description':'MoPop If VI Were XI installation by Trimpin.'
          },
          {
              'name':'Der Ring 3',
              'img': 'images/orbit.jpg',
              'ix':706 , 'iy': 466,
              'description':'Kinetic Sculpture installation by Trimpin.'
          },
          {
              'name':'Real Time Machinery',
              'img': 'images/twood.jpeg',
              'ix':448 , 'iy': 271,
              'description':'Real time control algorithms for routers, robots, carving machines, and 5+ axes of simpltaneous control.'
          }
      ];
      $scope.selectrobot = $scope.robots[0];
      $scope.choose = function(robot) {
          $scope.rname = robot.name;
          $scope.rdesc = robot.description;
          $scope.rimg = robot.img;
          $scope.rix = robot.ix;
          $scope.riy = robot.iy;
      };
      $scope.choose($scope.selectrobot);

      $scope.clickToOpen = function () {
          ngDialog.open({
              template: '<div class="ng-modal-overlay" ng-click="hideModal()">' +
                  '<div class="ng-modal-dialog" ng-style="dialogStyle">' +
                  '<h1>Modal Dialog Here</h1>' +
                  '<div class="ng-modal-dialog-content" ng-transclude></div>' +
              '</div>' +
              '</div>',
              plain: true,
              controller: 'MainCtrl',
              className: 'ngdialog-theme-default'
          });
      };
      //template: 'scripts/templates/modaldialog.html',
  }]);
