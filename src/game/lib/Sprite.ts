import { Vec2 } from './vec'

export type DrawOptions = {
  opacity?: number
}

export interface Drawer {
  draw(
    ctx: CanvasRenderingContext2D,
    s: Vec2,
    scale: number,
    mode1: number,
    mode2: number,
    opt?: DrawOptions,
  ): void
  sz(): Vec2
}

export type SpriteProp = {
  topLeft: Vec2
  sz: Vec2
  baseScale?: number
}

class Sprite implements Drawer {
  readonly sprite: HTMLImageElement
  readonly prop: Required<SpriteProp>

  constructor(sprite: HTMLImageElement, prop: SpriteProp) {
    this.sprite = sprite
    this.prop = {
      baseScale: 1,
      ...prop,
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    p: Vec2,
    scale: number,
    mode1: number,
    mode2: number,
    opt?: DrawOptions,
  ) {
    if (opt?.opacity !== undefined) {
      ctx.globalAlpha = opt.opacity
    }
    ctx.drawImage(
      this.sprite,
      this.prop.topLeft[0] + mode1 * this.prop.sz[0],
      this.prop.topLeft[1] + mode2 * this.prop.sz[1],
      this.prop.sz[0],
      this.prop.sz[1],
      Math.floor(p[0] * scale),
      Math.floor(p[1] * scale),
      this.prop.sz[0] * scale * this.prop.baseScale,
      this.prop.sz[1] * scale * this.prop.baseScale,
    )
    if (opt?.opacity !== undefined) {
      ctx.globalAlpha = 1
    }
  }

  sz() {
    return this.prop.sz
  }
}

export default Sprite
