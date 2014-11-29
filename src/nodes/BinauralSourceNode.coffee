jsSourceUtils = require '../js-source-utils'
ConstantSourceNode = require './ConstantSourceNode'
audioConfig = require '../audioConfig'

class BinauralSourceNode
  constructor: (@context) ->
    @constant = new ConstantSourceNode @context, 1.0
    @audibleFrequencyNode = @context.createGain()
    @beatFrequencyNode = @context.createGain()

    @half = @context.createGain()
    @half.gain.value = 0.5

    @inverseHalf = @context.createGain()
    @inverseHalf.gain.value = -0.5

    @left = @context.createOscillator()
    @left.frequency.value = 0.0
    @right = @context.createOscillator()
    @right.frequency.value = 0.0
    @merge = @context.createChannelMerger 2

    @constant.connect @audibleFrequencyNode
    @constant.connect @beatFrequencyNode
    @beatFrequencyNode.connect @half
    @beatFrequencyNode.connect @inverseHalf

    @audibleFrequencyNode.connect @left.frequency
    @audibleFrequencyNode.connect @right.frequency
    @inverseHalf.connect @left.frequency
    @half.connect @right.frequency

    @left.connect @merge, 0, 0
    @right.connect @merge, 0, 1

    jsSourceUtils.wrap this, @merge

    Object.defineProperty this, 'type',
      get: =>
        @left.type
      set: (v) =>
        @left.type = v
        @right.type = v

    Object.defineProperty this, 'audibleFrequency',
      get: =>
        @audibleFrequencyNode.gain

    Object.defineProperty this, 'beatFrequency',
      get: =>
        @beatFrequencyNode.gain

  start: (args...) ->
    @constant.start args...
    @left.start args...
    @right.start args...

  stop: (args...) ->
    @constant.stop args...
    @left.stop args...
    @right.stop args...

  setPeriodicWave: (periodicWave) ->
    @left.setPeriodicWave periodicWave
    @right.setPeriodicWave periodicWave

module.exports = BinauralSourceNode
