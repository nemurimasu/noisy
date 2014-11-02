'use strict';

describe('Main', function () {
  var NoisyApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    NoisyApp = require('../../../src/scripts/components/NoisyApp.coffee');
    component = NoisyApp();
  });

  it('should create a new instance of NoisyApp', function () {
    expect(component).toBeDefined();
  });
});
