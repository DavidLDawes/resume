'use strict';

describe('Controller: TowerdefenseCtrl', function () {

  // load the controller's module
  beforeEach(module('resumeApp'));

  var TowerdefenseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TowerdefenseCtrl = $controller('TowerdefenseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TowerdefenseCtrl.awesomeThings.length).toBe(3);
  });
});
