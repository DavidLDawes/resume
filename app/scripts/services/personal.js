/**
 * @ngdoc service
 * @name resumeApp.personal
 * @description
 * # personal
 * Service in the resumeApp.
 */
/*jslint node: true */
/*global angular */
angular.module('resumeApp')
    .service('personal', function () {
        'use strict';
        // AngularJS will instantiate a singleton by calling "new" on this function
        var personaldata = {
            'name': 'David L. Dawes',
            'shortname': 'Dave',
            'address': ['18924 72nd Ct. NE'],
            'city': 'Kenmore',
            'state': 'WA',
            'zip': '98028',
            'country': 'USA'
        };
        return personaldata;
    });