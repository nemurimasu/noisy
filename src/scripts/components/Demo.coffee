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

# in Chrome 39, you must store a reference to this object or the modulators will
# get garbage collected and stop modulating. This does not happen in when using
# webpack-dev-server because the module hot swapping code will hold a reference
# to the current player object to prevent collection.
window.player = player
