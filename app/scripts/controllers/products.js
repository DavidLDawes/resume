/**
 * @ngdoc function
 * @name resumeApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the resumeApp
 */
/*jslint node: true */
/*global angular */
angular.module('resumeApp')
    .controller('ProductsCtrl', ['$scope', '$location', '$sce', '$document', 'links', 'product', function ($scope, $location, $sce, $document, links, product) {
        'use strict';
        $document[0].title = 'Products That David Dawes Worked On';
        $scope.selectlink = links.links[links.indexFromView('Products')];
        $scope.links = links.links;
        $scope.go = function (link) {
            if (link.view !== 'Products') {
                links.go(link);
            }
        };

        $scope.productsarray = product.getproducts();
        $scope.selectproduct = product.getproduct(0);
        $scope.choose = function (product) {
            $scope.rname = product.view;
            $scope.type = product.type;
            $scope.rdesc = product.description;
            $scope.longer = product.longform;
            $scope.rimg = product.img;
            $scope.rix = product.ix;
            $scope.riy = product.iy;
            $scope.videos = product.videos;
        };
        $scope.choose($scope.selectproduct);
    }]);
