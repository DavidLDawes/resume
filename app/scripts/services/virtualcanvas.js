/**
 * @ngdoc service
 * @name resumeApp.canvas
 * @description
 * # canvas
 * Service in the resumeApp.
 */
/*global angular */
angular.module('resumeApp')
    .service('virtualcanvas', ['canvas', function (canvas) {
        'use strict';
        // AngularJS will instantiate a singleton by calling "new" on this function

        var canvasses = [],
            isGood = function (item) {return (item !== null && item !== 0); },
            isBad = function (item) {return (item === null || item === 0); },
            canvasobject = {
                'version': '0.0.1',
                'constants': {
                    'width': 1920,
                    'height': 1200
                },
                'ctxt': {'canvasID': '', 'elementid': 0, 'context': 0},
                'sprites': []
            },
            say = function (saythis, color, font, x, y) {
                canvasobject.ctxt.context.strokeStyle = color;
                canvasobject.ctxt.context.fillStyle = color;
                canvasobject.ctxt.context.font = font;
                canvasobject.ctxt.context.fillText(saythis, x, y);
            };

        // Public API here
        canvasobject.init = function (canvasID, canvasWidth, canvasHeight) {
            if (canvasID !== undefined) {
                canvasobject.ctxt.canvasID = canvasID;
            } else {
                return;
            }

            if (isBad(canvasWidth)) {
                canvasobject.ctxt.width = 800;
            } else {
                canvasobject.ctxt.width = canvasWidth;
            }

            if (isBad(canvasHeight === undefined)) {
                canvasobject.ctxt.height = 640;
            } else {
                canvasobject.ctxt.height = canvasHeight;
            }

        };


        canvasobject.addSprites = function (id, simage, xcount, ycount, xpixels, ypixels) {
            canvasobject.sprites.push({
                'id': id,
                'img': simage,
                'xcount': xcount,
                'ycount': ycount,
                'xpixels': xpixels,
                'ypixels': ypixels
            });
        };

        canvasobject.clear = function () {
            canvasobject.ctxt.context.strokeStyle = 'black';
            canvasobject.ctxt.context.fillStyle = 'black';
            canvasobject.ctxt.context.fillRect(0, 0, canvasobject.constants.width, canvasobject.constants.height);
        };

        canvasobject.set = function () {
            canvasobject.ctxt.context.strokeStyle = 'white';
            canvasobject.ctxt.context.fillStyle = 'white';
            canvasobject.ctxt.context.fillRect(0, 0, canvasobject.constants.width, canvasobject.constants.height);
        };

        canvasobject.ultext = function (saythis) {say(saythis, 'white', '12px Arial', 0, 10); };
        canvasobject.umtext = function (saythis) {say(saythis, 'white', '12px Arial', canvasobject.constants.width * 0.45, 10); };
        canvasobject.urtext = function (saythis) {say(saythis, 'white', '12px Arial', canvasobject.constants.width * 0.833, 10, 10); };
        canvasobject.mltext = function (saythis) {say(saythis, 'white', '12px Arial', 0, canvasobject.constants.height / 2); };
        canvasobject.mrtext = function (saythis) {say(saythis, 'white', '12px Arial', canvasobject.constants.width * 0.833, canvasobject.constants.height / 2); };
        canvasobject.lltext = function (saythis) {say(saythis, 'white', '12px Arial', canvasobject.constants.width, canvasobject.constants.height - 10); };
        canvasobject.lmtext = function (saythis) {say(saythis, 'white', '12px Arial', canvasobject.constants.width * 0.45, canvasobject.constants.height - 10); };
        canvasobject.lrtext = function (saythis) {say(saythis, 'white', '12px Arial', canvasobject.constants.width * 0.833, canvasobject.constants.height - 10); };

        canvasobject.sayxy = function (saythis, x, y) {say(saythis, 'white', '12px Arial', x, y); };

        canvasobject.arc = function (x, y, size, color, beginangle, angle) {
            if (isBad(canvasobject.ctxt.context)) {canvasobject.init(); }
            if (size > 0) {
                canvasobject.ctxt.context.beginPath();
                canvasobject.ctxt.context.arc(x, y, size, beginangle, angle);
                canvasobject.ctxt.context.strokeStyle = color;
                canvasobject.ctxt.context.fillStyle = color;
                canvasobject.ctxt.context.fill();
                canvasobject.ctxt.context.stroke();
            }
        };

        canvasobject.circle = function (x, y, size, color) {canvasobject.arc(x, y, size, color, 0, 2 * Math.PI); };
        canvasobject.drawImage = function (x, y, image) {canvasobject.ctxt.context.drawImage(image, x, y); };

        canvasobject.drawSprite = function (id, i, j, x, y) {
            var scnt, spritecnt = canvasobject.sprites.length;
            // first 3 (id, i and j) refer to the sprite panel
            // last 2 (x and y) tell us where to draw that sprite
            for (scnt = 0; scnt < spritecnt; scnt = scnt + 1) {
                if (canvasobject.sprites[scnt].id === id) {
                    canvasobject.ctxt.context.drawImage(canvasobject.sprites[scnt].img,
                        i * canvasobject.sprites[scnt].xpixels, j * canvasobject.sprites[scnt].ypixels,
                        canvasobject.sprites[scnt].xpixels, canvasobject.sprites[scnt].ypixels,
                        x * canvasobject.sprites[scnt].xpixels, y * canvasobject.sprites[scnt].xpixels,
                        canvasobject.sprites[scnt].xpixels, canvasobject.sprites[scnt].ypixels);
                    break;
                }
            }
        };

        return canvasobject;
    }]);
