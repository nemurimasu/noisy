const context = new AudioContext()

const button = document.getElementById('play')
let time = 0
let player
button.addEventListener('click', e => {
  if (player) {
    player.stop()
    time = player.time
    player = null
  } else {
    player = new noisy.presets.SelfHypnosis2(context)
    player.time = time
    player.play()
  }
  e.preventDefault()
  e.stopPropagation()
})
