'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:GalaxyCtrl
 * @description
 * # GalaxyCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('GalaxyCtrl', ['$scope', 'sector', 'drawstars', function($scope, sector, drawstars) {
      // focal point
      $scope.x = 0;
      $scope.y = 0;
      $scope.z = 0;

      // location of point within sector
      $scope.sx = 0;
      $scope.sy = 0;
      $scope.sz = 0;

      $scope.zoom = 3;
      $scope.lastZoom = -1;

      // based on zoom, use full sector
      $scope.xmin = 0;
      $scope.xmax = drawstars.const.xadjust;
      $scope.ymin = 0;
      $scope.ymax = drawstars.const.yadjust;

      $scope.lastSectorX = -123454321;
      $scope.lastSectorY = -12345432971;
      $scope.lastSectorZ = -123454321;

      $scope.showcanvas = true;

      // Stars for the view's current sector are here. If you've zoomed  > 3 then who knows what's here,
      // probably the last one fetched (lower right)
      // An array of arrays, one array of stars per class (O, B, A, F, G, K, M)
      // The outer array starts out with 7 empty arrays in it
      $scope.stars = [
          [], [], [], [], [], [], []
      ];

      // counts of stars in the star arrays, all empty so all 7 entries have 0's in the count array
      $scope.starsize = [0, 0, 0, 0, 0, 0, 0];

      // filtred counts (ZHi and ZLo, zoom soon) passed back to us using this
      $scope.zcounts = [0, 0, 0, 0, 0, 0, 0];

      $scope.xinc = drawstars.const.xadjust;
      $scope.yinc = drawstars.const.yadjust;
      $scope.zinc = drawstars.const.zadjust;

      // motion buttons (left & right for x, up & down for y, in and out for z) are handled here
      $scope.leftward = function () {
          $scope.x -= $scope.xinc;
          $scope.locate();
      }

      $scope.rightward = function () {
          $scope.x += $scope.xinc;
          $scope.locate();
      }

      $scope.upward = function () {

          $scope.y += $scope.yinc;
          $scope.locate();
      }

      $scope.downward = function () {
          $scope.y -= $scope.yinc;
          $scope.locate();
      }

      $scope.inward = function () {
          $scope.z -= $scope.zinc;
          $scope.locate();
      }

      $scope.outward = function () {
          $scope.z += $scope.zinc;
          $scope.locate();
      }

      // zoom changed so modify as needed
      $scope.rezoom = function () {
          switch ($scope.zoom) {
              case 1:
              case '1':
                  $scope.xinc = drawstars.const.xadjust / 16;
                  $scope.yinc = drawstars.const.yadjust / 16;
                  $scope.zinc = drawstars.const.zadjust;
                  break;
              case 2:
              case '2':
                  $scope.xinc = drawstars.const.xadjust / 4;
                  $scope.yinc = drawstars.const.yadjust / 4;
                  $scope.zinc = drawstars.const.zadjust;
                  break;
              case 3:
              case '3':
              default:
                  $scope.xinc = drawstars.const.xadjust;
                  $scope.yinc = drawstars.const.yadjust;
                  $scope.zinc = drawstars.const.zadjust;
                  break;
              case 4:
              case '4':
                  $scope.xinc = drawstars.const.xadjust * 4;
                  $scope.yinc = drawstars.const.yadjust * 4;
                  $scope.zinc = drawstars.const.zadjust * 4;
                  break;
              case 5:
              case '5':
                  $scope.xinc = drawstars.const.xadjust * 16;
                  $scope.yinc = drawstars.const.yadjust * 16;
                  $scope.zinc = drawstars.const.zadjust * 4;
                  break;
              case 6:
              case '6':
                  $scope.xinc = drawstars.const.xadjust * 64;
                  $scope.yinc = drawstars.const.yadjust * 64;
                  $scope.zinc = drawstars.const.zadjust * 4;
                  break;
              case 7:
              case '7':
                  $scope.xinc = drawstars.const.xadjust * 256;
                  $scope.yinc = drawstars.const.yadjust * 256;
                  $scope.zinc = drawstars.const.zadjust * 4;
                  break;
          }
          $scope.lastSectorX = -9999999;
          $scope.lastSectorY = -99909999;
          $scope.lastSectorZ = -999988999;
          $scope.lastZoom = -1;

          $scope.locate();
      }

      $scope.zlofilter = function () {
          if (($scope.zhi < $scope.zlo)) {
              $scope.zhi = $scope.zlo + $scope.xinc * .04;
              if ($scope.zhi > $scope.zinc) {
                  $scope.zhi = $scope.zinc;
              }
          }
          $scope.locate();
      }

      $scope.zhifilter = function () {
          if (($scope.zlo > $scope.zhi)) {
              $scope.zlo = $scope.zhi - $scope.xinc * .04;
              if ($scope.zlo < 0) {
                  $scope.zlo = 0;
              }
          }
          $scope.locate();
      }


      $scope.draw1sector = function (ix, iy, i, j) {
          var dresult = [];
          $scope.x = ix + i * drawstars.const.xadjust;
          $scope.y = iy + j * drawstars.const.yadjust;
          sector.init($scope.x + i * drawstars.const.xadjust, $scope.y + j * drawstars.const.yadjust, $scope.z, $scope.zoom);
          dresult = sector.multidraw($scope.zlo, $scope.zhi, $scope.zoom, i, j);
          for (var ires = 0; ires < dresult.length; i++) {
              if (dresult[i] != NaN) {
                  if (!dresult[i] < 0) {
                      $scope.zcounts[i] += dresult[i];
                  }
              }
          }
          if (dresult.length > 0) {
              $scope.zcounts[0] += dresult[0];
          }
          if ($scope.zoom < 6 && dresult.length > 1) {
              $scope.zcounts[1] += dresult[1];
          } else {
              $scope.zcounts[1] = NaN;
          }
          if ($scope.zoom < 5 && dresult.length > 4) {
              $scope.zcounts[2] += dresult[2];
              $scope.zcounts[3] += dresult[3];
              $scope.zcounts[4] += dresult[4];
          } else {
              $scope.zcounts[2] = NaN;
              $scope.zcounts[3] = NaN;
              $scope.zcounts[4] = NaN;
          }
      }


      // location changed or maybe we got an init
      $scope.locate = function () {
          if ((sector.x2Sector($scope.x) != $scope.lastSectorX) ||
              (sector.y2Sector($scope.y) != $scope.lastSectorY) ||
              (sector.z2Sector($scope.z) != $scope.lastSectorZ) ||
              ($scope.zoom != $scope.lastZoom)) {

              sector.init($scope.x, $scope.y, $scope.z, $scope.zoom);

              $scope.lastSectorX = sector.x2Sector($scope.x);
              $scope.lastSectorY = sector.y2Sector($scope.y);
              $scope.lastSectorZ = sector.z2Sector($scope.z);
              $scope.lastZoom = $scope.zoom;
          }

          switch ($scope.zoom) {
              case 1:
              case '1':
              case 2:
              case '2':
                  // from xs, figure out which bit of sector we're in:
                  $scope.xmin = $scope.xinc * Math.floor($scope.sx / $scope.xinc);
                  $scope.xmax = $scope.xinc + $scope.xinc * Math.floor($scope.sx / $scope.xinc);
                  $scope.ymin = $scope.yinc * Math.floor($scope.sy / $scope.yinc);
                  $scope.ymax = $scope.yinc + $scope.yinc * Math.floor($scope.sy / $scope.yinc);
                  break;
              case 3:
              case '3':
              default:
              case 4:
              case '4':
              case 5:
              case '5':
              case 6:
              case '6':
              case 7:
              case '7':
                  // all of it for these
                  $scope.xmin = 0;
                  $scope.xmax = drawstars.const.xadjust;
                  $scope.ymin = 0;
                  $scope.ymax = drawstars.const.yadjust;
                  break;
          }

          $scope.stars = sector.starclass
          for (var icpy = 0; icpy < $scope.stars.length; icpy++) {
              $scope.starsize[icpy] = $scope.stars[icpy].length;
          }

          $scope.hash = sector.hash;

          drawstars.clear();
          sector.legend();

          sector.xmin = $scope.xmin;
          sector.xmax = $scope.xmax;
          sector.ymin = $scope.ymin;
          sector.ymax = $scope.ymax;
          if ($scope.zoom < 4) {
              $scope.zcounts = sector.draw($scope.zlo, $scope.zhi, $scope.zoom);
          } else {
              $scope.zcounts[0] = 0;
              $scope.zcounts[1] = 0;
              $scope.zcounts[2] = 0;
              $scope.zcounts[3] = 0;
              $scope.zcounts[4] = 0;
              $scope.zcounts[5] = 0;
              $scope.zcounts[6] = 0;
              var zresult = [];

              var sectorscale = 4;
              for (var logme = 4; logme < $scope.zoom; logme++) {
                  sectorscale *= 4;
              }

              var initx = $scope.x;
              var inity = $scope.y;
              for (var zc0 = 0; zc0 < sector.classByZoom[$scope.zoom]; zc0++) {
                  $scope.zcounts[zc0] = 0;
              }
              for (var zc0 = sector.classByZoom[$scope.zoom]; zc0 < $scope.zcounts.length; zc0++) {
                  $scope.zcounts[i] = NaN;
              }
              for (var i = 0; i < sectorscale; i++) {
                  for (var j = 0; j < sectorscale; j++) {
                      $scope.draw1sector(initx, inity, i, j);
                  }
              }
              $scope.x = initx;
              $scope.y = inity;

          }

          $scope.starsize = $scope.zcounts;
      };

      // start with Z limits set to max
      $scope.zhi = 25000;
      $scope.zlo = 0;

      drawstars.init();
      sector.init($scope.x, $scope.y, $scope.z, $scope.zoom);

      $scope.lastSector = sector.get
      $scope.lastSectorX = sector.x2Sector($scope.x);
      $scope.lastSectorY = sector.y2Sector($scope.y);
      $scope.lastSectorZ = sector.z2Sector($scope.z);

      $scope.locate();
  }]);

