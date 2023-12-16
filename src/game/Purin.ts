import Anime from './lib/Anime'
import { Frame, UniversalFrame } from './lib/coords'
import { Vec2 } from './lib/vec'

enum State {
  Idle,
  Crouching,
  Jumping,
}

const jump_y = [0, -16, -24, -32, -23, -16, 0]

class Purin {
  readonly aidle: Anime
  readonly ajump: Anime

  mush_size: number
  state: State
  floor_frame: Frame
  frame: Frame

  private draw_frame: Frame
  private face_frame: Frame
  private jump_vec: Vec2

  constructor(sprite: HTMLImageElement, parent: UniversalFrame) {
    this.mush_size = 2
    this.state = State.Idle
    this.floor_frame = new Frame('purin_floor', parent)
    this.frame = new Frame('purin', this.floor_frame)
    this.draw_frame = new Frame('purin_draw', this.frame, [-20, -32])
    this.face_frame = new Frame('purin_face', this.draw_frame)
    this.jump_vec = [0, 0]

    this.aidle = new Anime(sprite, {
      topLeft: [0, 0],
      sz: [40, 32],
      frames: [0, 1, 0, 0, 0, 0, 2, 3, 4, 5, 4, 4, 3, 2],
    })
    this.ajump = new Anime(sprite, {
      topLeft: [240, 0],
      sz: [40, 32],
      frames: [0, 1, 2, 3, 4, 5],
    })
  }

  direct(d: number) {
    this.face_frame.pos = [d, 0]
  }

  mush(i: number | ((s: number) => number)) {
    const s = typeof i === 'number' ? i : i(this.mush_size)
    this.mush_size = Math.max(0, Math.min(2, s))
  }

  crouch() {
    if (this.state === State.Idle) {
      this.state = State.Crouching
    }
  }

  jump() {
    if (this.state === State.Crouching) {
      this.state = State.Jumping
      this.jump_vec = this.face_frame.pos
    }
  }

  tick() {
    switch (this.state) {
      case State.Idle:
        this.aidle.tick()
        break
      case State.Crouching:
        this.aidle.tick(10)
        this.ajump.tick(0)
        break
      case State.Jumping:
        this.floor_frame.pos[1] = jump_y[this.ajump.frame]
        this.floor_frame.pos[0] += this.jump_vec[0]
        if (this.ajump.tick() === 0) {
          this.state = State.Idle
          this.floor_frame.pos[1] = 0
          this.jump_vec = [0, 0]
        }
        break
    }
  }

  draw(ctx: CanvasRenderingContext2D, f: Frame, scale: number) {
    const p = this.draw_frame.from(f)
    switch (this.state) {
      case State.Idle:
      case State.Crouching:
        this.aidle.draw(ctx, p, scale, 0, 0)
        this.aidle.draw(ctx, this.face_frame.from(f), scale, 0, 1)
        if (this.mush_size > 0) {
          this.aidle.draw(ctx, p, scale, 0, this.mush_size + 1)
        }
        break
      case State.Jumping: {
        this.ajump.draw(ctx, p, scale, 0, 0)
        this.ajump.draw(ctx, p, scale, 0, 1)
        if (this.mush_size > 0) {
          this.ajump.draw(ctx, p, scale, 0, this.mush_size + 1)
        }
        break
      }
    }
  }
}

export default Purin
