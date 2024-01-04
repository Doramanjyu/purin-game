import Sprite from './lib/Sprite'
import { Frame, UniversalFrame } from './lib/coords'
import { Vec2 } from './lib/vec'

class Item {
  readonly sprite: Sprite

  size: number
  frame: Frame

  private draw_frame: Frame
  private cnt: number

  constructor(sprite: HTMLImageElement, parent: UniversalFrame, pos: Vec2) {
    this.size = 0
    this.frame = new Frame('item', parent, pos)
    this.draw_frame = new Frame('item_draw', this.frame, [0, -11])

    this.sprite = new Sprite(sprite, {
      topLeft: [0, 128],
      sz: [12, 11],
    })

    this.cnt = 0
  }

  tick() {
    this.cnt++
    if (this.cnt % 50 === 0) {
      this.size++
      if (this.size > 4) {
        this.size = 0
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, f: Frame, scale: number) {
    if (this.size === 0) {
      return
    }
    const p = this.draw_frame.from(f)
    this.sprite.draw(ctx, p, scale, this.size - 1, 1)
  }
}

export default Item
