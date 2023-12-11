import Anime from './lib/Anime'

import spriteUrl from './sprite.png'

class Game {
  readonly ctx: CanvasRenderingContext2D
  readonly pc: Anime
  readonly pc_jump: Anime

  dir: number
  state: number
  mush_size: number
  loaded?: boolean

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

    this.dir = 0
    this.mush_size = 2
    this.state = 0
    this.pc = new Anime(sprite, {
      topLeft: [0, 0],
      sz: [40, 32],
      frames: [0, 1, 0, 0, 0, 0, 2, 3, 4, 5, 4, 4, 3, 2],
    })
    this.pc_jump = new Anime(sprite, {
      topLeft: [240, 0],
      sz: [40, 32],
      frames: [0, 1, 2, 3, 4, 5],
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
        case 'ArrowUp':
          this.mush_size = this.mush_size < 2 ? this.mush_size + 1 : 2
          break
        case 'ArrowDown':
          this.mush_size = this.mush_size >= 0 ? this.mush_size - 1 : 0
          break
        case 'Space':
          if (this.state === 0) {
            this.state = 1
          }
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
        case 'Space':
          if (this.state === 1) {
            this.state = 2
          }
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

    switch (this.state) {
      case 0:
      case 1:
        this.pc.draw(this.ctx, [140, 128], 2, 0, 0)
        this.pc.draw(this.ctx, [140 + this.dir, 128], 2, 0, 1)
        if (this.mush_size > 0) {
          this.pc.draw(this.ctx, [140, 128], 2, 0, this.mush_size + 1)
        }
        break
      case 2: {
        const y = [0, -8, -12, -16, -12, -8, 0][this.pc_jump.frame]
        this.pc_jump.draw(this.ctx, [140, 128 + y], 2, 0, 0)
        this.pc_jump.draw(this.ctx, [140, 128 + y], 2, 0, 1)
        if (this.mush_size > 0) {
          this.pc_jump.draw(this.ctx, [140, 128 + y], 2, 0, this.mush_size + 1)
        }
        break
      }
    }
    switch (this.state) {
      case 0:
        this.pc.tick()
        break
      case 1:
        this.pc.tick(10)
        this.pc_jump.tick(0)
        break
      case 2:
        if (this.pc_jump.tick() === 0) {
          this.state = 0
        }
        break
    }
  }
}

export default Game
