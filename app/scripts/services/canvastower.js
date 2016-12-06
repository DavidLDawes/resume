'use strict';

/**
 * @ngdoc service
 * @name resumeApp.canvastower
 * @description
 * # canvastower
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('canvastower', ['$document', 'canvas', function ($document, canvas) {

      var battlefield, cBattle, ctxBattle, fight;

      var imgDagger = $document[0].getElementById('dagger');
      var imgShortSword = $document[0].getElementById('shortsword');
      var imgLongSword = $document[0].getElementById('sword');
      var imgTwoHandedSword = $document[0].getElementById('twohandedsword');
      var imgBlank = $document[0].getElementById('blank');
      var statnames = ['st', 'dx', 'cn', 'hp', 'max', 'ac'];
      var canvaswidth = 640, canvasheight = 200, fieldspaces = 40, xp = 20, yp = 20;
      var xbattlefield = canvaswidth - 2 * xp;
      var xspacesize = Math.floor(xbattlefield / fieldspaces);
      var ybattlefield = canvaswidth - 2 * yp;
      var yspacesize = ybattlefield;


      var fightrounds = function (mefirst) {
          var result, offset = 0, hedied = false;
          // A Fight! We go first

          fight = '';
          while ((battlefield[found + 1].hp > 0) && (battlefield[found].hp > 0)) {
              // first we attack them
              if (mefirst) {
                  result = this.hit(battlefield[found + 1 + offset], battlefield[found + offset]);
                  if (result) {
                      battlefield[found + 1 + offset].hp -= result;
                      if (battlefield[found + 1 + offset].hp < 1) {
                          fight += ' You killed them with ' + result + ' damage, they died with ' + battlefield[found + 1 + offset].hp + 'HP.';
                          hedied = true;
                          battlefield[found + 1 + offset] = null;
                          window.alert(fight);
                      } else {
                          fight += ' You hit for ' + result + ' damage, they have ' + battlefield[found + 1 + offset].hp + 'HP remaining.';
                      }
                  } else {
                      fight += ' You miss.';
                  }
              } else {
                  offset = 1;
                  //only skip me 1 time at most
                  mefirst = true;
              }

              if (!hedied) {
                  // NOW they attack us (only if he did not die already)
                  result = this.hit(battlefield[found + offset], battlefield[found + 1 + offset]);
                  if (result) {
                      battlefield[found = + offset].hp -= result;
                      if (battlefield[found + offset].hp < 1) {
                          fight += ' They killed you with ' + result + ' damage, you died with ' + battlefield[found + offset].hp + 'HP.';
                          battlefield[found + offset] = null;
                          window.alert(fight);
                          break;
                      } else {
                          fight += ' They hit for ' + result + ' damage, you have ' + battlefield[found + offset].hp + 'HP remaining.';
                      }
                  } else {
                      fight += ' They miss.';
                  }
              }
          }
          return result;
      };

      var towercanvas = {
          'version': '0.0.1',
          'const': {'fieldcount': fieldspaces, 'xsize': xspacesize, 'ysize': yspacesize, 'xporch':xp, 'yporch': yp},
          init: function() {
              canvas.init('battleCanvas', canvaswidth, canvasheight);
              ctxBattle = canvas.ctxt.context;
          },
          clear: function() {canvas.set();},
          ultest: function(saythis) {canvas.ultext(saythis);},
          umtext: function(saythis) {canvas.umtext(saythis);},
          urtext: function(saythis) {canvas.urtext(saythis);},
          mltext: function(saythis) {canvas.mltext(saythis);},
          lltext: function(saythis) {canvas.lltext(saythis);},
          lmtext: function(saythis) {canvas.lmtext(saythis);},
          mrtext: function(saythis) {canvas.mrtext(saythis);},
          lrtext: function(saythis) {canvas.lrtext(saythis);},

          getFight: function() {
              if (fight === undefined) {fight = null;}
              return fight;
          },

          getCtx: function() {
              return canvas.ctxt.context;
          },

          showGraphic: function(bfld, ctx) {
              if ((ctx !== undefined) && (ctx !== null)) {
                  // now get ready to draw them
                  this.drawFigures(bfld, ctx);
              }
          },

          drawFigures: function (bfield, drawctx) {
              var i, k;


              //now draw the row
              for (i=0; i<bfield.length; i++)
              {
                  if (bfield[i] === null) {
                      canvas.drawImage(xp + i*towercanvas.const.x, yp + towercanvas.const.x, imgBlank);
                  } else {
                      canvas.drawImage(xp + i*xspacesize, yp, imgLongSword);
                      for (var stat=0; stat<statnames.size; stat++) {
                          canvas.sayxy(statnames[stat], xp + i*xspacesize, yp + 22 * stat);
                          canvas.sayxy(bfield[i].scores[stat], xp + i * xspacesize, yp + 10 + 22 * stat);
                      }
                }
              }
          },

          getBattlefield: function () {
              if (battlefield === undefined) {
                  battlefield = [];
                  for (var i =0; i<fieldspaces; i++) {
                      battlefield.push(null);
                  }
              }
              return battlefield;
          },

          updateBattlefield: function (us, them) {
              var i, found = -1;
              for (i = 0; i<canvas.const.width/100; i++) {
                  // find our last one
                  if (battlefield[i] !== null) {
                      if (battlefield[i].mine === 'true') {found = i;} else {break;}
                  }
              }
              if (found > -1) {
                  if (found < fieldspaces - 1) {
                      if (battlefield[found + 1] === null) {
                          // we are advancing unopposed
                          for (i = found; i > -1; i--) {
                              battlefield[i + 1] = battlefield[i];
                              battlefield[0] = us;
                          }
                          // now they advance
                          if (battlefield[found + 2] !== null) {
                              // Fight! they go first
                              fightrounds(false);
                          } else {
                              for (i=found + 3; i<fieldspaces; i++) {battlefield[i - 1] = battlefield[i];}
                          }
                      } else {
                          // next space occupied, we fight rather than advance
                          // we go first
                          fightrounds(true);
                      }
                  } else {
                      // A Win!!
                      window.alert('You won! ');
                      battlefield[fieldspaces - 1] = null;
                  }
              } else {
                  // enemy advances unopposed
                  if (battlefield[0] !== null) {
                      // A Loss!
                      window.alert('You lost!');
                      battlefield[0] = null;
                  } else {
                      for (i=0; i<fieldspaces - 1; i++) {
                          battlefield[i] = battlefield[i + 1];
                      }
                  }
              }
              if (battlefield[fieldspaces - 1] === null) {
                  if (them !== null) {
                      them.mine = 'false';
                      battlefield[fieldspaces - 1] = them;
                  }
              } else {
                  if (battlefield[fieldspaces - 1].mine === 'false') {
                      battlefield[fieldspaces - 1] = null;
                  }
              }
              if ((battlefield[0] === null)) {
                  if (us !== null) {
                      us.mine = 'true';
                      battlefield[0] = us;
                  }
              } else {
                  if (battlefield[0].mine === 'true') {
                      battlefield[0] = null;
                  }
              }

              this.showGraphic (battlefield, ctxBattle);
          },

          hit: function(target, attacker) {
              var i, j;
              if (Math.floor(Math.random() * 20) < attacker.thac0[target.ac]) {
                  // missed! return 0 for damage
                  return 0;
              } else {
                  // hit! Figure out the damage!
                  j = 0;
                  for (i=0; i<attacker.weapon.damage.dice; i++) {
                      j += Math.floor(Math.random() * attacker.weapon.damage.type) + 1;
                  }
                  j += attacker.weapon.damage.plus;
                  return j;
              }
          }
      };
      return towercanvas;
  }]);
