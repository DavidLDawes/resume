'use strict';

/**
 * @ngdoc service
 * @name resumeApp.personal
 * @description
 * # personal
 * Service in the resumeApp.
 */
angular.module('resumeApp')
  .service('personal', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
   var presonaldata = {
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