jsSourceUtils = require './js-source-utils'
audioConfig = require './audioConfig'

class ConstantSourceNode
  constructor: (@context, value) ->
    buffer = @context.createBuffer 1, audioConfig.bufferSize, @context.sampleRate
    data = buffer.getChannelData 0

    if data.fill
      data.fill 1.0
    else
      data[i] = value for i in [0...data.length]

    @node = @context.createBufferSource()
    @node.buffer = buffer
    @node.loop = true

    jsSourceUtils.wrap this, @node
    @start = @node.start.bind @node
    @stop = @node.stop.bind @node

module.exports = ConstantSourceNode
