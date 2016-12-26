/**
 * @ngdoc service
 * @name resumeApp.sector
 * @description
 * # sector
 * Service in the resumeApp.
 */
/*jslint node: true */
/*global angular */
angular.module('resumeApp')
    .factory('sector', ['murmurHash3', 'drawstars', 'randomSeed', function (murmurHash3, drawstars, randomSeed) {
        'use strict';
        var sect = {
            currentsect: {x: 0, y: 0, z: 0},
            hash: 0,
            starclass: [
                {name: 'O', color: 'LightCyan', dimcolor: 'Cyan', odds: 0.0006, fudge: 0.000402, minmass: 16.00001, deltamass: 243.2,
                    minraddi: 6, deltaradii: 17.3, minlum: 30000, deltalum: 147000.2, pixels: 11, stars: []},
                {name: 'B', color: 'LightBlue', dimcolor: 'Blue', odds: 0.0013, fudge: 0.0003,
                    minmass: 2.1, deltamass: 13.9, minraddi: 1.8, deltaradii: 4.8, minlum: 25, deltalum: 29975,
                    pixels: 8, stars: []},
                {name: 'A', color: 'White', dimcolor: 'Grey', odds: 0.006, fudge: 0.0018, minmass: 1.4, deltamass: 0.7,
                    minraddi: 1.4, deltaradii: 0.4, minlum: 5, deltalum: 20, pixels: 7, stars: []},
                {name: 'F', color: 'LightYellow', dimcolor: 'Yellow', odds: 0.03, fudge: 0.012, minmass: 1.04, deltamass: 0.36,
                    minraddi: 1.15, deltaradii: 0.25, minlum: 1.5, deltalum: 3.5, pixels: 6, stars: []},
                {name: 'G', color: 'Yellow', dimcolor: 'DarkYellow', odds: 0.076, fudge: 0.01502, minmass: 0.8,
                    deltamass: 0.24, minraddi: 0.96, deltaradii: 0.19, minlum: 0.6, deltalum: 0.9, pixels: 5, stars: []},
                {name: 'K', color: 'Orange', dimcolor: 'DarkOrange', odds: 0.121, fudge: 0.042, minmass: 0.45, deltamass: 0.35,
                    minraddi: 0.7, deltaradii: 0.26, minlum: 0.08, deltalum: 0.52, pixels: 4, stars: []},
                {name: 'M', color: 'Red', dimcolor: 'DarkRed', odds: 0.7645, fudge: 0.14, minmass: 1.04, deltamass: 0.36,
                    minraddi: 1.15, deltaradii: 0.25, minlum: 1.5, deltalum: 3.5, pixels: 3, stars: []}],

            classByZoom: [7, 7, 7, 6, 4, 3, 2, 1],
            hashCharByIteration: [0, 2, 8, 16, 24, 12, 23],

            centralGstar: {'id': -1, 'sx': -1, 'sy': -1, 'sz': -1, 'x': -1, 'y': -1, 'z': -1,
                'offset': 9999999999999, 'starClass': 'G', 'starColor': 'Yellow', 'dimColor': 'DarkYellow',
                'starMass': 1, 'starRadii': -1, 'starLuminance': -1},

            xmin: 0,
            xmax: 100000,
            ymin: 0,
            ymax: 100000,
            zmin: 0,
            zmax: 25000,

            getSector: function () {return sect.currentsect; },

            x2Sector: function (xin) {return Math.floor(xin / (drawstars.constants.xsize * drawstars.constants.scaler)); },
            y2Sector: function (yin) {return Math.floor(yin / (drawstars.constants.ysize * drawstars.constants.scaler)); },
            z2Sector: function (zin) {return Math.floor(zin / (drawstars.constants.zsize * drawstars.constants.zscaler)); },

            randomStars: function (starDetails) {
                var i, loopsize, rstar, rando;
                
                starDetails.stars = [];
                loopsize = Math.floor(1000 * (starDetails.odds - starDetails.fudge + 2 * starDetails.fudge * randomSeed.x86.nextFloat()));
                for (i = 0; i < loopsize; i = i + 1) {
                    rstar = {};
                    rando = randomSeed.x86.nextFloat();
                    rstar.id = i;
                    rstar.sx = randomSeed.x86.nextFloat() * drawstars.constants.xadjust;
                    rstar.sy = randomSeed.x86.nextFloat() * drawstars.constants.yadjust;
                    rstar.sz = randomSeed.x86.nextFloat() * drawstars.constants.zadjust;
                    rstar.starSector = [
                        sect.currentsect.x * drawstars.constants.xadjust + rstar.sx,
                        sect.currentsect.y * drawstars.constants.yadjust + rstar.sy,
                        sect.currentsect.z * drawstars.constants.zadjust + rstar.sx
                    ];

                    rstar.x = sect.currentsect.x * drawstars.constants.xadjust + rstar.sx;
                    rstar.y = sect.currentsect.y * drawstars.constants.yadjust + rstar.sy;
                    rstar.z = sect.currentsect.z * drawstars.constants.zadjust + rstar.sz;
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
       (aGstar.sx - drawstars.constants.xsize*drawstars.constants.scaler/2) *
       (aGstar.sx - drawstars.constants.xsize*drawstars.constants.scaler/2) +
       (aGstar.sy - drawstars.constants.ysize*drawstars.constants.scaler/2) *
       (aGstar.sy - drawstars.constants.ysize*drawstars.constants.scaler/2) +
       (aGstar.sz - drawstars.constants.zsize*drawstars.constants.zscaler/2) *
       (aGstar.sz - drawstars.constants.zsize*drawstars.constants.zscaler/2));
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
            var i, result = 0;
            for (i = 0; i < sclass.stars.length; i = i + 1) {
                if (!(sclass.stars[i].sz < zl || sclass.stars[i].sz > zh)) {
                    if (sect.seen(sclass.stars[i])) {
                        drawstars.drawStar(sclass.stars[i],
                            sclass.pixels - zm, sclass.stars[i].starColor,
                            sect.xmin, sect.xmax - sect.xmin,
                            sect.ymin, sect.ymax - sect.ymin);
                        result = result + 1;
                    }
                }
            }
            return result;
        };

        sect.paneldrawstarclass = function (sclass, zl, zh, zm, xcnt, ycnt, loopcnt) {
            var starcnt, padjust, result = 0;
            for (starcnt = 0; starcnt < sclass.stars.length; starcnt = starcnt + 1) {
                if (!(sclass.stars[starcnt].sz < zl || sclass.stars[starcnt].sz > zh)) {
                    padjust = 1;
                    if (zm > 4) {
                        padjust = 2;
                    }
                    if (sclass.pixels - zm - padjust > 0.99999) {
                        drawstars.drawXY((sect.xmax - sect.xmin) * xcnt + sclass.stars[starcnt].sx,
                            (sect.ymax - sect.ymin) * ycnt + sclass.stars[starcnt].sy,
                            sclass.stars[starcnt],
                            sclass.pixels - zm - padjust, sclass.stars[starcnt].starColor,
                            sect.xmin, loopcnt * (sect.xmax - sect.xmin),
                            sect.ymin, loopcnt * (sect.ymax - sect.ymin), xcnt, ycnt, loopcnt);
                    } else {
                        drawstars.drawXY((sect.xmax - sect.xmin) * xcnt + sclass.stars[starcnt].sx,
                            (sect.ymax - sect.ymin) * ycnt + sclass.stars[starcnt].sy,
                            sclass.stars[starcnt], 1, sclass.stars[starcnt].starColor,
                            sect.xmin, loopcnt * (sect.xmax - sect.xmin),
                            sect.ymin, loopcnt * (sect.ymax - sect.ymin), xcnt, ycnt, loopcnt);
                    }
                    result = result + 1;
                }
            }
            return result;
        };

        // Public API here

        sect.init = function (x0, y0, z0, zoom) {
            var i;
            sect.currentsect.x = Math.floor(x0 / (drawstars.constants.xadjust));
            sect.currentsect.y = Math.floor(y0 / (drawstars.constants.yadjust));
            sect.currentsect.z = Math.floor(z0 / (drawstars.constants.zadjust));

            sect.hash = murmurHash3.x64.hash128(sect.currentsect.x + ' ' + sect.currentsect.y + ' ' + sect.currentsect.z, 77755093);
            for (i = 0; i < sect.classByZoom[zoom]; i = i + 1) {
                randomSeed.x86.init(parseInt(' 0' + sect.hash.substring(sect.hashCharByIteration[i],
                        sect.hashCharByIteration[i] + 8), 16));
                sect.randomStars(sect.starclass[i]);
            }
        };

        sect.seen = function (sstar) {
            return !(sstar.sx < sect.xmin || sstar.sx > sect.xmax || sstar.sy < sect.ymin || sstar.sy > sect.ymax);
        };

        sect.legend = function () {
            //drawstars.ultext(((sect.currentsect.x * drawstars.constants.xadjust + sect.xmin)/1000) + ' , ' + ((sect.currentsect.y * drawstars.constants.yadjust + sect.ymin)/1000));
            //drawstars.umtext('Galaxy 0');
            //drawstars.urtext(((sect.currentsect.x * drawstars.constants.xadjust + sect.xmin)/1000) + ' , ' + ((sect.currentsect.y * drawstars.constants.yadjust + sect.ymax)/1000));

            //drawstars.lltext(((sect.currentsect.x * drawstars.constants.xadjust + sect.xmax)/1000) + ' , ' + ((sect.currentsect.y * drawstars.constants.yadjust + sect.ymin)/1000));
            //drawstars.lmtext('z range from ' + (sect.currentsect.z * drawstars.constants.zadjust) + ' to ' + (sect.currentsect.z * drawstars.constants.zadjust + drawstars.constants.zadjust));
            drawstars.lrtext(((sect.currentsect.x * drawstars.constants.xadjust + sect.xmax) / 1000) + ' , ' + (sect.currentsect.y * drawstars.constants.yadjust + sect.ymax) / 1000);
        };

        sect.draw = function (zlo, zhi, zoom) {
            var sclass, result = [];

            for (sclass = 0; sclass < sect.classByZoom[zoom]; sclass = sclass + 1) {
                result.push(sect.drawstarclass(sect.starclass[sclass], zlo, zhi, zoom));
            }
            for (sclass = sect.classByZoom[zoom]; sclass < sect.starclass.length; sclass = sclass + 1) {
                sect.starclass[sclass].stars = [];
                result.push(NaN);
            }
            return result;
        };

        sect.multidraw = function (zlo, zhi, zoom, i, j) {

            var loops = 4, result = [], checkzoom, classcnt;

            for (checkzoom = 4; checkzoom < zoom; checkzoom = checkzoom + 1) {
                loops *= 4;
            }

            for (classcnt = 0; classcnt < sect.classByZoom[zoom]; classcnt = classcnt + 1) {
                result.push(sect.paneldrawstarclass(sect.starclass[classcnt], zlo, zhi, zoom, i, j, loops));
            }

            for (classcnt = sect.classByZoom[zoom]; classcnt < sect.starclass.length; classcnt = classcnt + 1) {
                sect.starclass[classcnt].stars = [];
                result.push(NaN);
            }

            return result;
        };

        return sect;
    }]);
