'use strict';

/**
 * @ngdoc service
 * @name resumeApp.sector
 * @description
 * # sector
 * Service in the resumeApp.
 */
angular.module('resumeApp')
    .factory('sector', ['murmurHash3', 'drawstars', 'randomSeed', function (murmurHash3, drawstars, randomSeed) {

        var sect = {
            currentsect: {x: 0, y: 0, z: 0},
            hash: 0,
            starclass: [
                {name: 'O', color: 'LightCyan', dimcolor: 'Cyan', odds: .0006, fudge: .000402, minmass: 16.00001, deltamass: 243.2,
                    minraddi: 6, deltaradii: 17.3, minlum: 30000, deltalum: 147000.2, pixels: 11, stars: []},
                {name: 'B', color: 'LightBlue', dimcolor: 'Blue', odds: .0013, fudge: .0003,
                    minmass: 2.1, deltamass: 13.9, minraddi: 1.8, deltaradii: 4.8, minlum: 25, deltalum: 29975,
                    pixels: 8, stars: []},
                {name: 'A', color: 'White', dimcolor: 'Grey', odds: .006, fudge: .0018, minmass: 1.4, deltamass: .7,
                    minraddi: 1.4, deltaradii: .4, minlum: 5, deltalum: 20, pixels: 7, stars: []},
                {name: 'F', color: 'LightYellow', dimcolor: 'Yellow', odds: .03, fudge: .012, minmass: 1.04, deltamass: .36,
                    minraddi: 1.15, deltaradii: .25, minlum: 1.5, deltalum: 3.5, pixels: 6, stars: []},
                {name: 'G', color: 'Yellow', dimcolor: 'DarkYellow', odds: .076, fudge: .01502, minmass: .8,
                    deltamass: .24, minraddi: .96, deltaradii: .19, minlum: .6, deltalum: .9, pixels: 5, stars: []},
                {name: 'K', color: 'Orange', dimcolor: 'DarkOrange', odds: .121, fudge: .042, minmass: .45, deltamass: .35,
                    minraddi: .7, deltaradii: .26, minlum: .08, deltalum: .52, pixels: 4, stars: []},
                {name: 'M', color: 'Red', dimcolor: 'DarkRed', odds: .7645, fudge: .14, minmass: 1.04, deltamass: .36,
                    minraddi: 1.15, deltaradii: .25, minlum: 1.5, deltalum: 3.5, pixels: 3, stars: []}],

            classByZoom: [7, 7, 7, 6, 4, 3, 2, 1],
            hashCharByIteration: [0, 2, 8, 16, 24, 12, 23],

            centralGstar: {'id': -1, 'sx': -1, 'sy': -1, 'sz': -1, 'x': -1, 'y': -1, 'z': -1,
                'offset': 9999999999999, 'starClass': 'G', 'starColor': 'Yellow', 'dimColor': 'DarkYellow',
                'starMass': 1, 'starRadii': -1, 'starLuminance': -1},

            xmin: 0, xmax: 100000, ymin: 0, ymax: 100000, zmin: 0, zmax: 25000,

            getSector: function () {return sect.currentsect},

            x2Sector: function (xin) {return Math.floor(xin / (drawstars.const.xsize * drawstars.const.scaler))},
            y2Sector: function (yin) {return Math.floor(yin / (drawstars.const.ysize * drawstars.const.scaler))},
            z2Sector: function (zin) {return Math.floor(zin / (drawstars.const.zsize * drawstars.const.zscaler))},

            randomStars: function (starDetails) {
                starDetails.stars = [];
                var loopsize = Math.floor(1000 * (starDetails.odds - starDetails.fudge + 2 * starDetails.fudge * randomSeed.x86.nextFloat()));
                for (var i = 0; i < loopsize; i++) {
                    var rstar = {}, rando = randomSeed.x86.nextFloat();
                    rstar.id = i;
                    rstar.sx = randomSeed.x86.nextFloat() * drawstars.const.xadjust;
                    rstar.sy = randomSeed.x86.nextFloat() * drawstars.const.yadjust;
                    rstar.sz = randomSeed.x86.nextFloat() * drawstars.const.zadjust;
                    rstar.starSector = [
                        sect.currentsect.x * drawstars.const.xadjust + rstar.sx,
                        sect.currentsect.y * drawstars.const.yadjust + rstar.sy,
                        sect.currentsect.z * drawstars.const.zadjust + rstar.sx
                    ]

                    rstar.x = sect.currentsect.x * drawstars.const.xadjust + rstar.sx;
                    rstar.y = sect.currentsect.y * drawstars.const.yadjust + rstar.sy;
                    rstar.z = sect.currentsect.z * drawstars.const.zadjust + rstar.sz;
                    rstar.starClass = starDetails.name;
                    rstar.starColor = starDetails.color;
                    rstar.starDimColor = starDetails.dimcolor;
                    rstar.starMass = parseFloat(starDetails.minmass + starDetails.deltamass * (1 + rando));
                    rstar.starRadii = parseFloat(starDetails.minraddi + rando * starDetails.deltaradii);
                    rstar.starLuminance = parseFloat(starDetails.minlum + rando * starDetails.deltalum);
                    starDetails.stars.push(rstar);
                }
            }
        };

      /*
       sect.calcOffset = function(aGstar) {
       var thisoffset = Math.sqrt(
       (aGstar.sx - drawstars.const.xsize*drawstars.const.scaler/2) *
       (aGstar.sx - drawstars.const.xsize*drawstars.const.scaler/2) +
       (aGstar.sy - drawstars.const.ysize*drawstars.const.scaler/2) *
       (aGstar.sy - drawstars.const.ysize*drawstars.const.scaler/2) +
       (aGstar.sz - drawstars.const.zsize*drawstars.const.zscaler/2) *
       (aGstar.sz - drawstars.const.zsize*drawstars.const.zscaler/2));
       if (thisoffset < sect.offset) {
       sect.centralGstar.offset = thisoffset;
       sect.centralGstar.id = aGstar.id;
       sect.centralGstar.x = aGstar.x;
       sect.centralGstar.y = aGstar.y;
       sect.centralGstar.z = aGstar.z;
       sect.centralGstar.sx = aGstar.sx;
       sect.centralGstar.sy = aGstar.sy;
       sect.centralGstar.sz = aGstar.sz;
       sect.centralGstar.starClass = aGstar.starClass;
       sect.centralGstar.starMass = aGstar.starMass;
       sect.centralGstar.starRadii = aGstar.starRadii;
       sect.centralGstar.starLuminance = aGstar.starLuminance;
       sect.offset = thisoffset;
       }

       return thisoffset;
       };
       */

        sect.drawstarclass = function (sclass, zl, zh, zm) {
            var result = 0;
            for (var i = 0; i < sclass.stars.length; i++) {
                if (!(sclass.stars[i].sz < zl || sclass.stars[i].sz > zh)) {
                    if (sect.seen(sclass.stars[i])) {
                        drawstars.drawStar(sclass.stars[i],
                            sclass.pixels - zm, sclass.stars[i].starColor,
                            sect.xmin, sect.xmax - sect.xmin,
                            sect.ymin, sect.ymax - sect.ymin);
                        result++;
                    }
                }
            }
            return result;
        };

        sect.paneldrawstarclass = function (sclass, zl, zh, zm, xcnt, ycnt, loopcnt) {
            var result = 0;
            for (var starcnt = 0; starcnt < sclass.stars.length; starcnt++) {
                if (!(sclass.stars[starcnt].sz < zl || sclass.stars[starcnt].sz > zh)) {
                    var padjust = 1;
                    if (zm > 4) {
                        padjust = 2;
                    }
                    if (sclass.pixels - zm - padjust > .99999) {
                        drawstars.drawXY((sect.xmax - sect.xmin) * xcnt + sclass.stars[starcnt].sx,
                            (sect.ymax - sect.ymin) * ycnt + sclass.stars[starcnt].sy,
                            sclass.stars[starcnt],
                            sclass.pixels - zm - padjust, sclass.stars[starcnt].starColor,
                            sect.xmin, loopcnt * (sect.xmax - sect.xmin),
                            sect.ymin, loopcnt * (sect.ymax - sect.ymin), xcnt, ycnt, loopcnt);
                    } else {
                        drawstars.ctxt.context.strokeStyle = sclass.stars[starcnt].starColor;
                        drawstars.ctxt.context.fillStyle = sclass.stars[starcnt].starColor;
                        drawstars.drawXY((sect.xmax - sect.xmin) * xcnt + sclass.stars[starcnt].sx,
                            (sect.ymax - sect.ymin) * ycnt + sclass.stars[starcnt].sy,
                            sclass.stars[starcnt], 1, sclass.stars[starcnt].starColor,
                            sect.xmin, loopcnt * (sect.xmax - sect.xmin),
                            sect.ymin, loopcnt * (sect.ymax - sect.ymin), xcnt, ycnt, loopcnt);
                    }
                    result++;
                }
            }
            return result;
        };

        // Public API here

        sect.init = function (x0, y0, z0, zoom) {
            sect.currentsect.x = Math.floor(x0 / (drawstars.const.xadjust));
            sect.currentsect.y = Math.floor(y0 / (drawstars.const.yadjust));
            sect.currentsect.z = Math.floor(z0 / (drawstars.const.zadjust));

            sect.hash = murmurHash3.x64.hash128(sect.currentsect.x + ' ' + sect.currentsect.y + ' ' + sect.currentsect.z, 77755093);
            for (var i = 0; i < sect.classByZoom[zoom]; i++) {
                randomSeed.x86.init(parseInt(' 0' + sect.hash.substring(sect.hashCharByIteration[i],
                        sect.hashCharByIteration[i] + 8), 16));
                sect.randomStars(sect.starclass[i]);
            }
        };

        sect.seen = function (sstar) {
            return !(sstar.sx < sect.xmin || sstar.sx > sect.xmax || sstar.sy < sect.ymin || sstar.sy > sect.ymax);
        };

        sect.legend = function () {
            //drawstars.ultext(((sect.currentsect.x * drawstars.const.xadjust + sect.xmin)/1000) + ' , ' + ((sect.currentsect.y * drawstars.const.yadjust + sect.ymin)/1000));
            //drawstars.umtext('Galaxy 0');
            //drawstars.urtext(((sect.currentsect.x * drawstars.const.xadjust + sect.xmin)/1000) + ' , ' + ((sect.currentsect.y * drawstars.const.yadjust + sect.ymax)/1000));

            //drawstars.lltext(((sect.currentsect.x * drawstars.const.xadjust + sect.xmax)/1000) + ' , ' + ((sect.currentsect.y * drawstars.const.yadjust + sect.ymin)/1000));
            //drawstars.lmtext('z range from ' + (sect.currentsect.z * drawstars.const.zadjust) + ' to ' + (sect.currentsect.z * drawstars.const.zadjust + drawstars.const.zadjust));
            drawstars.lrtext(((sect.currentsect.x * drawstars.const.xadjust + sect.xmax) / 1000) + ' , ' + (sect.currentsect.y * drawstars.const.yadjust + sect.ymax) / 1000);
        };

        sect.draw = function (zlo, zhi, zoom) {
            var result = [];

            for (var sclass = 0; sclass < sect.classByZoom[zoom]; sclass++) {
                result.push(sect.drawstarclass(sect.starclass[sclass], zlo, zhi, zoom));
            }
            for (sclass = sect.classByZoom[zoom]; sclass < sect.starclass.length; sclass++) {
                sect.starclass[sclass].stars = [];
                result.push(NaN);
            }
            return result;
        };

        sect.multidraw = function (zlo, zhi, zoom, i, j) {

            var loops = 4;
            var result = [];

            for (var checkzoom = 4; checkzoom < zoom; checkzoom++) {
                loops *= 4;
            }

            for (var classcnt = 0; classcnt < sect.classByZoom[zoom]; classcnt++) {
                result.push(sect.paneldrawstarclass(sect.starclass[classcnt], zlo, zhi, zoom, i, j, loops));
            }

            for (classcnt = sect.classByZoom[zoom]; classcnt < sect.starclass.length; classcnt++) {
                sect.starclass[classcnt].stars = [];
                result.push(NaN);
            }

            return result;
        };

        return sect;
    }]);
