import Sprite from './lib/Sprite'
import { Frame, UniversalFrame } from './lib/coords'
import { Vec2 } from './lib/vec'

class Item {
  readonly sprite: Sprite

  frame: Frame

  private draw_frame: Frame
  private cnt: number
  private wait: number
  private size: number
  private type: number

  constructor(sprite: HTMLImageElement, parent: UniversalFrame, pos: Vec2) {
    this.size = 0
    this.frame = new Frame('item', parent, pos)
    this.draw_frame = new Frame('item_draw', this.frame, [0, -11])

    this.sprite = new Sprite(sprite, {
      topLeft: [0, 128],
      sz: [12, 11],
    })

    this.cnt = 0
    this.random()
  }

  random() {
    this.size = 0
    this.wait = 20 + Math.floor(Math.random() * 60)
    this.frame.pos[0] = Math.floor(Math.random() * 200 - 100)
    this.type = Math.floor(Math.random() * 2)
  }

  tick() {
    if (this.wait > 0) {
      this.wait--
      return
    }
    this.cnt++
    if (this.cnt % 3 === 0) {
      this.size++
      if (this.size > 3) {
        this.random()
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, f: Frame, scale: number) {
    if (this.wait > 0) {
      return
    }
    const p = this.draw_frame.from(f)
    this.sprite.draw(ctx, p, scale, this.size, this.type)
  }
}

export default Item
