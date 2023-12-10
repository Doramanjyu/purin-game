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
          width: '640px',
          height: '480px',
          margin: '0 auto',
          display: 'block',
        }}
        css={css`
          &:focus-visible {
            outline-style: none !important;
          }
        `}
        width="640"
        height="480"
      />
    </>
  )
}

export default GamePage
