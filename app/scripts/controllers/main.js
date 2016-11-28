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
