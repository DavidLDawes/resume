'use strict';

/*jslint node: true */
/*jshint strict:false */

/**
 * @ngdoc overview
 * @name resumeApp
 * @description
 * # resumeApp
 *
 * Main module of the application.
 */
angular
  .module('resumeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngDialog'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/galaxy', {
        templateUrl: 'views/galaxy.html',
        controller: 'GalaxyCtrl',
        controllerAs: 'galaxy'
      })
      .when('/resume', {
        templateUrl: 'views/resume.html',
        controller: 'ResumeCtrl',
        controllerAs: 'resume'
      })
      .when('/videos', {
        templateUrl: 'views/videos.html',
        controller: 'VideosCtrl',
        controllerAs: 'videos'
      })
      .when('/towerdefense', {
        templateUrl: 'views/towerdefense.html',
        controller: 'TowerdefenseCtrl',
        controllerAs: 'towerdefense'
      })
      .when('/cards', {
        templateUrl: 'views/cards.html',
        controller: 'CardsCtrl',
        controllerAs: 'cards'
      })
      .when('/robots', {
        templateUrl: 'views/robots.html',
        controller: 'RobotsCtrl',
        controllerAs: 'robots'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products'
      })
      .when('/privacy', {
        templateUrl: 'views/privacy.html',
        controller: 'PrivacyCtrl',
        controllerAs: 'privacy'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        controller: 'TermsCtrl',
        controllerAs: 'terms'
      })
      .when('/caprivacy', {
        templateUrl: 'views/caprivacy.html',
        controller: 'CaprivacyCtrl',
        controllerAs: 'caprivacy'
      })
      .when('/caterms', {
        templateUrl: 'views/caterms.html',
        controller: 'CatermsCtrl',
        controllerAs: 'caterms'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
