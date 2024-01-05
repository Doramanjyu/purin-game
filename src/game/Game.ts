import Scene from './Scene'
import TitleScene from './TitleScene'

class Game {
  readonly ctx: CanvasRenderingContext2D

  loaded?: boolean
  scene: Scene

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw 'failed to get canvas context'
    }
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = false

    this.scene = new TitleScene()
  }

  start() {
    const tickTimer = setInterval(this.tick.bind(this), 50)

    const keydown = (e: KeyboardEvent) => this.scene.onkeydown(e)
    const keyup = (e: KeyboardEvent) => this.scene.onkeyup(e)
    document.addEventListener('keydown', keydown)
    document.addEventListener('keyup', keyup)

    return () => {
      clearInterval(tickTimer)
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('keyup', keyup)
    }
  }

  tick() {
    this.scene.draw(this.ctx)
    this.scene.tick()
  }
}

export default Game
