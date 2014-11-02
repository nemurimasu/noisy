Modernizr = require 'Modernizr'

AudioContext = Modernizr.prefixed 'AudioContext', window
context = new AudioContext()

SelfHypnosis2 = require './SelfHypnosis2'
player = new SelfHypnosis2 context

if module.hot
  module.hot.accept './SelfHypnosis2', ->
    player.stop()
    SelfHypnosis2 = require './SelfHypnosis2'
    player = new SelfHypnosis2 context
    player.play()

  module.hot.accept()

  module.hot.dispose (data) ->
    player.stop()
    data.time = player.time

  if module.hot.data
    player.time = module.hot.data.time

player.play()
