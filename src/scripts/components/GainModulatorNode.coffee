ConstantSourceNode = require './ConstantSourceNode'
audioConfig = require './audioConfig'

Processor = (sampleRate) ->
  samples = 0
  (audioProcessingEvent) ->
    frequencyValues = audioProcessingEvent.inputBuffer.getChannelData 0
    phaseValues = audioProcessingEvent.inputBuffer.getChannelData 1
    leftGainValues = audioProcessingEvent.outputBuffer.getChannelData 0
    rightGainValues = audioProcessingEvent.outputBuffer.getChannelData 1

    for i in [0...frequencyValues.length]
      periodInSamples = sampleRate / frequencyValues[i]
      leftGainValues[i] = -0.5 + 3 / (4 + 2 * Math.sin (samples + i) * 2 *
        Math.PI / periodInSamples - phaseValues[i])
      rightGainValues[i] = -0.5 + 3 / (4 + 2 * Math.sin (samples + i) * 2 *
        Math.PI / periodInSamples + phaseValues[i])
    if (Number.isFinite periodInSamples) and not (Number.isNaN periodInSamples)
      mod = Math.floor periodInSamples
      samples = (samples + frequencyValues.length) % mod if mod isnt 0

GainModulatorNode = (context) ->
  result = context.createChannelSplitter 2

  leftGain = context.createGain()
  leftGain.gain.value = 0.0
  result.connect leftGain, 0
  rightGain = context.createGain()
  rightGain.gain.value = 0.0
  result.connect rightGain, 1

  constant = new ConstantSourceNode context, 1.0
  phaseNode = context.createGain()
  constant.connect phaseNode
  result.phase = phaseNode.gain

  frequencyNode = context.createGain()
  constant.connect frequencyNode
  result.frequency = frequencyNode.gain

  scriptInputMerge = context.createChannelMerger 2
  frequencyNode.connect scriptInputMerge, 0, 0
  phaseNode.connect scriptInputMerge, 0, 1

  script = context.createScriptProcessor audioConfig.bufferSize, 2, 2
  script.onaudioprocess = new Processor context.sampleRate
  scriptInputMerge.connect script

  scriptOutputSplit = context.createChannelSplitter 2
  script.connect scriptOutputSplit

  scriptOutputSplit.connect leftGain.gain, 0
  scriptOutputSplit.connect rightGain.gain, 1

  outputMerge = context.createChannelMerger 2
  leftGain.connect outputMerge, 0, 0
  rightGain.connect outputMerge, 0, 1

  # store these to avoid some chrome bugs with garbage collection of live nodes
  result._gmn = [
    leftGain,
    rightGain,
    constant,
    phaseNode,
    frequencyNode,
    scriptInputMerge,
    script,
    scriptOutputSplit,
    outputMerge
  ]

  result.connect = outputMerge.connect.bind outputMerge

  constant.start()

  result

module.exports = GainModulatorNode
