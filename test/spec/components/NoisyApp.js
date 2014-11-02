'use strict';

describe('Main', function () {
  var Demo, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    Demo = require('../../../src/scripts/components/Demo.coffee');
    component = Demo();
  });

  it('should create a new instance of Demo', function () {
    expect(component).toBeDefined();
  });
});
