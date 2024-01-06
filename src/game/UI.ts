import Sprite from './lib/Sprite'
import { Vec2 } from './lib/vec'

class UI {
  readonly bar: Sprite
  readonly item: Sprite

  items: number[]

  private p: Vec2

  constructor(sprite: HTMLImageElement) {
    this.bar = new Sprite(sprite, {
      topLeft: [0, 508],
      sz: [32, 6],
    })
    this.item = new Sprite(sprite, {
      topLeft: [0, 514],
      sz: [10, 10],
    })
    this.items = [1, 0, 0]
    this.p = [-30, 12]
  }

  tick() {
    this.p[0] = this.p[0] >= 18 ? 18 : this.p[0] + 16
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.bar.draw(ctx, this.p, 3, 1, 0)
    for (let i = 0; i < 3; i++) {
      this.item.draw(
        ctx,
        [this.p[0] + i * 11, this.p[1] + 7],
        3,
        this.items[i],
        0,
      )
    }
  }
}

export default UI
