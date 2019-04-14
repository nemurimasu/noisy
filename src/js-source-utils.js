export function wrap(jsNode, nativeNode) {
  Object.defineProperty(jsNode, 'channelCount', {
    get: () => nativeNode.channelCount
  })
  Object.defineProperty(jsNode, 'channelCountMode', {
    get: () => nativeNode.channelCountMode,
    set: (v) => nativeNode.channelCountMode = v
  })
  Object.defineProperty(jsNode, 'channelInterpretation', {
    get: () => nativeNode.channelInterpretation,
    set: (v) => nativeNode.channelInterpretation = v
  })
  Object.defineProperty(jsNode, 'numberOfInputs', {
    get: () => 0
  })
  Object.defineProperty(jsNode, 'numberOfOutputs', {
    get: () => nativeNode.numberOfOutputs
  })

  jsNode.connect = nativeNode.connect.bind(nativeNode)
  jsNode.disconnect = nativeNode.disconnect.bind(nativeNode)
}
