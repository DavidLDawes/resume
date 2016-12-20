'use strict';

describe('Controller: HeadcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('resumeApp'));

  var HeadcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeadcontrollerCtrl = $controller('HeadcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HeadcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
