NoiseSourceNode = require '../nodes/NoiseSourceNode'
BinauralSourceNode = require '../nodes/BinauralSourceNode'
GainModulatorNode = require '../nodes/GainModulatorNode'

class SelfHypnosis2
  constructor: (@context) ->
    @time = 0
    @startClock = 0
    @volume = 0.125

    @gain = @context.createGain()
    @gain.gain.value = @volume

    @binaural = new BinauralSourceNode @context
    @binaural.audibleFrequency.value = 440
    @gainModulator = new GainModulatorNode @context
    @gainModulator.phase.value = 0.0
    @phaseWobble = @context.createOscillator()
    @phaseWobble.frequency.value = 8.0 / (15.0 * 60.0)
    @phaseWobbleGain = @context.createGain()
    @phaseWobbleGain.gain.value = Math.PI

    @noise = new NoiseSourceNode @context
    @noiseGainModulator = new GainModulatorNode @context
    @noiseGainModulator.phase.value = Math.PI / 6
    @noiseGain = @context.createGain()
    @noiseGain.gain.value = 0.5

    @binaural2 = new BinauralSourceNode @context
    @binaural2.audibleFrequency.value = 100
    @binaural2.beatFrequency.value = 7
    @binaural2Gain = @context.createGain()
    @binaural2Gain.gain.value = 0.8

    @binaural3 = new BinauralSourceNode @context
    @binaural3.audibleFrequency.value = 800
    @binaural3.beatFrequency.value = 13
    @binaural3GainModulator = new GainModulatorNode @context
    @binaural3GainModulator.frequency.value = 1.0
    @binaural3GainModulator.phase.value = Math.PI
    @binaural3Gain = @context.createGain()
    @binaural3Gain.gain.value = 0.8

    @binaural4 = new BinauralSourceNode @context
    @binaural4.audibleFrequency.value = 440
    @binaural4.beatFrequency.value = 10
    @binaural4Gain = @context.createGain()
    @binaural4Gain.gain.value = 0.25

  play: ->
    @startClock = @context.currentTime
    startTime = @startClock - @time

    @binaural.beatFrequency.cancelScheduledValues startTime
    @binaural.beatFrequency.setValueAtTime 12, startTime
    @binaural.beatFrequency.linearRampToValueAtTime 8, startTime + 15 * 60

    @gainModulator.frequency.cancelScheduledValues startTime
    @gainModulator.frequency.setValueAtTime 5, startTime
    @gainModulator.frequency.linearRampToValueAtTime 2.5, startTime + 15 * 60

    @noiseGainModulator.frequency.cancelScheduledValues startTime
    @noiseGainModulator.frequency.setValueAtTime 1, startTime
    @noiseGainModulator.frequency.linearRampToValueAtTime 2.0 / 3.0,
      startTime + 15 * 60

    @gain.connect @context.destination
    @gainModulator.connect @gain
    @phaseWobbleGain.connect @gainModulator.phase
    @phaseWobble.connect @phaseWobbleGain
    @binaural.connect @gainModulator

    @noiseGain.connect @gain
    @noiseGainModulator.connect @noiseGain
    @noise.connect @noiseGainModulator

    @binaural2Gain.connect @gain
    @binaural2.connect @binaural2Gain

    @binaural3Gain.connect @gain
    @binaural3GainModulator.connect @binaural3Gain
    @binaural3.connect @binaural3GainModulator

    @binaural4Gain.connect @gain
    @binaural4.connect @binaural4Gain

    @binaural.start()
    @phaseWobble.start()
    @binaural2.start()
    @binaural3.start()
    @binaural4.start()

  stop: ->
    @time = @context.currentTime - @startClock

    @binaural.stop()
    @phaseWobble.stop()
    @binaural2.stop()
    @binaural3.stop()
    @binaural4.stop()

    @gain.disconnect @context.destination
    @gainModulator.disconnect @gain
    @phaseWobbleGain.disconnect @gainModulator.phase
    @phaseWobble.disconnect @phaseWobbleGain
    @binaural.disconnect @gainModulator

    @noiseGain.disconnect @gain
    @noiseGainModulator.disconnect @noiseGain
    @noise.disconnect @noiseGainModulator

    @binaural2Gain.disconnect @gain
    @binaural2.disconnect @binaural2Gain

    @binaural3Gain.disconnect @gain
    @binaural3GainModulator.disconnect @binaural3Gain
    @binaural3.disconnect @binaural3GainModulator

    @binaural4Gain.disconnect @gain
    @binaural4.disconnect @binaural4Gain

module.exports = SelfHypnosis2
