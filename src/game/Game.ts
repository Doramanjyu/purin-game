import Anime from './lib/Anime'

import spriteUrl from './sprite.png'

class Game {
  readonly ctx: CanvasRenderingContext2D
  readonly pc: Anime

  dir: number
  loaded?: boolean
  cnt: number

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = false

    const sprite = new Image()
    sprite.addEventListener(
      'load',
      () => {
        this.loaded = true
      },
      {
        capture: false,
        once: true,
      },
    )
    sprite.src = spriteUrl

    this.cnt = 0
    this.dir = 0
    this.pc = new Anime(sprite, {
      topLeft: [0, 0],
      sz: [40, 32],
      frames: [0, 1, 0, 0, 0, 0, 2, 3, 4, 5, 4, 4, 3, 2],
    })
  }

  start() {
    const tickTimer = setInterval(this.tick.bind(this), 50)

    const keydown = (e: KeyboardEvent) => {
      e.preventDefault()
      switch (e.code) {
        case 'ArrowLeft':
          this.dir = -3
          break
        case 'ArrowRight':
          this.dir = 3
          break
      }
    }
    const keyup = (e: KeyboardEvent) => {
      e.preventDefault()
      switch (e.code) {
        case 'ArrowLeft':
          this.dir = 0
          break
        case 'ArrowRight':
          this.dir = 0
          break
      }
    }
    document.addEventListener('keydown', keydown)
    document.addEventListener('keyup', keyup)

    return () => {
      clearInterval(tickTimer)
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('keyup', keyup)
    }
  }

  tick() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, 640, 480)

    if (!this.loaded) {
      return
    }

    this.cnt++
    const mushPat = [0, 1, 2, 1]
    const mushSize = mushPat[Math.floor(this.cnt / 50) % 4]

    this.pc.tick()
    this.pc.draw(this.ctx, [140, 128], 2, 0, 0)
    this.pc.draw(this.ctx, [140 + this.dir, 128], 2, 0, 1)
    if (mushSize > 0) {
      this.pc.draw(this.ctx, [140, 128], 2, 0, mushSize + 1)
    }
  }
}

export default Game
