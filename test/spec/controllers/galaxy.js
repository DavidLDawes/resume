'use strict';

describe('Controller: GalaxyCtrl', function () {

  // load the controller's module
  beforeEach(module('resumeApp'));

  var GalaxyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GalaxyCtrl = $controller('GalaxyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GalaxyCtrl.awesomeThings.length).toBe(3);
  });
});
