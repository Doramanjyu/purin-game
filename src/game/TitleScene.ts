import Sprite from './lib/Sprite'
import { Frame, Root } from './lib/coords'

import Purin from './Purin'
import Scene from './Scene'

class TitleScene implements Scene {
  readonly bg: Sprite
  readonly title: Sprite
  readonly purin: Purin
  readonly origin: Frame
  readonly viewpoint: Frame

  private title_y: number
  private cnt: number

  changescene?: (s: string) => void

  constructor(sprite: HTMLImageElement) {
    this.origin = new Frame('origin', Root)
    this.viewpoint = new Frame('viewpoint', this.origin, [-135, -160])

    this.purin = new Purin(sprite, this.origin)
    this.bg = new Sprite(sprite, {
      topLeft: [0, 256],
      sz: [301, 200],
    })
    this.title = new Sprite(sprite, {
      topLeft: [0, 456],
      sz: [173, 64],
    })
    this.title_y = -48
    this.cnt = 0
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onkeydown() {}

  onkeyup(e: KeyboardEvent) {
    switch (e.code) {
      case 'Space':
      case 'Enter':
        if (this.changescene) {
          this.changescene('game')
        }
    }
  }

  tick() {
    this.purin.tick()
    this.cnt++
    this.title_y = this.title_y >= 32 ? 32 : this.title_y + 2
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 800, 600)

    const scale = 3
    this.bg.draw(ctx, [-30, 0], scale, 0, 0)
    this.purin.draw(ctx, this.viewpoint, scale)
    this.bg.draw(ctx, [-30, 0], scale, 1, 0)
    this.title.draw(
      ctx,
      [48, this.title_y + (this.cnt % 48 === 0 ? -1 : 0)],
      scale,
      0,
      0,
    )
  }
}

export default TitleScene
