import Sprite from './lib/Sprite'
import { Frame, Root } from './lib/coords'

import Purin from './Purin'
import Scene from './Scene'

enum State {
  Init,
  Wait,
  Fade,
}

class TitleScene implements Scene {
  readonly title: Sprite
  readonly hit: Sprite
  readonly purin: Purin
  readonly origin: Frame
  readonly viewpoint: Frame

  private title_y: number
  private cnt: number
  private fade: number
  private state: State

  changescene?: (s: string) => void

  constructor(sprite: HTMLImageElement) {
    this.origin = new Frame('origin', Root)
    this.viewpoint = new Frame('viewpoint', this.origin, [-101, -130])

    this.purin = new Purin(sprite, this.origin)
    this.purin.mush(2)
    this.title = new Sprite(sprite, {
      topLeft: [0, 456],
      sz: [173, 45],
    })
    this.hit = new Sprite(sprite, {
      topLeft: [0, 501],
      sz: [56, 7],
    })
    this.title_y = -48
    this.cnt = 0
    this.fade = 0

    this.state = State.Init
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onkeydown() {}

  onkeyup(e: KeyboardEvent) {
    switch (e.code) {
      case 'Space':
      case 'Enter':
        if (this.state === State.Wait) {
          this.state = State.Fade
        }
    }
  }

  tick() {
    switch (this.state) {
      case State.Init:
        this.title_y += 6
        if (this.title_y >= 20) {
          this.title_y = 20
          this.state = State.Wait
        }
        break
      case State.Wait:
        break
      case State.Fade:
        if (this.cnt % 2 === 0) {
          this.fade += 0.2
        }
        if (this.fade >= 1.2 && this.changescene) {
          this.changescene('game')
        }
        break
    }
    if (this.cnt % 100 === 0) {
      this.purin.crouch()
    } else if (this.cnt % 100 === 4) {
      this.purin.jump()
    }
    this.cnt++
    this.purin.tick()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = 1.0
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 800, 600)

    const scale = 4
    this.purin.draw(ctx, this.viewpoint, scale)
    const shift = this.cnt % 48 === 0 ? -1 : 0
    this.title.draw(ctx, [14, this.title_y + shift], scale, 0, 0)

    if (this.state === State.Wait && this.cnt % 28 != 0) {
      this.hit.draw(ctx, [72, 78], scale, 0, 0)
    }

    ctx.globalAlpha = Math.min(1, this.fade)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 800, 600)
  }
}

export default TitleScene
