'use strict';

/**
 * @ngdoc service
 * @name resumeApp.equip
 * @description
 * # equip
 * Factory in the resumeApp.
 */
angular.module('resumeApp')
  .factory('equip', function () {
    // Service logic
    // ...

      // AngularJS will instantiate a singleton by calling 'new' on this function
      var generator, equipment;


      return {

          weapons: [
              {'type': 'knife',
                  'thac0': [20, 20, 20, 19, 17, 16, 14, 12, 10, 9],
                  'damage':{'dice': 1, 'type': 3, 'plus': 0}},
              {'type': 'short sword',
                  'thac0': [20, 20, 19, 18, 16, 15, 13, 12, 11, 10],
                  'damage':{'dice': 1, 'type': 4, 'plus': 0}},
              {'type': 'broad sword',
                  'thac0': [20, 19, 18, 18, 16, 15, 13, 12, 11, 10],
                  'damage':{'dice': 1, 'type': 6, 'plus': 0}},
              {'type': 'long sword',
                  'thac0': [20, 19, 18, 17, 15, 14, 12, 11, 10, 9],
                  'damage':{'dice': 1, 'type': 8, 'plus': 0}},
              {'type': 'great sword',
                  'thac0': [18, 17, 17, 16, 15, 14, 12, 10, 9, 8],
                  'damage':{'dice': 1, 'type': 10, 'plus': 2}} ],
          armor: [
              {'type':'Leather armor', 'ac':8},
              {'type':'Ring mail', 'ac':7},
              {'type':'Scale mail', 'ac':6},
              {'type':'Chain mail', 'ac':5},
              {'type':'Splint mail', 'ac':4},
              {'type':'Plate mail', 'ac':3},
              {'type':'Field plate mail', 'ac':2},
              {'type':'Full plate', 'ac':1} ],

          getGenerator: function() {
              if (generator === undefined) {
                  generator = { 'score':'Balanced',
                      'str': {'dice': 2, 'type': 6, 'plus': 6},
                      'dex': {'dice': 2, 'type': 6, 'plus': 6},
                      'con': {'dice': 2, 'type': 6, 'plus': 6}
                  };
              }
              return generator;
          },

          setGenerator: function(gen) {
              generator = gen;
              return Settings;
          },

          resetGenerator: function() {
              generator = { 'score':'Balanced',
                  'str': {'dice': 2, 'type': 6, 'plus': 6},
                  'dex': {'dice': 2, 'type': 6, 'plus': 6},
                  'con': {'dice': 2, 'type': 6, 'plus': 6}
              };
              return generator;
          },

          getEquipment: function() {
              if (equipment === undefined) {
                  equipment = {'type':'Balanced',
                      'weapontypeodds': [1, 2, 2, 2, 1],
                      'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
                  };
              }
              return equipment;
          },

          setEquipment: function(equip) {
              equipment = equip;
              return Settings;
          },

          resetEquipment: function() {
              equipment = {'type':'Balanced',
                  'weapontypeodds': [1, 2, 2, 2, 1],
                  'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
              };
              return equipment;
          },

          getBalanced: function () {
              return [
                  { 'score':'Balanced',
                      'str': {'dice': 2, 'type': 6, 'plus': 6},
                      'dex': {'dice': 2, 'type': 6, 'plus': 6},
                      'con': {'dice': 2, 'type': 6, 'plus': 6}
                  },
                  {'type':'Balanced',
                      'weapontypeodds': [1, 2, 2, 2, 1],
                      'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
                  }
              ];
          },

          generateSoldier: function (gener, equipm) {
              var i, j, k, totWeap, totArmor, soldier;

              soldier = {
                  'weapon': {}, 'armor': {}, 'scores': [10,10,10], 'hp': 0, 'maxHp': 0, 'damage': {'dice': 1, 'type': 2, 'plus': 0}, 'ac': 10,
                  'thac0': [20, 20, 20, 20, 20, 20, 20, 20, 20, 20], 'mine':'true'
              };

              // assign a weapon
              totWeap = 0;
              for (i in equipm.weapontypeodds) {totWeap += equipm.weapontypeodds[i];}
              i = Math.floor(Math.random() * (totWeap));
              totWeap = 0; k=0;
              for (j in equipm.weapontypeodds) {
                  totWeap += equipm.weapontypeodds[j];
                  if (i < totWeap) {break;}
                  k++;
              }
              soldier.weapon = this.weapons[k];

              // assign armor
              totArmor = 0;
              for (i in equipm.armortypeodds) {totArmor += equipm.armortypeodds[i];}
              i = Math.floor(Math.random() * (totArmor));
              totArmor = 0; k=0;
              for (j in equipm.armortypeodds) {
                  totArmor += equipm.armortypeodds[j];
                  if (i < totArmor) {break;}
                  k++;
              }
              soldier.armor = this.armor[k];

              // assign scores
              // str
              k = 0;
              for (i=0; i<gener.str.dice; i++) {
                  k += Math.floor(Math.random() * gener.str.type + 1);
              }
              k += gener.str.plus;
              soldier.scores[0] = k;
              // dex
              k = 0;
              for (i=0; i<gener.dex.dice; i++) {
                  k += Math.floor(Math.random() * gener.dex.type + 1);
              }
              k += gener.dex.plus;
              soldier.scores[1] = k;
              // con
              k = 0;
              for (i=0; i<gener.con.dice; i++) {
                  k += Math.floor(Math.random() * gener.con.type + 1);
              }
              k += gener.con.plus;
              soldier.scores[2] = k;

              // using weapon, armor and scores we can now set ac, hp,damage
              // first AC
              soldier.ac = soldier.armor.ac;
              if (soldier.scores[1] > 14) {
                  soldier.ac -= soldier.scores[1] - 14;
              } else if (soldier.scores[1] < 7) {
                  soldier.ac -= soldier.scores[1] - 7;
              }
              // hp
              soldier.hp = Math.floor(Math.random() * 10 + 1);
              if (soldier.scores[2] > 14) {
                  soldier.hp += soldier.scores[2] - 14;
              } else if (soldier.scores[2] < 7) {
                  soldier.hp += soldier.scores[2] - 7;
              }
              if (soldier.hp < 1) {soldier.hp = 1;}
              soldier.maxHp = soldier.hp;

              // damage
              soldier.damage = soldier.weapon.damage;
              if (soldier.scores[0] > 14) {
                  soldier.damage += ' + ' + (soldier.scores[0] - 14);
              } else if (soldier.scores[2] < 7) {
                  soldier.damage += ' - ' + (7 - soldier.scores[0]);
              }

              // thac0
              for (i=0; i<11; i++) {
                  soldier.thac0[i] = soldier.weapon.thac0[i];
              }
              k = 0;
              if (soldier.scores[0] > 15) {
                  k = soldier.scores[0] - 15;
              } else if (soldier.scores[0] < 6) {
                  k = soldier.scores[0] - 6;
              }
              if (soldier.scores[1] > 15) {
                  k += soldier.scores[1] - 15;
              } else if (soldier.scores[1] < 6) {
                  k += soldier.scores[1] - 6;
              }
              for (i=0; i<11; i++) {
                  if (soldier.thac0[i] === 20) {
                      if (soldier.thac0[i+1] === 20) {
                          continue;
                      }
                  }
                  soldier.thac0[i] -= k;
                  if (soldier.thac0[i] > 20) {
                      soldier.thac0[i] = 20;
                  } else if (soldier.thac0[i] < 1) {
                      soldier.thac0[i] = 1;
                  }
              }
              return soldier;
          }
      };

  });
