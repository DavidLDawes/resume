'use strict';

describe('Service: cardsprites', function () {

  // load the service's module
  beforeEach(module('resumeApp'));

  // instantiate service
  var cardsprites;
  beforeEach(inject(function (_cardsprites_) {
    cardsprites = _cardsprites_;
  }));

  it('should do something', function () {
    expect(!!cardsprites).toBe(true);
  });

});
