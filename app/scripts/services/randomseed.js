/**
 * @ngdoc service
 * @name resumeApp.randomseed
 * @description
 * # randomseed
 * Service in the resumeApp.
 */
/*jslint node: true */
/*global angular */
angular.module('resumeApp')
    .factory('randomSeed', function () {
        'use strict';
        var library = {
            'version': '0.0.1',
            'constants': {
                // LCG using GCC's constants
                m: 0x80000000,
                a: 1103515245,
                c: 12345
            },
            x86: {},
            state: 0
        };


        // Public API here


        library.x86.init = function (seed) {
            library.state = seed;
        };

        library.x86.nextInt = function () {
            library.state = (library.constants.a * library.state + library.constants.c) % library.constants.m;
            return library.state;
        };

        library.x86.nextFloat = function () {
            // returns in range [0,1]
            return library.x86.nextInt() / (library.constants.m - 1);
        };

        return library;
    });
