'use strict';

describe('Service: randomseed', function () {

  // load the service's module
  beforeEach(module('resumeApp'));

  // instantiate service
  var randomseed;
  beforeEach(inject(function (_randomseed_) {
    randomseed = _randomseed_;
  }));

  it('should do something', function () {
    expect(!!randomseed).toBe(true);
  });

});
