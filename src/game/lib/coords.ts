import { Vec2 } from './vec'

export class UniversalFrame {
  readonly name: string
  parent: UniversalFrame | null
  pos: Vec2

  constructor(name: string) {
    this.name = name
    this.parent = null
    this.pos = [0, 0]
  }

  level(): number {
    return 0
  }
}

export class TransformError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'TransformError'
  }
}

export class Frame extends UniversalFrame {
  parent: UniversalFrame
  private lv: number

  constructor(name: string, parent: UniversalFrame, pos: Vec2 = [0, 0]) {
    super(name)
    this.parent = parent
    this.pos = pos
    this.lv = parent.level() + 1
  }

  level(): number {
    return this.lv
  }

  from(frame: UniversalFrame): Vec2 {
    let out: Vec2 = [0, 0]

    let a: UniversalFrame = frame
    let b: UniversalFrame = this // eslint-disable-line @typescript-eslint/no-this-alias

    while (a !== b) {
      const al = a.level()
      const bl = b.level()
      if (al >= bl) {
        if (a.parent === null) {
          throw new TransformError('frames are not in the same tree')
        }
        out = [out[0] - a.pos[0], out[1] - a.pos[1]]
        a = a.parent
      }
      if (bl >= al) {
        if (b.parent === null) {
          throw new TransformError('frames are not in the same tree')
        }
        out = [out[0] + b.pos[0], out[1] + b.pos[1]]
        b = b.parent
      }
    }
    return out
  }
}

export const Root = new UniversalFrame('root')
