'use strict';

/**
 * @ngdoc service
 * @name resumeApp.links
 * @description
 * # links
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('links', ['$window', function ($window) {
    var linkobj = {

        links: [
        {'view':'About', 'link':'/about'},
        {'view':'Blog', 'link':'', 'url':'https://virtualsoundnw.blogspot.com'},
        {'view':'Cards', 'link':'/cards'},
        {'view':'Contact', 'link':'/contact'},
        {'view':'Facebook', 'link':'', 'url':'https://www.facebook.com/DavidLDawes'},
        {'view':'Galaxy', 'link':'/galaxy'},
        {'view':'Main', 'link':'/'},
        {'view':'Resume', 'link':'/resume'},
        {'view':'Robots', 'link':'/robots'},
        {'view':'Tower', 'link':'/towerdefense'},
        {'view':'Twitter', 'link':'', 'url':'https://twitter.com/DavidLDawes'},
        {'view':'Videos', 'link':'/videos'},
        {'view':'Youtube', 'link':'', 'url':'https://www.youtube.com/channel/UC3O0zQOrbjLCYqYJ1rpvTRg'}],

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
              if (links[currentlink].link.length > 0) {
                  $location.path( link.link );
              } else {
                  $window.open(link.url);
              }
          }
      }
    };

    return linkobj;
  }]);
