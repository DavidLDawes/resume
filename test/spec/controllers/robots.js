'use strict';

describe('Controller: RobotsCtrl', function () {

  // load the controller's module
  beforeEach(module('resumeApp'));

  var RobotsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RobotsCtrl = $controller('RobotsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RobotsCtrl.awesomeThings.length).toBe(3);
  });
});
