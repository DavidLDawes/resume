'use strict';

describe('Service: tower', function () {

  // load the service's module
  beforeEach(module('resumeApp'));

  // instantiate service
  var tower;
  beforeEach(inject(function (_tower_) {
    tower = _tower_;
  }));

  it('should do something', function () {
    expect(!!tower).toBe(true);
  });

});
