import NoiseSourceNode from '../nodes/NoiseSourceNode'
import BinauralSourceNode from '../nodes/BinauralSourceNode'
import GainModulatorNode from '../nodes/GainModulatorNode'

export default class SelfHypnosis2 {
  constructor(context) {
    this.context = context
    this.time = 0
    this.startClock = 0
    this.volume = 0.125

    this.gain = context.createGain()
    this.gain.gain.value = this.volume

    this.binaural = new BinauralSourceNode(context)
    this.binaural.audibleFrequency.value = 440
    this.gainModulator = new GainModulatorNode(context)
    this.gainModulator.phase.value = 0.0
    this.phaseWobble = context.createOscillator()
    this.phaseWobble.frequency.value = 8.0 / (15.0 * 60.0)
    this.phaseWobbleGain = context.createGain()
    this.phaseWobbleGain.gain.value = Math.PI

    this.noise = new NoiseSourceNode(context)
    this.noiseGainModulator = new GainModulatorNode(context)
    this.noiseGainModulator.phase.value = Math.PI / 6
    this.noiseGain = context.createGain()
    this.noiseGain.gain.value = 0.5

    this.binaural2 = new BinauralSourceNode(context)
    this.binaural2.audibleFrequency.value = 100
    this.binaural2.beatFrequency.value = 7
    this.binaural2Gain = context.createGain()
    this.binaural2Gain.gain.value = 0.8

    this.binaural3 = new BinauralSourceNode(context)
    this.binaural3.audibleFrequency.value = 800
    this.binaural3.beatFrequency.value = 13
    this.binaural3GainModulator = new GainModulatorNode(context)
    this.binaural3GainModulator.frequency.value = 1.0
    this.binaural3GainModulator.phase.value = Math.PI
    this.binaural3Gain = context.createGain()
    this.binaural3Gain.gain.value = 0.8

    this.binaural4 = new BinauralSourceNode(context)
    this.binaural4.audibleFrequency.value = 440
    this.binaural4.beatFrequency.value = 10
    this.binaural4Gain = context.createGain()
    this.binaural4Gain.gain.value = 0.25
  }

  play() {
    this.startClock = this.context.currentTime
    const startTime = this.startClock - this.time

    this.binaural.beatFrequency.cancelScheduledValues(startTime)
    this.binaural.beatFrequency.setValueAtTime(12, startTime)
    this.binaural.beatFrequency.linearRampToValueAtTime(8, startTime + 15 * 60)

    this.gainModulator.frequency.cancelScheduledValues(startTime)
    this.gainModulator.frequency.setValueAtTime(5, startTime)
    this.gainModulator.frequency.linearRampToValueAtTime(2.5, startTime + 15 * 60)

    this.noiseGainModulator.frequency.cancelScheduledValues(startTime)
    this.noiseGainModulator.frequency.setValueAtTime(1, startTime)
    this.noiseGainModulator.frequency.linearRampToValueAtTime(2.0 / 3.0, startTime + 15 * 60)

    this.gain.connect(this.context.destination)
    this.gainModulator.connect(this.gain)
    this.phaseWobbleGain.connect(this.gainModulator.phase)
    this.phaseWobble.connect(this.phaseWobbleGain)
    this.binaural.connect(this.gainModulator)

    this.noiseGain.connect(this.gain)
    this.noiseGainModulator.connect(this.noiseGain)
    this.noise.connect(this.noiseGainModulator)

    this.binaural2Gain.connect(this.gain)
    this.binaural2.connect(this.binaural2Gain)

    this.binaural3Gain.connect(this.gain)
    this.binaural3GainModulator.connect(this.binaural3Gain)
    this.binaural3.connect(this.binaural3GainModulator)

    this.binaural4Gain.connect(this.gain)
    this.binaural4.connect(this.binaural4Gain)

    this.binaural.start()
    this.phaseWobble.start()
    this.binaural2.start()
    this.binaural3.start()
    this.binaural4.start()
  }

  stop() {
    this.time = this.context.currentTime - this.startClock

    this.binaural.stop()
    this.phaseWobble.stop()
    this.binaural2.stop()
    this.binaural3.stop()
    this.binaural4.stop()

    this.gain.disconnect(this.context.destination)
    this.gainModulator.disconnect(this.gain)
    this.phaseWobbleGain.disconnect(this.gainModulator.phase)
    this.phaseWobble.disconnect(this.phaseWobbleGain)
    this.binaural.disconnect(this.gainModulator)

    this.noiseGain.disconnect(this.gain)
    this.noiseGainModulator.disconnect(this.noiseGain)
    this.noise.disconnect(this.noiseGainModulator)

    this.binaural2Gain.disconnect(this.gain)
    this.binaural2.disconnect(this.binaural2Gain)

    this.binaural3Gain.disconnect(this.gain)
    this.binaural3GainModulator.disconnect(this.binaural3Gain)
    this.binaural3.disconnect(this.binaural3GainModulator)

    this.binaural4Gain.disconnect(this.gain)
    this.binaural4.disconnect(this.binaural4Gain)
  }
}
