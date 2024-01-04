import Sprite from './lib/Sprite'
import { Frame, Root } from './lib/coords'

import Purin from './Purin'
import Item from './Item'

import spriteUrl from './sprite.png'

class Game {
  readonly ctx: CanvasRenderingContext2D
  readonly bg: Sprite
  readonly title: Sprite
  readonly purin: Purin
  readonly item: Item
  readonly origin: Frame
  readonly viewpoint: Frame

  loaded?: boolean
  scale: number
  title_y: number
  cnt: number

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = false

    this.origin = new Frame('origin', Root)
    this.viewpoint = new Frame('viewpoint', this.origin, [-135, -160])
    this.scale = 3

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
    this.item = new Item(sprite, this.origin, [35, 0])
    this.bg = new Sprite(sprite, {
      topLeft: [0, 256],
      sz: [300, 200],
    })
    this.title = new Sprite(sprite, {
      topLeft: [0, 456],
      sz: [173, 64],
    })
    this.title_y = -48
    this.cnt = 0
  }

  start() {
    const tickTimer = setInterval(this.tick.bind(this), 50)

    const keydown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'F5':
        case 'F11':
        case 'Escape':
          return
      }
      e.preventDefault()
      if (e.repeat) {
        return
      }
      switch (e.code) {
        case 'ArrowLeft':
          this.purin.direct(-3)
          this.purin.crouch()
          break
        case 'ArrowRight':
          this.purin.direct(3)
          this.purin.crouch()
          break
        case 'ArrowUp':
          this.purin.mush((s) => s + 1)
          break
        case 'ArrowDown':
          this.purin.mush((s) => s - 1)
          break
        case 'Space':
          this.purin.direct(0)
          this.purin.crouch()
          break
      }
    }
    const keyup = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'Space':
          this.purin.jump()
          this.purin.direct(0)
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

    this.bg.draw(this.ctx, [-30, 0], this.scale, 0, 0)
    this.item.draw(this.ctx, this.viewpoint, this.scale)
    this.purin.draw(this.ctx, this.viewpoint, this.scale)
    this.bg.draw(this.ctx, [-30, 0], this.scale, 1, 0)
    this.title.draw(
      this.ctx,
      [48, this.title_y + (this.cnt % 48 === 0 ? -1 : 0)],
      this.scale,
      0,
      0,
    )
    this.title_y = this.title_y >= 32 ? 32 : this.title_y + 2

    this.purin.tick()
    this.item.tick()
    this.cnt++
  }
}

export default Game
