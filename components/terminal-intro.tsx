"use client"

import { useState, useCallback, useEffect, useRef } from "react"

/*
 * Video-game studio intro: scattered blocks snap into position,
 * then dissolve to reveal clean, seamless "NC" letterforms.
 * N = matte white, C = solid cyan. C leans on N (TT Games style).
 */

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"idle" | "building" | "formed" | "logo" | "loading" | "done">("idle")
  const [loadProgress, setLoadProgress] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const triggered = useRef(false)

  // Show hint after brief delay
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 500)
    return () => clearTimeout(t)
  }, [])

  // Loading bar
  useEffect(() => {
    if (phase !== "loading") return
    const start = Date.now()
    const duration = 700
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setLoadProgress(p)
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setPhase("done")
        setTimeout(onComplete, 400)
      }
    }
    requestAnimationFrame(tick)
  }, [phase, onComplete])

  const handleTrigger = useCallback(() => {
    if (triggered.current) return
    triggered.current = true
    setPhase("building")
    // Blocks arrive
    setTimeout(() => setPhase("formed"), 500)
    // Blocks dissolve, clean logo appears
    setTimeout(() => setPhase("logo"), 700)
    // Loading bar
    setTimeout(() => setPhase("loading"), 1000)
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
      setTimeout(onComplete, 200)
    },
    [onComplete],
  )

  // Block data for construction effect - simple 5x7 grids
  const nShape = [
    [1,0,0,0,1],
    [1,1,0,0,1],
    [1,1,0,0,1],
    [1,0,1,0,1],
    [1,0,1,1,1],
    [1,0,0,1,1],
    [1,0,0,0,1],
  ]
  const cShape = [
    [0,1,1,1],
    [1,1,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,1,0,0],
    [0,1,1,1],
  ]

  const blockSize = 18
  const blockGap = 2
  const step = blockSize + blockGap

  // Build block arrays with scatter positions (computed once via ref)
  const scatterRef = useRef<{ nx: number; ny: number }[]>([])
  if (scatterRef.current.length === 0) {
    const allBlocks: { nx: number; ny: number }[] = []
    for (let r = 0; r < nShape.length; r++) {
      for (let c = 0; c < nShape[r].length; c++) {
        if (nShape[r][c]) allBlocks.push({ nx: 0, ny: 0 })
      }
    }
    for (let r = 0; r < cShape.length; r++) {
      for (let c = 0; c < cShape[r].length; c++) {
        if (cShape[r][c]) allBlocks.push({ nx: 0, ny: 0 })
      }
    }
    scatterRef.current = allBlocks.map(() => ({
      nx: (Math.floor(Math.random() * 30) - 15) * step,
      ny: (Math.floor(Math.random() * 20) - 10) * step,
    }))
  }

  // Flatten block positions
  const nBlocks: { fx: number; fy: number; letter: "n" }[] = []
  for (let r = 0; r < nShape.length; r++) {
    for (let c = 0; c < nShape[r].length; c++) {
      if (nShape[r][c]) nBlocks.push({ fx: c * step, fy: r * step, letter: "n" })
    }
  }
  const cBlocks: { fx: number; fy: number; letter: "c" }[] = []
  for (let r = 0; r < cShape.length; r++) {
    for (let c = 0; c < cShape[r].length; c++) {
      if (cShape[r][c]) cBlocks.push({ fx: (c + 5.5) * step, fy: r * step, letter: "c" })
    }
  }
  const allBlocks = [...nBlocks, ...cBlocks]
  const scatter = scatterRef.current

  const isBuilding = phase === "building" || phase === "formed"
  const blocksVisible = phase === "idle" || phase === "building" || phase === "formed"
  const logoVisible = phase === "logo" || phase === "loading" || phase === "done"
  const isDone = phase === "done"

  const gridW = 9.5 * step
  const gridH = 7 * step

  return (
    <div
      onClick={handleTrigger}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        background: "#0a0a0a",
        cursor: phase === "idle" ? "pointer" : "default",
        opacity: isDone ? 0 : 1,
        transition: "opacity 350ms ease",
        pointerEvents: isDone ? "none" : "auto",
      }}
    >
      {/* Skip */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-20 text-white/10 hover:text-white/30 transition-colors font-mono uppercase text-[10px] tracking-[0.3em] px-3 py-1.5"
      >
        Skip
      </button>

      {/* Construction blocks layer */}
      <div
        className="relative"
        style={{
          width: gridW,
          height: gridH,
          opacity: blocksVisible ? (phase === "formed" ? 0 : 1) : 0,
          transition: "opacity 200ms ease",
        }}
      >
        {allBlocks.map((block, i) => {
          const arrived = isBuilding
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: blockSize,
                height: blockSize,
                background: block.letter === "n" ? "#d4d4d4" : "#22d3ee",
                transform: arrived
                  ? `translate(${block.fx}px, ${block.fy}px)`
                  : `translate(${scatter[i]?.nx ?? 0}px, ${scatter[i]?.ny ?? 0}px)`,
                transition: arrived
                  ? `transform 380ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 8}ms`
                  : "none",
                opacity: phase === "idle" ? 0.25 : 1,
              }}
            />
          )
        })}
      </div>

      {/* Clean logo layer - appears after blocks dissolve */}
      <div
        className="absolute flex items-end"
        style={{
          gap: "4px",
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "scale(1)" : "scale(0.95)",
          transition: "opacity 250ms ease, transform 250ms ease",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "120px",
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
            fontSize: "88px",
            fontWeight: 900,
            lineHeight: 1,
            color: "#22d3ee",
            letterSpacing: "-0.04em",
            marginLeft: "-12px",
            marginBottom: "2px",
            transform: "rotate(-3deg)",
            transformOrigin: "bottom left",
          }}
        >
          C
        </span>
      </div>

      {/* Bottom area: hint or loading bar */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3" style={{ minHeight: 40 }}>
        {phase === "loading" ? (
          <>
            <div style={{ width: 180, height: 2, background: "#1a1a1a" }}>
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
            className="text-[9px] font-mono tracking-[0.3em] uppercase transition-opacity duration-500"
            style={{ color: "rgba(255,255,255,0.15)", opacity: showHint ? 1 : 0 }}
          >
            Press any key
          </span>
        ) : null}
      </div>
    </div>
  )
}
