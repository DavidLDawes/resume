'use strict';

describe('Controller: CatermsCtrl', function () {

  // load the controller's module
  beforeEach(module('resumeApp'));

  var CatermsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CatermsCtrl = $controller('CatermsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CatermsCtrl.awesomeThings.length).toBe(3);
  });
});
