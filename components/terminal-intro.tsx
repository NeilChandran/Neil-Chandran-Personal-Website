"use client"

import { useState, useCallback, useEffect, useRef } from "react"

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [split, setSplit] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const particlesRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const splitTriggered = useRef(false)

  // Particle system
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number }[] = []

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 300,
        y: canvas.height / 2 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
        life: Math.random(),
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.life += 0.003
        if (p.life > 1) p.life = 0

        const pulse = Math.sin(p.life * Math.PI) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * pulse})`
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Show hint after delay
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 800)
    return () => clearTimeout(t)
  }, [])

  // Loading bar animation after split
  useEffect(() => {
    if (!split) return
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      setLoadingProgress(progress)
    }, 100)
    return () => clearInterval(interval)
  }, [split])

  const handleClick = useCallback(() => {
    if (splitTriggered.current) return
    splitTriggered.current = true
    setSplit(true)
    setTimeout(() => setFadeOut(true), 1200)
    setTimeout(onComplete, 1700)
  }, [onComplete])

  const handleKeyDown = useCallback(() => {
    handleClick()
  }, [handleClick])

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

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ cursor: split ? "default" : "pointer" }}
    >
      {/* Ambient particles */}
      <canvas ref={particlesRef} className="pointer-events-none fixed inset-0 z-0" />

      {/* Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(255,255,255,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Floor reflection */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 58%, rgba(255,255,255,0.015) 68%, transparent 85%)",
        }}
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-20 text-sm text-white/25 hover:text-white/60 transition-colors px-3 py-1.5 rounded font-mono tracking-wider uppercase"
      >
        Skip
      </button>

      {/* NC Letters */}
      <div className="relative z-10 flex items-end justify-center">
        {/* N */}
        <div
          style={{
            transition: split ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out" : "none",
            transform: split ? "translateX(-110vw) rotate(-20deg) scale(0.8)" : "translateX(0) rotate(0) scale(1)",
            opacity: split ? 0 : 1,
          }}
        >
          <span
            className="text-[11rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-black leading-none select-none block"
            style={{
              color: "#E8A830",
              textShadow: `
                3px 3px 0 rgba(180,120,10,1),
                6px 6px 0 rgba(140,90,5,0.8),
                9px 9px 0 rgba(100,60,0,0.5),
                0 0 60px rgba(232,168,48,0.15),
                0 0 120px rgba(232,168,48,0.05)
              `,
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
              WebkitTextStroke: "1px rgba(255,220,140,0.15)",
            }}
          >
            N
          </span>
        </div>

        {/* C - overlapping, offset down */}
        <div
          className="-ml-6 sm:-ml-8 md:-ml-12 mb-2 sm:mb-3 md:mb-4"
          style={{
            transition: split ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out" : "none",
            transform: split ? "translateX(110vw) rotate(20deg) scale(0.8)" : "translateX(0) rotate(0) scale(1)",
            opacity: split ? 0 : 1,
          }}
        >
          <span
            className="text-[9rem] sm:text-[11rem] md:text-[14rem] lg:text-[17rem] font-black leading-none select-none block"
            style={{
              color: "#4DB8D1",
              textShadow: `
                3px 3px 0 rgba(40,140,165,1),
                6px 6px 0 rgba(25,100,130,0.8),
                9px 9px 0 rgba(15,70,95,0.5),
                0 0 60px rgba(77,184,209,0.15),
                0 0 120px rgba(77,184,209,0.05)
              `,
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
              WebkitTextStroke: "1px rgba(140,220,240,0.15)",
            }}
          >
            C
          </span>
        </div>
      </div>

      {/* Bottom area: hint or loading bar */}
      <div className="fixed bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-4">
        {/* Loading bar - shows after split */}
        {split && (
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/40 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        )}

        {/* Click hint or LOADING text */}
        <span
          className={`text-sm font-mono tracking-[0.3em] uppercase transition-opacity duration-500 ${
            split ? "text-white/20 opacity-100" : showHint ? "text-white/25 opacity-100 animate-pulse" : "opacity-0"
          }`}
        >
          {split ? "Loading..." : "Click to start"}
        </span>
      </div>
    </div>
  )
}
