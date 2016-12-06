'use strict';

/**
 * @ngdoc service
 * @name resumeApp.drawstars
 * @description
 * # drawstars
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('drawstars', ['canvas', function (canvas) {

      var starcanvas = {
          'version': '0.0.1',
          'const': {
              'xsize': 100, 'ysize': 100, 'zsize': 25, 'scaler': 1000,
              'zscaler': 250, 'xadjust': 100000, 'yadjust': 100000, 'zadjust': 25000, 'fg': 0xFFFFFF, 'bg': 0x000000
          },
          init: function() {canvas.init();},
          clear: function() {canvas.clear();},
          ultest: function(saythis) {canvas.ultext(saythis);},
          umtext: function(saythis) {canvas.umtext(saythis);},
          urtext: function(saythis) {canvas.urtext(saythis);},
          mltext: function(saythis) {canvas.mltext(saythis);},
          lltext: function(saythis) {canvas.lltext(saythis);},
          lmtext: function(saythis) {canvas.lmtext(saythis);},
          mrtext: function(saythis) {canvas.mrtext(saythis);},
          lrtext: function(saythis) {canvas.lrtext(saythis);}
      };

      starcanvas.drawStar = function (star, size, color, xlo, xdelta, ylo, ydelta) {
          if (size > 0) {
              canvas.circle(canvas.const.width * (star.sx - xlo) / xdelta, canvas.const.height * (star.sy - ylo) / ydelta, size, color);
          } else {
              canvas.circle(canvas.const.width * (star.sx - xlo) / xdelta, canvas.const.height * (star.sy - ylo) / ydelta, 1, color);
          }
      };

      starcanvas.drawXY = function (x, y, star, size, color, xlo, xdelta, ylo, ydelta, xc, yc, loops) {
          var fsize = size;
          if (fsize < 1) {
              fsize = 1
          }

          canvas.ctxt.context.strokeStyle = color;
          canvas.ctxt.context.fillStyle = color;

          canvas.circle(canvas.const.width * (star.sx - xlo + xc * xdelta / loops) / xdelta,
              canvas.const.height * (star.sy - ylo + yc * ydelta / loops) / ydelta, fsize, color);
      };

      // if you look in app/views/galaxy.htm you will find a canvas with ID == 'starfield'
      canvas.init('starfield');

      return starcanvas;
}]);
