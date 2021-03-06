/**
 * @ngdoc service
 * @name resumeApp.links
 * @description
 * # links
 * Factory in the resumeApp.
 */
/*global angular */
angular.module('resumeApp')
    .factory('links', ['$window', '$location', function ($window, $location) {
        'use strict';
        var lindex, linkobj = {
            links: [
                {'view': 'About', 'link': '/about'},
                {'view': 'Blog', 'link': '', 'url': 'https://virtualsoundnw.blogspot.com'},
                {'view': 'Cards', 'link': '/cards'},
                {'view': 'Contact', 'link': '/contact'},
                {'view': 'Facebook', 'link': '', 'url': 'https://www.facebook.com/DavidLDawes'},
                {'view': 'Galaxy', 'link': '/galaxy'},
                {'view': 'Main', 'link': '/'},
                {'view': 'Privacy Policy', 'link': '/privacy'},
                {'view': 'Products', 'link': '/products'},
                {'view': 'Resume', 'link': '/resume'},
                {'view': 'Robots', 'link': '/robots'},
                {'view': 'Terms of Service', 'link': '/terms'},
                {'view': 'Tower', 'link': '/towerdefense'},
                {'view': 'Twitter', 'link': '', 'url': 'https://twitter.com/DavidLDawes'},
                {'view': 'Videos', 'link': '/videos'},
                {'view': 'Youtube', 'link': '', 'url': 'https://www.youtube.com/channel/UC3O0zQOrbjLCYqYJ1rpvTRg'}
            ],
            indexFromView: function (viewname) {
                for (lindex = 0; lindex < linkobj.links.length; lindex = lindex + 1) {
                    if (linkobj.links[lindex].view === viewname) {
                        return lindex;
                    }
                }
                return null;
            },
            currentlink: 0,

            go: function (link) {
                if (link.link.length > 0) {
                    $location.path(link.link);
                } else {
                    $window.location.href = link.url;
                }
            }
        };

        return linkobj;
    }]);
