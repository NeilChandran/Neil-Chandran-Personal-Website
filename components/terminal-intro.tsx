"use client"

import { useState, useCallback, useEffect, useRef } from "react"

/**
 * Video-game LEGO-build intro.
 *
 * The "NC" logo is assembled from a small number of large pieces
 * that slide mechanically into place. Once locked, the pieces fuse
 * into a seamless logo. A loading bar fills, then fade to site.
 *
 * N pieces: left vertical stroke, diagonal stroke, right vertical stroke
 * C pieces: top horizontal bar, vertical spine, bottom horizontal bar
 */

type Piece = {
  id: string
  letter: "N" | "C"
  // Final position (percentage-based offsets from logo center)
  x: number
  y: number
  w: number
  h: number
  // Start offset before animation
  startX: number
  startY: number
  delay: number
  color: string
}

// N is built from 3 pieces, C from 3 pieces = 6 total large pieces
// Coordinates are in px, relative to a virtual 300x200 canvas centered on screen
const PIECES: Piece[] = [
  // === N (white) ===
  // Left vertical bar
  { id: "n-left", letter: "N", x: 0, y: 0, w: 38, h: 160, startX: -400, startY: 0, delay: 0, color: "#e5e5e5" },
  // Right vertical bar
  { id: "n-right", letter: "N", x: 95, y: 0, w: 38, h: 160, startX: 400, startY: 0, delay: 80, color: "#e5e5e5" },
  // Diagonal connector
  { id: "n-diag", letter: "N", x: 18, y: 0, w: 97, h: 160, startX: 0, startY: -350, delay: 160, color: "#e5e5e5" },

  // === C (cyan) ===
  // Vertical spine (left side of C)
  { id: "c-spine", letter: "C", x: 152, y: 18, w: 32, h: 124, startX: 0, startY: 350, delay: 100, color: "#22d3ee" },
  // Top horizontal bar
  { id: "c-top", letter: "C", x: 152, y: 0, w: 100, h: 32, startX: 400, startY: -200, delay: 200, color: "#22d3ee" },
  // Bottom horizontal bar
  { id: "c-bottom", letter: "C", x: 152, y: 128, w: 100, h: 32, startX: 400, startY: 200, delay: 280, color: "#22d3ee" },
]

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"idle" | "building" | "fused" | "loading" | "done">("idle")
  const [loadProgress, setLoadProgress] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const triggered = useRef(false)

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
      if (p < 1) requestAnimationFrame(tick)
      else {
        setPhase("done")
        setTimeout(onComplete, 300)
      }
    }
    requestAnimationFrame(tick)
  }, [phase, onComplete])

  const handleTrigger = useCallback(() => {
    if (triggered.current) return
    triggered.current = true
    setPhase("building")
    // After all pieces land (last delay 280 + transition 400)
    setTimeout(() => setPhase("fused"), 750)
    setTimeout(() => setPhase("loading"), 950)
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
      setTimeout(onComplete, 100)
    },
    [onComplete],
  )

  const isBuilding = phase === "building"
  const isFused = phase === "fused" || phase === "loading" || phase === "done"
  const isDone = phase === "done"

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

      {/* Logo build area */}
      <div
        className="relative"
        style={{ width: 260, height: 160 }}
      >
        {/* When fused, show clean text logo on top of pieces */}
        {isFused && (
          <div className="absolute inset-0 flex items-end" style={{ gap: 0 }}>
            <span
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: 140,
                fontWeight: 900,
                lineHeight: 0.88,
                color: "#e5e5e5",
                letterSpacing: "-0.04em",
              }}
            >
              N
            </span>
            <span
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: 100,
                fontWeight: 900,
                lineHeight: 0.88,
                color: "#22d3ee",
                letterSpacing: "-0.04em",
                marginLeft: -8,
                marginBottom: 1,
                transform: "rotate(-3deg)",
                transformOrigin: "bottom left",
              }}
            >
              C
            </span>
          </div>
        )}

        {/* Pieces layer - visible during idle and building, hidden once fused */}
        {!isFused &&
          PIECES.map((piece) => {
            const landed = isBuilding
            const tx = landed ? 0 : piece.startX
            const ty = landed ? 0 : piece.startY

            return (
              <div
                key={piece.id}
                className="absolute"
                style={{
                  width: piece.w,
                  height: piece.h,
                  left: piece.x,
                  top: piece.y,
                  background: piece.color,
                  borderRadius: 2,
                  transform: `translate(${tx}px, ${ty}px)`,
                  opacity: landed || phase === "idle" ? 1 : 1,
                  transition: landed
                    ? `transform 380ms cubic-bezier(0.22, 1, 0.36, 1) ${piece.delay}ms`
                    : "none",
                }}
              />
            )
          })}
      </div>

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
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/20">Loading</span>
          </>
        ) : phase === "idle" ? (
          <span
            className="text-[9px] font-mono tracking-[0.3em] uppercase transition-opacity duration-500 z-20"
            style={{ color: "rgba(255,255,255,0.15)", opacity: showHint ? 1 : 0 }}
          >
            Click to build
          </span>
        ) : null}
      </div>
    </div>
  )
}
