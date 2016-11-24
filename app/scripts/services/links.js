'use strict';

/**
 * @ngdoc service
 * @name resumeApp.links
 * @description
 * # links
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('links', function () {
    var linkobj = {

        links: [
        {'view':'About', 'link':'/about'},
        {'view':'Cards', 'link':'/card'},
        {'view':'Contact', 'link':'/contact'},
        {'view':'Galaxy', 'link':'/galaxy'},
        {'view':'Main', 'link':'/'},
        {'view':'Resume', 'link':'/resume'},
        {'view':'Tower Defense', 'link':'/towerdefense'},
        {'view':'Videos', 'link':'/videos'} ],

        indexFromView: function(viewname) {
            for (var lindex=0; lindex < linkobj.links.length; lindex++) {
                if (linkobj.links[lindex].view == viewname) {
                    return lindex;
                }
            }
            return null;
        },
        currentlink: 0,

      go: function(link) {
          if (link.view != links[currentlink].view) {
              $location.path( link.link );
          }
      }
    };

    return linkobj;
  });
