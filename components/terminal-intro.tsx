"use client"

import { useState, useCallback, useEffect, useRef } from "react"

/**
 * Video-game engine boot screen.
 *
 * The "NC" logo exists at all times as a single, smooth shape.
 * A grid of opaque blocks covers it. On interaction the blocks
 * retract outward in a fast, mechanical wave to reveal the logo.
 * Once all blocks are gone they vanish instantly. A loading bar
 * fills, then the screen transitions to the main site.
 */

// Block grid dimensions
const COLS = 24
const ROWS = 14
const BLOCK_SIZE = 48
const GAP = 2

type BlockData = {
  row: number
  col: number
  // exit direction: which edge to fly toward
  dx: number
  dy: number
  delay: number
}

function buildBlocks(): BlockData[] {
  const cx = COLS / 2
  const cy = ROWS / 2
  const blocks: BlockData[] = []

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Distance from center determines stagger delay (center reveals first)
      const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2)
      const maxDist = Math.sqrt(cx ** 2 + cy ** 2)
      const delay = (dist / maxDist) * 300

      // Direction: fly away from center
      const angle = Math.atan2(r - cy, c - cx)
      const dx = Math.cos(angle)
      const dy = Math.sin(angle)

      blocks.push({ row: r, col: c, dx, dy, delay })
    }
  }
  return blocks
}

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"idle" | "revealing" | "revealed" | "loading" | "done">("idle")
  const [loadProgress, setLoadProgress] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const triggered = useRef(false)
  const blocksRef = useRef<BlockData[]>(buildBlocks())

  // Show hint after brief delay
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 400)
    return () => clearTimeout(t)
  }, [])

  // Loading bar
  useEffect(() => {
    if (phase !== "loading") return
    const start = Date.now()
    const duration = 600
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setLoadProgress(p)
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setPhase("done")
        setTimeout(onComplete, 350)
      }
    }
    requestAnimationFrame(tick)
  }, [phase, onComplete])

  const handleTrigger = useCallback(() => {
    if (triggered.current) return
    triggered.current = true
    setPhase("revealing")
    // Blocks are done retracting after stagger + transition
    setTimeout(() => setPhase("revealed"), 650)
    // Start loading bar
    setTimeout(() => setPhase("loading"), 900)
  }, [])

  useEffect(() => {
    const handler = () => handleTrigger()
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleTrigger])

  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setPhase("done")
      setTimeout(onComplete, 150)
    },
    [onComplete],
  )

  const isRevealing = phase === "revealing"
  const blocksGone = phase === "revealed" || phase === "loading" || phase === "done"
  const isDone = phase === "done"

  const gridW = COLS * (BLOCK_SIZE + GAP)
  const gridH = ROWS * (BLOCK_SIZE + GAP)

  return (
    <div
      onClick={handleTrigger}
      className="fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden"
      style={{
        background: "#0a0a0a",
        cursor: phase === "idle" ? "pointer" : "default",
        opacity: isDone ? 0 : 1,
        transition: "opacity 300ms ease",
        pointerEvents: isDone ? "none" : "auto",
      }}
    >
      {/* Skip */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-30 text-white/10 hover:text-white/30 transition-colors font-mono uppercase text-[10px] tracking-[0.3em] px-3 py-1.5"
      >
        Skip
      </button>

      {/* Logo layer - always present, constant size */}
      <div className="absolute flex items-end" style={{ gap: "2px" }}>
        <span
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(80px, 12vw, 140px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#e5e5e5",
            letterSpacing: "-0.04em",
          }}
        >
          N
        </span>
        <span
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(58px, 8.5vw, 100px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#22d3ee",
            letterSpacing: "-0.04em",
            marginLeft: "-0.08em",
            marginBottom: "2px",
            transform: "rotate(-3deg)",
            transformOrigin: "bottom left",
          }}
        >
          C
        </span>
      </div>

      {/* Block mask layer - covers the logo, retracts on trigger */}
      {!blocksGone && (
        <div
          className="absolute z-10"
          style={{
            width: gridW,
            height: gridH,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {blocksRef.current.map((block, i) => {
            const flyDist = 1200
            const tx = isRevealing ? block.dx * flyDist : 0
            const ty = isRevealing ? block.dy * flyDist : 0

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: BLOCK_SIZE,
                  height: BLOCK_SIZE,
                  left: block.col * (BLOCK_SIZE + GAP),
                  top: block.row * (BLOCK_SIZE + GAP),
                  background: "#0a0a0a",
                  transform: `translate(${tx}px, ${ty}px)`,
                  transition: isRevealing
                    ? `transform 350ms cubic-bezier(0.22, 1, 0.36, 1) ${block.delay}ms`
                    : "none",
                }}
              />
            )
          })}
        </div>
      )}

      {/* Bottom: hint or loading bar */}
      <div className="absolute bottom-14 flex flex-col items-center gap-3 z-20" style={{ minHeight: 36 }}>
        {phase === "loading" ? (
          <>
            <div style={{ width: 160, height: 2, background: "#1a1a1a" }}>
              <div
                style={{
                  width: `${loadProgress * 100}%`,
                  height: "100%",
                  background: "#e5e5e5",
                  transition: "width 30ms linear",
                }}
              />
            </div>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/20">
              Loading
            </span>
          </>
        ) : phase === "idle" ? (
          <span
            className="text-[9px] font-mono tracking-[0.3em] uppercase transition-opacity duration-500 z-20"
            style={{ color: "rgba(255,255,255,0.15)", opacity: showHint ? 1 : 0 }}
          >
            Press any key
          </span>
        ) : null}
      </div>
    </div>
  )
}
