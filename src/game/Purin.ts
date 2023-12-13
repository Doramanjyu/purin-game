import Anime from './lib/Anime'
import { Vec2 } from './lib/vec'

enum State {
  Idle,
  Crouching,
  Jumping,
}

class Purin {
  readonly aidle: Anime
  readonly ajump: Anime

  mush_size: number
  dir: number
  state: State

  constructor(sprite: HTMLImageElement) {
    this.dir = 0
    this.mush_size = 2
    this.state = State.Idle

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
    this.dir = d
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
        if (this.ajump.tick() === 0) {
          this.state = State.Idle
        }
        break
    }
  }

  draw(ctx: CanvasRenderingContext2D, p: Vec2, scale: number) {
    switch (this.state) {
      case State.Idle:
      case State.Crouching:
        this.aidle.draw(ctx, p, scale, 0, 0)
        this.aidle.draw(ctx, [p[0] + this.dir, p[1]], scale, 0, 1)
        if (this.mush_size > 0) {
          this.aidle.draw(ctx, p, scale, 0, this.mush_size + 1)
        }
        break
      case State.Jumping: {
        const y = [0, -16, -24, -32, -23, -16, 0][this.ajump.frame]
        const p2: Vec2 = [p[0], p[1] + y]
        this.ajump.draw(ctx, p2, scale, 0, 0)
        this.ajump.draw(ctx, p2, scale, 0, 1)
        if (this.mush_size > 0) {
          this.ajump.draw(ctx, p2, scale, 0, this.mush_size + 1)
        }
        break
      }
    }
  }
}

export default Purin
