"use client"

import { useState, useCallback, useEffect, useRef } from "react"

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [assembled, setAssembled] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 600)
    return () => clearTimeout(t)
  }, [])

  const handleAssemble = useCallback(() => {
    if (triggered.current) return
    triggered.current = true
    setAssembled(true)

    // After snap, hold briefly, then fade out
    setTimeout(() => setFadeOut(true), 1100)
    setTimeout(onComplete, 1600)
  }, [onComplete])

  const handleKeyDown = useCallback(() => {
    handleAssemble()
  }, [handleAssemble])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setFadeOut(true)
      setTimeout(onComplete, 300)
    },
    [onComplete],
  )

  // Shared letter style -- flat, blocky, no glow
  const letterBase =
    "font-black leading-none select-none block tracking-tighter"

  return (
    <div
      onClick={handleAssemble}
      className={`fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center select-none overflow-hidden transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ cursor: assembled ? "default" : "pointer" }}
    >
      {/* Skip */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-20 text-xs text-white/20 hover:text-white/50 transition-colors px-3 py-1.5 font-mono tracking-widest uppercase"
      >
        Skip
      </button>

      {/* Logo container -- scales down slightly after assembly */}
      <div
        className="relative z-10 flex items-baseline"
        style={{
          transition: assembled
            ? "transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 600ms"
            : "none",
          transform: assembled ? "scale(0.85)" : "scale(1)",
        }}
      >
        {/* N -- starts offset up-left, snaps to center */}
        <span
          className={`${letterBase} text-[10rem] sm:text-[13rem] md:text-[17rem] lg:text-[20rem]`}
          style={{
            color: "#D4D4D4",
            transition: assembled
              ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease"
              : "none",
            transform: assembled
              ? "translate(0, 0) rotate(0deg)"
              : "translate(-60px, -45px) rotate(-6deg)",
            opacity: assembled ? 1 : 0.4,
          }}
        >
          N
        </span>

        {/* C -- starts offset down-right, snaps to center */}
        <span
          className={`${letterBase} text-[10rem] sm:text-[13rem] md:text-[17rem] lg:text-[20rem] -ml-4 sm:-ml-6 md:-ml-8`}
          style={{
            color: "#D4D4D4",
            transition: assembled
              ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease"
              : "none",
            transform: assembled
              ? "translate(0, 0) rotate(0deg)"
              : "translate(55px, 40px) rotate(5deg)",
            opacity: assembled ? 1 : 0.4,
          }}
        >
          C
        </span>
      </div>

      {/* Horizontal rule -- appears on assembly */}
      <div
        className="fixed z-10"
        style={{
          bottom: "38%",
          left: "50%",
          transform: "translateX(-50%)",
          width: assembled ? "200px" : "0px",
          height: "2px",
          background: "#D4D4D4",
          transition: assembled
            ? "width 400ms cubic-bezier(0.22, 1, 0.36, 1) 350ms"
            : "none",
        }}
      />

      {/* Bottom hint */}
      <div className="fixed bottom-10 left-0 right-0 z-10 flex justify-center">
        <span
          className={`text-xs font-mono tracking-[0.25em] uppercase transition-opacity duration-400 ${
            assembled
              ? "opacity-0"
              : showHint
                ? "text-white/20 opacity-100"
                : "opacity-0"
          }`}
        >
          Press any key
        </span>
      </div>
    </div>
  )
}
