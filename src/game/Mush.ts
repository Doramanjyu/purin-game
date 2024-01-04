import Sprite from './lib/Sprite'
import { Frame, UniversalFrame } from './lib/coords'
import { Vec2 } from './lib/vec'

const grow = [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, -1, 2, -2, -1, 2, -1, 3]

class Mush {
  readonly sprite: Sprite

  frame: Frame

  private draw_frame: Frame
  private cnt: number
  private wait: number
  private size: number
  private type: number

  constructor(sprite: HTMLImageElement, parent: UniversalFrame, pos: Vec2) {
    this.frame = new Frame('mush', parent, pos)
    this.draw_frame = new Frame('mush_draw', this.frame, [0, -11])

    this.sprite = new Sprite(sprite, {
      topLeft: [0, 128],
      sz: [12, 11],
    })

    this.size = 0
    this.wait = 0
    this.type = 0

    this.random()
  }

  random() {
    this.size = 0
    this.wait = 20 + Math.floor(Math.random() * 60)
    this.type = Math.floor(Math.random() * 2)
    this.frame.pos[0] = Math.floor(Math.random() * 200 - 100)
  }

  tick() {
    if (this.wait > 0) {
      this.wait--
      return
    }
    this.size++
    if (this.size >= grow.length) {
      this.random()
    }
  }

  draw(ctx: CanvasRenderingContext2D, f: Frame, scale: number) {
    if (this.wait > 0 || grow[this.size] < 0) {
      return
    }
    const p = this.draw_frame.from(f)
    this.sprite.draw(ctx, p, scale, grow[this.size], this.type)
  }
}

export default Mush
