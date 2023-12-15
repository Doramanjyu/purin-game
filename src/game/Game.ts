import Sprite from './lib/Sprite'
import { Frame, Root } from './lib/coords'

import Purin from './Purin'

import spriteUrl from './sprite.png'

class Game {
  readonly ctx: CanvasRenderingContext2D
  readonly bg: Sprite
  readonly purin: Purin
  readonly origin: Frame
  readonly viewpoint: Frame

  loaded?: boolean

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = false

    this.origin = new Frame('origin', Root)
    this.viewpoint = new Frame('viewpoint', this.origin, [-115, -128])

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

    this.purin = new Purin(sprite, this.origin)
    this.bg = new Sprite(sprite, {
      topLeft: [0, 128],
      sz: [300, 200],
    })
  }

  start() {
    const tickTimer = setInterval(this.tick.bind(this), 50)

    const keydown = (e: KeyboardEvent) => {
      e.preventDefault()
      switch (e.code) {
        case 'ArrowLeft':
          this.purin.direct(-3)
          this.purin.frame.pos[0] -= 3
          break
        case 'ArrowRight':
          this.purin.direct(3)
          this.purin.frame.pos[0] += 3
          break
        case 'ArrowUp':
          this.purin.mush((s) => s + 1)
          break
        case 'ArrowDown':
          this.purin.mush((s) => s - 1)
          break
        case 'Space':
          this.purin.crouch()
          break
      }
    }
    const keyup = (e: KeyboardEvent) => {
      e.preventDefault()
      switch (e.code) {
        case 'ArrowLeft':
        case 'ArrowRight':
          this.purin.direct(0)
          break
        case 'Space':
          this.purin.jump()
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
    this.ctx.fillRect(0, 0, 800, 600)

    if (!this.loaded) {
      return
    }

    this.bg.draw(this.ctx, [-30, 0], 3, 0, 0)
    this.purin.draw(this.ctx, this.viewpoint, 3)
    this.bg.draw(this.ctx, [-30, 0], 3, 0, 1)

    this.purin.tick()
  }
}

export default Game
