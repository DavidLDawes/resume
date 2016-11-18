'use strict';

/**
 * @ngdoc service
 * @name resumeApp.canvas
 * @description
 * # canvas
 * Service in the resumeApp.
 */
angular.module('resumeApp')
    .service('canvas', function () {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var isGood = function (item) {
            return (item != null && item != 0)
        }
        var isBad = function (item) {
            return (item == null || item == 0)
        }

        var canvas = {
            'version': '0.0.1',
            'const': {
                'width': 640, 'height': 480, 'xsize': 100, 'ysize': 100, 'zsize': 25, 'scaler': 1000,
                'zscaler': 250, 'xadjust': 100000, 'yadjust': 100000, 'zadjust': 25000, 'fg': 0xFFFFFF, 'bg': 0x000000
            },
            'ctxt': {'elementid': 0, 'context': 0}
        };

        if (isBad(canvas.ctxt.elementid)) {
            canvas.ctxt.elementid = document.getElementById('starfield');
        }

        if (isGood(canvas.ctxt.elementid) &&
            isBad(canvas.ctxt.context)) {
            canvas.ctxt.context = canvas.ctxt.elementid.getContext('2d');
        }

        // Public API here
        canvas.init = function () {
            canvas.ctxt.elementid = document.getElementById("starfield");
            if (isGood(canvas.ctxt.elementid)) {
                canvas.ctxt.context = canvas.ctxt.elementid.getContext("2d");
            }
        }

        canvas.clear = function () {
            if (isBad(canvas.ctxt.context)) {
                canvas.init();
            }
            if (isGood(canvas.ctxt.context)) {
                canvas.ctxt.context.strokeStyle = 'black';
                canvas.ctxt.context.fillStyle = 'black';
                canvas.ctxt.context.fillRect(0, 0, canvas.const.width, canvas.const.height);
            }
        }

        canvas.ultext = function (saythis) {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.font = "12px Arial";
            canvas.ctxt.context.fillText(saythis, 0, 10);
        }


        canvas.umtext = function (saythis) {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.font = "12px Arial";
            if (saythis.length < 12) {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * .48, 10);
            } else {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * .42, 10);
            }
        }

        canvas.urtext = function (saythis) {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.font = "12px Arial";
            if (saythis.length < 15) {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * 0.888, 10);
            } else {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * 0.833, 10);
            }
        }

        canvas.mltext = function (saythis) {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.font = "12px Arial";
            canvas.ctxt.context.fillText(saythis, 0, canvas.const.height / 2);
        }

        canvas.lltext = function (saythis) {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.font = "12px Arial";
            canvas.ctxt.context.fillText(saythis, 0, canvas.const.height - 10);
        }


        canvas.lmtext = function (saythis) {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.font = "12px Arial";
            if (saythis.length < 12) {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * 0.48, canvas.const.height - 10);
            } else {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * 0.42, canvas.const.height - 10);
            }
        }

        canvas.mrtext = function (saythis) {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.font = "12px Arial";
            if (saythis.length < 17) {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * 0.9, canvas.const.height / 2);
            } else {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * 0.8, canvas.const.height / 2);
            }
        }

        canvas.lrtext = function (saythis) {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.font = "12px Arial";
            if (saythis.length < 15) {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * 0.888, canvas.const.height - 10);
            } else {
                canvas.ctxt.context.fillText(saythis, canvas.const.width * 0.833, canvas.const.height - 10);
            }
        }

        canvas.drawStar = function (star, size, color, xlo, xdelta, ylo, ydelta) {
            if (isBad(canvas.ctxt.context)) {
                canvas.init();
            }
            if (size > 0) {
                canvas.ctxt.context.beginPath();
                canvas.ctxt.context.arc(canvas.const.width * (star.sx - xlo) / xdelta,
                    canvas.const.height * (star.sy - ylo) / ydelta, size, 0, 2 * Math.PI);
                canvas.ctxt.context.strokeStyle = color;
                canvas.ctxt.context.fillStyle = color;
                canvas.ctxt.context.fill();
                canvas.ctxt.context.stroke();
            } else {
                canvas.ctxt.context.beginPath();
                canvas.ctxt.context.arc(canvas.const.width * (star.sx - xlo) / xdelta,
                    canvas.const.height * (star.sy - ylo) / ydelta, 1, 0, 2 * Math.PI);
                canvas.ctxt.context.strokeStyle = color;
                canvas.ctxt.context.fillStyle = color;
                canvas.ctxt.context.fill();
                canvas.ctxt.context.stroke();
            }
        }

        canvas.drawXY = function (x, y, star, size, color, xlo, xdelta, ylo, ydelta, xc, yc, loops) {
            if (isBad(canvas.ctxt.context)) {
                canvas.init();
            }
            var fsize = size;
            //if (loops > 4) {fsize = 1}
            if (fsize < 1) {
                fsize = 1
            }
            canvas.ctxt.context.beginPath();
            canvas.ctxt.context.arc(canvas.const.width * (star.sx - xlo + xc * xdelta / loops) / xdelta,
                canvas.const.height * (star.sy - ylo + yc * ydelta / loops) / ydelta, fsize, 0, 2 * Math.PI);
            canvas.ctxt.context.strokeStyle = color;
            canvas.ctxt.context.fillStyle = color;
            canvas.ctxt.context.fill();
            canvas.ctxt.context.stroke();
        }

        return canvas;
    });
