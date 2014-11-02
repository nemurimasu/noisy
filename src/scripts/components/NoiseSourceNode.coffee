jsSourceUtils = require './js-source-utils'
audioConfig = require './audioConfig'

class NoiseSourceNode
  constructor: (@context) ->
    @node = @context.createScriptProcessor audioConfig.bufferSize, 0, 2
    @node.onaudioprocess = (audioProcessingEvent) ->
      for channel in [0..1]
        data = audioProcessingEvent.outputBuffer.getChannelData channel
        data[i] = 2 * Math.random() - 1 for i in [0...data.length]
      # suppress return value generation
      undefined

    jsSourceUtils.wrap this, @node

module.exports = NoiseSourceNode
