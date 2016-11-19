'use strict';

describe('Service: drawstars', function () {

  // load the service's module
  beforeEach(module('resumeApp'));

  // instantiate service
  var drawstars;
  beforeEach(inject(function (_drawstars_) {
    drawstars = _drawstars_;
  }));

  it('should do something', function () {
    expect(!!drawstars).toBe(true);
  });

});
