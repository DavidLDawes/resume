'use strict';

/**
 * @ngdoc service
 * @name resumeApp.cardsprites
 * @description
 * # cardsprites
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('cardsprites', ['canvas', '$document', function (canvas, $document) {
    // Service logic
    // ...

      // cards image is 2708 pixels across for 13 cards, width 208.30769230769231 per card
      // cards image is 1382 pixels across for 5 rows, height 276.4 per row of cards
      var id='spritePanel';
      var xpixels = 81, ypixels = 117, xp = 12, yp = 12, ccols = 6, crows = 4;
      var xsize = xpixels * crows + 2 * xp, ysize = ypixels * ccols + 2 * yp;

      var spritePanelSave;

    // Public API here
    return {
        'version': '0.0.1',
        'const': {'xsize': xsize, 'ysize': ysize, 'xporch':xp, 'yporch': yp},


        init: function (spritePanel) {
          canvas.init('cardsCanvas', xsize, ysize);
          canvas.addSprites(id, spritePanel, ccols, crows, xpixels, ypixels);
        },

        drawSprite: function (i, j, x, y) {
            canvas.drawSprite(id, i, j, x, y);
        }
    };
  }]);
