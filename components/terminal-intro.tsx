"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"

// Each letter is defined on a grid. 1 = filled block, 0 = empty.
// Grid is 5 rows x 5 cols per letter.
const N_GRID = [
  [1, 0, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 1, 1],
  [1, 0, 0, 0, 1],
]

const C_GRID = [
  [0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
]

type BlockData = {
  finalX: number
  finalY: number
  scatterX: number
  scatterY: number
}

function getBlocks(grid: number[][], offsetX: number): BlockData[] {
  const blocks: BlockData[] = []
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 1) {
        blocks.push({
          finalX: (c + offsetX) * 40,
          finalY: r * 40,
          // Scatter to random grid-aligned positions (multiples of 40)
          scatterX: (Math.floor(Math.random() * 16) - 8) * 40,
          scatterY: (Math.floor(Math.random() * 10) - 5) * 40,
        })
      }
    }
  }
  return blocks
}

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [assembled, setAssembled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const triggered = useRef(false)

  // Generate scattered block positions once on mount
  const nBlocks = useMemo(() => getBlocks(N_GRID, 0), [])
  const cBlocks = useMemo(() => getBlocks(C_GRID, 6), [])

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 400)
    return () => clearTimeout(t)
  }, [])

  // Loading bar animation
  useEffect(() => {
    if (!loading) return
    const start = Date.now()
    const duration = 800
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      setLoadProgress(p)
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        // Done loading -> fade out
        setTimeout(() => setFadeOut(true), 200)
        setTimeout(onComplete, 600)
      }
    }
    requestAnimationFrame(tick)
  }, [loading, onComplete])

  const handleAssemble = useCallback(() => {
    if (triggered.current) return
    triggered.current = true
    setAssembled(true)
    // After blocks snap in, show loading bar
    setTimeout(() => setLoading(true), 600)
  }, [])

  useEffect(() => {
    const handler = () => handleAssemble()
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleAssemble])

  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setFadeOut(true)
      setTimeout(onComplete, 300)
    },
    [onComplete],
  )

  const blockSize = 36
  const gap = 4

  return (
    <div
      onClick={handleAssemble}
      className={`fixed inset-0 z-50 bg-[#111] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-400 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ cursor: assembled ? "default" : "pointer" }}
    >
      {/* Skip */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-20 text-[10px] text-white/15 hover:text-white/40 transition-colors px-3 py-1.5 font-mono tracking-[0.3em] uppercase"
      >
        Skip
      </button>

      {/* Block grid */}
      <div
        className="relative"
        style={{
          width: `${11 * (blockSize + gap)}px`,
          height: `${5 * (blockSize + gap)}px`,
        }}
      >
        {[...nBlocks, ...cBlocks].map((block, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: blockSize,
              height: blockSize,
              background: assembled ? "#e5e5e5" : "#333",
              transition: assembled
                ? `transform 450ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 12}ms, background 300ms ease ${i * 12}ms`
                : "none",
              transform: assembled
                ? `translate(${block.finalX}px, ${block.finalY}px)`
                : `translate(${block.scatterX}px, ${block.scatterY}px)`,
            }}
          />
        ))}
      </div>

      {/* Loading bar area */}
      <div className="mt-16 flex flex-col items-center gap-3" style={{ minHeight: 40 }}>
        {loading ? (
          <>
            <div
              className="overflow-hidden"
              style={{
                width: 200,
                height: 3,
                background: "#222",
              }}
            >
              <div
                style={{
                  width: `${loadProgress * 100}%`,
                  height: "100%",
                  background: "#e5e5e5",
                  transition: "width 50ms linear",
                }}
              />
            </div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
              Loading
            </span>
          </>
        ) : (
          <span
            className={`text-[10px] font-mono tracking-[0.3em] uppercase transition-opacity duration-300 ${
              assembled ? "opacity-0" : showHint ? "text-white/20 opacity-100" : "opacity-0"
            }`}
          >
            Press any key
          </span>
        )}
      </div>
    </div>
  )
}
