import {wrap} from '../js-source-utils'

export default class BinauralSourceNode {
  constructor(context) {
    this.context = context
    this.constant = context.createConstantSource()
    this.audibleFrequencyNode = context.createGain()
    this.beatFrequencyNode = context.createGain()

    this.half = context.createGain()
    this.half.gain.value = 0.5

    this.inverseHalf = context.createGain()
    this.inverseHalf.gain.value = -0.5

    this.left = context.createOscillator()
    this.left.frequency.value = 0.0
    this.right = context.createOscillator()
    this.right.frequency.value = 0.0
    this.merge = context.createChannelMerger(2)

    this.constant.connect(this.audibleFrequencyNode)
    this.constant.connect(this.beatFrequencyNode)
    this.beatFrequencyNode.connect(this.half)
    this.beatFrequencyNode.connect(this.inverseHalf)

    this.audibleFrequencyNode.connect(this.left.frequency)
    this.audibleFrequencyNode.connect(this.right.frequency)
    this.inverseHalf.connect(this.left.frequency)
    this.half.connect(this.right.frequency)

    this.left.connect(this.merge, 0, 0)
    this.right.connect(this.merge, 0, 1)

    wrap(this, this.merge)
  }

  get type() {
    return this.left.type
  }

  set type(v) {
    this.left.type = v
    this.right.type = v
  }

  get audibleFrequency() {
    return this.audibleFrequencyNode.gain
  }

  get beatFrequency() {
    return this.beatFrequencyNode.gain
  }

  start(...args) {
    this.constant.start(...args)
    this.left.start(...args)
    this.right.start(...args)
  }

  stop(...args) {
    this.constant.stop(...args)
    this.left.stop(...args)
    this.right.stop(...args)
  }

  setPeriodicWave(periodicWave) {
    this.left.setPeriodicWave(periodicWave)
    this.right.setPeriodicWave(periodicWave)
  }
}
