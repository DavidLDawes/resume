'use strict';

describe('Service: canvastower', function () {

  // load the service's module
  beforeEach(module('resumeApp'));

  // instantiate service
  var canvastower;
  beforeEach(inject(function (_canvastower_) {
    canvastower = _canvastower_;
  }));

  it('should do something', function () {
    expect(!!canvastower).toBe(true);
  });

});
