'use strict';

describe('Service: sector', function () {

  // load the service's module
  beforeEach(module('resumeApp'));

  // instantiate service
  var sector;
  beforeEach(inject(function (_sector_) {
    sector = _sector_;
  }));

  it('should do something', function () {
    expect(!!sector).toBe(true);
  });

});
