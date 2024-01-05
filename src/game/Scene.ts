interface Scene {
  tick(): void
  draw(ctx: CanvasRenderingContext2D): void
  onkeydown(e: KeyboardEvent): void
  onkeyup(e: KeyboardEvent): void

  changescene?: (s: string) => void
}

export default Scene
