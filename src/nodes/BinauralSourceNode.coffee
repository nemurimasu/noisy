jsSourceUtils = require '../js-source-utils'
ConstantSourceNode = require './ConstantSourceNode'
audioConfig = require '../audioConfig'

process = (audioProcessingEvent) ->
  audibleFrequencyValues = audioProcessingEvent.inputBuffer.getChannelData 0
  beatFrequencyValues = audioProcessingEvent.inputBuffer.getChannelData 1
  leftFrequencyValues = audioProcessingEvent.outputBuffer.getChannelData 0
  rightFrequencyValues = audioProcessingEvent.outputBuffer.getChannelData 1

  for i in [0..audibleFrequencyValues.length]
    beatHalf = 0.5 * beatFrequencyValues[i]
    leftFrequencyValues[i] = audibleFrequencyValues[i] - beatHalf
    rightFrequencyValues[i] = audibleFrequencyValues[i] + beatHalf
  # supress useless return value array generation
  undefined

class BinauralSourceNode
  constructor: (@context) ->
    @constant = new ConstantSourceNode @context, 1.0
    @audibleFrequencyNode = @context.createGain()
    @beatFrequencyNode = @context.createGain()
    @inputMerge = @context.createChannelMerger 2

    @script = @context.createScriptProcessor audioConfig.bufferSize, 2, 2
    @script.onaudioprocess = process

    @split = @context.createChannelSplitter 2
    @left = @context.createOscillator()
    @left.frequency.value = 0.0
    @right = @context.createOscillator()
    @right.frequency.value = 0.0
    @merge = @context.createChannelMerger 2

    @constant.connect @audibleFrequencyNode
    @constant.connect @beatFrequencyNode
    @audibleFrequencyNode.connect @inputMerge, 0, 0
    @beatFrequencyNode.connect @inputMerge, 0, 1
    @inputMerge.connect @script

    @script.connect @split

    @split.connect @left.frequency, 0
    @split.connect @right.frequency, 1
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
