import Sprite from './lib/Sprite'
import { Frame, Root } from './lib/coords'

import Purin from './Purin'
import Mush from './Mush'
import Scene from './Scene'

class GameScene implements Scene {
  readonly bg: Sprite
  readonly purin: Purin
  readonly mush: Mush
  readonly origin: Frame
  readonly viewpoint: Frame

  private scale: number
  private cnt: number

  changescene?: (s: string) => void

  constructor(sprite: HTMLImageElement) {
    this.origin = new Frame('origin', Root)
    this.viewpoint = new Frame('viewpoint', this.origin, [-135, -160])
    this.scale = 3

    this.purin = new Purin(sprite, this.origin)
    this.mush = new Mush(sprite, this.origin, [35, 0])
    this.bg = new Sprite(sprite, {
      topLeft: [0, 256],
      sz: [301, 200],
    })
    this.cnt = 0
  }

  onkeydown(e: KeyboardEvent) {
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

  onkeyup(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Space':
        this.purin.jump()
        this.purin.direct(0)
        break
    }
  }

  tick() {
    this.purin.tick()
    this.mush.tick()
    this.cnt++
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 800, 600)

    this.bg.draw(ctx, [-30, 0], this.scale, 0, 0)
    this.purin.draw(ctx, this.viewpoint, this.scale)
    this.mush.draw(ctx, this.viewpoint, this.scale)
    this.bg.draw(ctx, [-30, 0], this.scale, 1, 0)
  }
}

export default GameScene
