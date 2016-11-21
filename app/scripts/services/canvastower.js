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

      var battlefield, cBattle, ctxBattle, fight,
          iconWidth = canvas.const.width /20;

      var imgDagger = $document[0].getElementById('dagger');
      var imgShortSword = $document[0].getElementById('shortsword');
      var imgLongSword = $document[0].getElementById('sword');
      var imgTwoHandedSword = $document[0].getElementById('twohandedsword');

      var towercanvas = {
          'version': '0.0.1',
          'const': {'xsize': 15, 'ysize': 160, 'xporch':20, 'yporch': 20},

          init: function() {
              canvas.init('battleCanvas', 640, 200);
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
                      canvas.set();
                  } else {
                      canvas.drawImage(i*stickWidth, 12, imgLongSword);
                      canvas.sayxy('st', i*stickWidth, 40);
                      canvas.sayxy(bfield[i].scores[0], i * stickWidth, 50);
                      canvas.sayxy('dx', i * stickWidth, 62);
                      canvas.sayxy(bfield[i].scores[1], i * stickWidth, 72);
                      canvas.sayxy('cn', i * stickWidth, 84);
                      canvas.sayxy(bfield[i].scores[2], i * stickWidth, 94);
                      canvas.sayxy('hp', i * stickWidth, 106);
                      canvas.sayxy(bfield[i].hp, i * stickWidth, 116);
                      canvas.sayxy('max', i * stickWidth, 128);
                      canvas.sayxy(bfield[i].maxHp, i * stickWidth, 138);
                      canvas.sayxy('ac', i * stickWidth, 150);
                      canvas.sayxy(bfield[i].ac, i * stickWidth, 162);
/*                      if (bfield[i].weapon.type === 'knife') {
                          if (bfield[i].mine === 'true') {
                              k = stickWidth - 1;
                          } else {
                              k = 0;
                          }
                          drawctx.moveTo(i*stickWidth + k, 18);
                          drawctx.lineTo(i*stickWidth + k, 16);
                          drawctx.stroke();
                      } else if (bfield[i].weapon.type === 'short sword') {
                          drawctx.moveTo(i*stickWidth + k, 18);
                          drawctx.lineTo(i*stickWidth + k, 15);
                          drawctx.stroke();
                      } else if (bfield[i].weapon.type === 'broad sword') {
                          drawctx.moveTo(i*stickWidth + k + 1, 18);
                          drawctx.lineTo(i*stickWidth + k + 1, 16);
                          drawctx.stroke();
                          drawctx.moveTo(i*stickWidth + k, 18);
                          drawctx.lineTo(i*stickWidth + k, 16);
                          drawctx.stroke();
                      } else if (bfield[i].weapon.type === 'long sword') {
                          drawctx.moveTo(i*stickWidth + k, 18);
                          drawctx.lineTo(i*stickWidth + k, 14);
                          drawctx.stroke();
                      } else if (bfield[i].weapon.type === 'great sword') {
                          drawctx.moveTo(i*stickWidth + k, 18);
                          drawctx.lineTo(i*stickWidth + k, 12);
                          drawctx.stroke();
                          drawctx.moveTo(i*stickWidth + k + 1, 18);
                          drawctx.lineTo(i*stickWidth + k + 1, 14);
                          drawctx.stroke();
                          drawctx.moveTo(i*stickWidth + k - 1, 18);
                          drawctx.lineTo(i*stickWidth + k - 1, 14);
                          drawctx.stroke();
                      }
  */
                  }
              }
          },

          getBattlefield: function () {
              if (battlefield === undefined) {
                  battlefield = [
                      null, null, null, null, null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null, null, null, null, null ];
              }
              return battlefield;
          },

          updateBattlefield: function (us, them) {
              var i, found;

              found = -1;
              for (i = 0; i<canvasWidth/stickWidth; i++) {
                  // find our last one
                  if (battlefield[i] !== null) {
                      if (battlefield[i].mine === 'true') {
                          found = i;
                      } else {
                          break;
                      }
                  }
              }
              if (found > -1) {
                  if (found < canvasWidth/stickWidth - 1) {
                      if (battlefield[found + 1] === null) {
                          // we are advancing unopposed
                          for (i = found; i > -1; i--) {
                              battlefield[i + 1] = battlefield[i];
                              battlefield[0] = us;
                          }
                          // now they advance
                          if (battlefield[found + 2] !== null) {
                              // A Fight! They go first
                              fight = '';
                              while ((battlefield[found + 1].hp > 0) && (battlefield[found + 2].hp > 0)) {
                                  if (fight.length > 32768) {
                                      fight = fight.substring(16384, fight.length);
                                  }
                                  // first they attack us
                                  i = this.hit(battlefield[found + 1], battlefield[found + 2]);
                                  if (i) {
                                      battlefield[found + 1].hp -= i;
                                      if (battlefield[found + 1].hp < 1) {
                                          fight += ' They killed you with ' + i + ' damage, you died with ' + battlefield[found + 1].hp + 'HP.';
                                          battlefield[found + 1] = null;
                                          window.alert(fight);
                                          break;
                                      } else {
                                          fight += ' They hit for ' + i + ' damage, you have ' + battlefield[found + 1].hp + 'HP remaining.';
                                      }
                                  } else {
                                      fight += ' They miss.';
                                  }
                                  // now we attack them
                                  i = this.hit(battlefield[found + 2], battlefield[found + 1]);
                                  if (i) {
                                      battlefield[found + 2].hp -= i;
                                      if (battlefield[found + 2].hp < 1) {
                                          fight += ' You killed them with ' + i + ' damage, they died with ' + battlefield[found + 2].hp + 'HP.';
                                          battlefield[found + 2] = null;
                                          window.alert(fight);
                                          break;
                                      } else {
                                          fight += ' You hit for ' + i + ' damage, they have ' + battlefield[found + 2].hp + 'HP remaining.';
                                      }
                                  } else {
                                      fight += ' You miss.';
                                  }
                              }
                          } else {
                              for (i=found + 3; i<canvasWidth/stickWidth; i++)
                              {
                                  battlefield[i - 1] = battlefield[i];
                              }
                          }
                      } else {
                          // A Fight! We go first
                          fight = '';
                          while ((battlefield[found + 1].hp > 0) && (battlefield[found].hp > 0)) {
                              // first we attack them
                              i = this.hit(battlefield[found + 1], battlefield[found]);
                              if (i) {
                                  battlefield[found + 1].hp -= i;
                                  if (battlefield[found + 1].hp < 1) {
                                      fight += ' You killed them with ' + i + ' damage, they died with ' + battlefield[found + 1].hp + 'HP.';
                                      battlefield[found + 1] = null;
                                      window.alert(fight);
                                      break;
                                  } else {
                                      fight += ' You hit for ' + i + ' damage, they have ' + battlefield[found + 1].hp + 'HP remaining.';
                                  }
                              } else {
                                  fight += ' You miss.';
                              }

                              // NOW they attack us
                              i = this.hit(battlefield[found], battlefield[found + 1]);
                              if (i) {
                                  battlefield[found].hp -= i;
                                  if (battlefield[found].hp < 1) {
                                      fight += ' They killed you with ' + i + ' damage, you died with ' + battlefield[found].hp + 'HP.';
                                      battlefield[found] = null;
                                      window.alert(fight);
                                      break;
                                  } else {
                                      fight += ' They hit for ' + i + ' damage, you have ' + battlefield[found].hp + 'HP remaining.';
                                  }
                              } else {
                                  fight += ' They miss.';
                              }
                          }
                      }
                  } else {
                      // A Win!!
                      window.alert('You won! ');
                      battlefield[canvasWidth/stickWidth - 1] = null;
                  }
              } else {
                  // enemy advances unopposed
                  if (battlefield[0] !== null) {
                      // A Loss!
                      window.alert('You lost!');
                      battlefield[0] = null;
                  } else {
                      for (i=0; i<canvasWidth/stickWidth - 1; i++) {
                          battlefield[i] = battlefield[i + 1];
                      }
                  }
              }
              if (battlefield[canvasWidth/stickWidth - 1] === null) {
                  if (them !== null) {
                      them.mine = 'false';
                      battlefield[canvasWidth/stickWidth - 1] = them;
                  }
              } else {
                  if (battlefield[canvasWidth/stickWidth - 1].mine === 'false') {
                      battlefield[canvasWidth/stickWidth - 1] = null;
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
