import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'

import Game from '@doramanjyu/purin-game/game/Game'

const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const g = new Game(canvasRef.current)
    const cleanup = g.start()

    return () => cleanup()
  }, [canvasRef])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: '100%',
          maxHeight: '100vh',
          aspectRatio: '4/3',
        }}
        css={css`
          &:focus-visible {
            outline-style: none !important;
          }
        `}
        width="800"
        height="600"
      />
    </>
  )
}

export default GamePage
