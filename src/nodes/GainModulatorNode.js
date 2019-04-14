import audioConfig from '../audioConfig'

function createProcessor(sampleRate) {
  let samples = 0
  return (audioProcessingEvent) => {
    const frequencyValues = audioProcessingEvent.inputBuffer.getChannelData(0)
    const phaseValues = audioProcessingEvent.inputBuffer.getChannelData(1)
    const leftGainValues = audioProcessingEvent.outputBuffer.getChannelData(0)
    const rightGainValues = audioProcessingEvent.outputBuffer.getChannelData(1)

    let periodInSamples;
    for(let i = 0; i < frequencyValues.length; i++) {
      periodInSamples = sampleRate / frequencyValues[i]
      leftGainValues[i] = -0.5 + 3 / (4 + 2 * Math.sin((samples + i) * 2 * Math.PI / periodInSamples - phaseValues[i]))
      rightGainValues[i] = -0.5 + 3 / (4 + 2 * Math.sin((samples + i) * 2 * Math.PI / periodInSamples + phaseValues[i]))
    }
    if (Number.isFinite(periodInSamples) && !Number.isNaN(periodInSamples)) {
      const mod = Math.floor(periodInSamples)
      if (mod != 0) {
        samples = (samples + frequencyValues.length) % mod
      }
    }
  }
}

export default function GainModulatorNode(context) {
  const result = context.createChannelSplitter(2)

  const leftGain = context.createGain()
  leftGain.gain.value = 0.0
  result.connect(leftGain, 0)
  const rightGain = context.createGain()
  rightGain.gain.value = 0.0
  result.connect(rightGain, 1)

  const constant = context.createConstantSource()
  const phaseNode = context.createGain()
  constant.connect(phaseNode)
  result.phase = phaseNode.gain

  const frequencyNode = context.createGain()
  constant.connect(frequencyNode)
  result.frequency = frequencyNode.gain

  const scriptInputMerge = context.createChannelMerger(2)
  frequencyNode.connect(scriptInputMerge, 0, 0)
  phaseNode.connect(scriptInputMerge, 0, 1)

  const script = context.createScriptProcessor(audioConfig.bufferSize, 2, 2)
  script.onaudioprocess = createProcessor(context.sampleRate)
  scriptInputMerge.connect(script)

  const scriptOutputSplit = context.createChannelSplitter(2)
  script.connect(scriptOutputSplit)

  scriptOutputSplit.connect(leftGain.gain, 0)
  scriptOutputSplit.connect(rightGain.gain, 1)

  const outputMerge = context.createChannelMerger(2)
  leftGain.connect(outputMerge, 0, 0)
  rightGain.connect(outputMerge, 0, 1)

  // store these to avoid some chrome bugs with garbage collection of live nodes
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

  result.connect = outputMerge.connect.bind(outputMerge)
  result.disconnect = outputMerge.connect.bind(outputMerge)

  constant.start()

  return result
}
