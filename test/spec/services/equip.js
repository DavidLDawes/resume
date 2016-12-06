'use strict';

describe('Service: equip', function () {

  // load the service's module
  beforeEach(module('resumeApp'));

  // instantiate service
  var equip;
  beforeEach(inject(function (_equip_) {
    equip = _equip_;
  }));

  it('should do something', function () {
    expect(!!equip).toBe(true);
  });

});
