import Scene from './Scene'
import TitleScene from './TitleScene'
import GameScene from './GameScene'

import spriteUrl from './sprite.png'

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

    const sprite = new Image()
    sprite.addEventListener(
      'load',
      () => {
        this.loaded = true
      },
      {
        capture: false,
        once: true,
      },
    )
    sprite.src = spriteUrl

    const scenes = {
      title: new TitleScene(sprite),
      game: new GameScene(sprite),
    }
    const changescene = (s: string) => {
      switch (s) {
        case 'title':
          this.scene = scenes.title
          break
        case 'game':
          this.scene = scenes.game
          break
      }
      this.scene.changescene = changescene
    }
    this.scene = scenes.title // Workaround typecheck
    changescene('title')
  }

  start() {
    const tickTimer = setInterval(this.tick.bind(this), 50)

    const keydown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'F5':
        case 'F11':
        case 'Escape':
          return
      }
      e.preventDefault()
      if (e.repeat) {
        return
      }
      this.scene.onkeydown(e)
    }
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
    if (!this.loaded) {
      return
    }

    this.scene.draw(this.ctx)
    this.scene.tick()
  }
}

export default Game
