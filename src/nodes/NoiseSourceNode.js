import {wrap} from '../js-source-utils'
import audioConfig from '../audioConfig'

export default class NoiseSourceNode {
  constructor(context) {
    this.context = context
    this.node = context.createScriptProcessor(audioConfig.bufferSize, 0, 2)
    this.node.onaudioprocess = audioProcessingEvent => {
      for (let channel = 0; channel < 2; channel++) {
        const data = audioProcessingEvent.outputBuffer.getChannelData(channel)
        for (let i = 0; i < data.length; i++) {
          data[i] = 2 * Math.random() - 1
        }
      }
    }

    wrap(this, this.node)
  }
}
