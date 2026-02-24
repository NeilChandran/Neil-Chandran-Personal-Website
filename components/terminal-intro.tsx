"use client"

import { useState, useCallback, useEffect } from "react"

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [split, setSplit] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const handleClick = useCallback(() => {
    if (split) return
    setSplit(true)
    setTimeout(() => setFadeOut(true), 400)
    setTimeout(onComplete, 900)
  }, [split, onComplete])

  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setFadeOut(true)
      setTimeout(onComplete, 300)
    },
    [onComplete],
  )

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer select-none transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Subtle spotlight */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Floor reflection gradient */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 55%, rgba(255,255,255,0.02) 70%, transparent 90%)",
        }}
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-20 text-sm text-white/30 hover:text-white/60 transition-colors px-3 py-1.5 rounded font-sans"
      >
        Skip
      </button>

      {/* NC Letters */}
      <div className="relative z-10 flex items-center justify-center">
        {/* N */}
        <div
          className="transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            transitionDuration: split ? "700ms" : "0ms",
            transform: split ? "translateX(-120vw) rotate(-15deg)" : "translateX(0)",
            opacity: split ? 0 : 1,
          }}
        >
          <span
            className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none tracking-tighter"
            style={{
              color: "#E8A830",
              textShadow:
                "4px 4px 0 rgba(0,0,0,0.4), 0 0 40px rgba(232,168,48,0.15)",
              WebkitTextStroke: "1px rgba(0,0,0,0.1)",
            }}
          >
            N
          </span>
        </div>

        {/* C - slightly overlapping, offset down like in the screenshot */}
        <div
          className="transition-all ease-[cubic-bezier(0.4,0,0.2,1)] -ml-8 md:-ml-12 mt-8 md:mt-12"
          style={{
            transitionDuration: split ? "700ms" : "0ms",
            transform: split ? "translateX(120vw) rotate(15deg)" : "translateX(0)",
            opacity: split ? 0 : 1,
          }}
        >
          <span
            className="text-[10rem] md:text-[13rem] lg:text-[16rem] font-black leading-none tracking-tighter"
            style={{
              color: "#4DB8D1",
              textShadow:
                "4px 4px 0 rgba(0,0,0,0.4), 0 0 40px rgba(77,184,209,0.15)",
              WebkitTextStroke: "1px rgba(0,0,0,0.1)",
            }}
          >
            C
          </span>
        </div>
      </div>

      {/* Click to enter hint */}
      <div
        className={`fixed bottom-12 left-0 right-0 text-center transition-opacity duration-700 ${
          showHint && !split ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/30 text-sm font-sans tracking-widest uppercase animate-pulse">
          Click to enter
        </span>
      </div>
    </div>
  )
}
