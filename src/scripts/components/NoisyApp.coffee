React = require 'react/addons'
ReactTransitionGroup = React.addons.TransitionGroup

require '../../styles/normalize.css'
require '../../styles/main.css'

imageUrl = require '../../images/yeoman.png'

NoisyApp = React.createClass
  render: () ->
    React.DOM.div { className: 'main' },
      ReactTransitionGroup { transitionName: 'fade' },
        React.DOM.img { src: imageUrl }

React.renderComponent (NoisyApp null), document.getElementById 'content'

Modernizr = require 'Modernizr'

AudioContext = Modernizr.prefixed 'AudioContext', window
context = new AudioContext


Player = require './Player'
player = new Player context

if module.hot
  module.hot.accept './Player', () ->
    player.stop()
    Player = require './Player'
    player = new Player context
    player.play()

  module.hot.accept()

  module.hot.dispose (data) ->
    player.stop()
    data.time = player.time

  if module.hot.data
    player.time = module.hot.data.time

player.play()

module.exports = NoisyApp
