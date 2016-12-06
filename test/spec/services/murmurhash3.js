'use strict';

describe('Service: murmurhash3', function () {

  // load the service's module
  beforeEach(module('resumeApp'));

  // instantiate service
  var murmurhash3;
  beforeEach(inject(function (_murmurhash3_) {
    murmurhash3 = _murmurhash3_;
  }));

  it('should do something', function () {
    expect(!!murmurhash3).toBe(true);
  });

});
