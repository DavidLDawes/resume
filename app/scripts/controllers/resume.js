/*jslint node: true */
/*global angular */
/**
 * @ngdoc function
 * @name resumeApp.controller:ResumeCtrl
 * @description
 * # ResumeCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
    .controller('ResumeCtrl',
                ['$scope', '$location', '$document', 'links', 'personal', 'HeadcontrollerCtrl',
                 function ($scope, $location, $document, links, personal, HeadcontrollerCtrl) {
                'use strict';
                $document[0].title = 'Experimental version of {{personal.name}}\' resume with Angular check boxes controlling bits of the text.';

                $scope.selectlink = links.links[links.indexFromView('Resume')];
                $scope.links = links.links;
        
                $scope.go = function (link) {
                    if (link.view !== 'Resume') {
                        links.go(link);
                    }
                };
        
                $scope.personal = {
                    'name': personal.name,
                    'shortname': personal.shortname,
                    'address': personal.address,
                    'city': personal.city,
                    'state': personal.state,
                    'zip': personal.zip,
                    'country': personal.country
                };
   
                $scope.show_manage = true;
                $scope.show_process = true;
                $scope.show_operations = true;
                $scope.show_training = true;
                $scope.show_support = true;
                $scope.show_backend = true;
                $scope.show_realtime = true;
                $scope.show_database = true;

            }]);
