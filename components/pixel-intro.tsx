"use client"

import { useEffect, useRef, useState } from "react"

const SESSION_KEY = "pixel-intro-seen"

const NOVA = {
  bg: "#0c1d2b",
  cream: "#e6e2d4",
  creamMuted: "#c8c4b8",
} as const

type StrokeSpec = {
  id: string
  d: string
  width: number
  delay: number
  duration: number
}

/** Hand-drawn heraldic shield — stroke paths only, no raster image */
const STROKES: StrokeSpec[] = [
  {
    id: "outer-top-l",
    d: "M 100 28 L 62 40",
    width: 2.2,
    delay: 0,
    duration: 0.35,
  },
  {
    id: "outer-top-r",
    d: "M 100 28 L 138 40",
    width: 2.2,
    delay: 0.08,
    duration: 0.35,
  },
  {
    id: "outer-left",
    d: "M 62 40 Q 48 46 46 62 L 40 162 Q 40 182 100 212",
    width: 2.2,
    delay: 0.2,
    duration: 0.75,
  },
  {
    id: "outer-right",
    d: "M 138 40 Q 152 46 154 62 L 160 162 Q 160 182 100 212",
    width: 2.2,
    delay: 0.35,
    duration: 0.75,
  },
  {
    id: "inner-top-l",
    d: "M 100 38 L 70 48",
    width: 1.6,
    delay: 0.55,
    duration: 0.28,
  },
  {
    id: "inner-top-r",
    d: "M 100 38 L 130 48",
    width: 1.6,
    delay: 0.62,
    duration: 0.28,
  },
  {
    id: "inner-left",
    d: "M 70 48 Q 58 54 56 66 L 52 158 Q 52 172 100 196",
    width: 1.6,
    delay: 0.72,
    duration: 0.6,
  },
  {
    id: "inner-right",
    d: "M 130 48 Q 142 54 144 66 L 148 158 Q 148 172 100 196",
    width: 1.6,
    delay: 0.85,
    duration: 0.6,
  },
  {
    id: "fold",
    d: "M 100 44 L 100 200",
    width: 1.4,
    delay: 1.15,
    duration: 0.5,
  },
  {
    id: "chevron-l",
    d: "M 100 28 L 94 32",
    width: 1.2,
    delay: 0.12,
    duration: 0.18,
  },
  {
    id: "chevron-r",
    d: "M 100 28 L 106 32",
    width: 1.2,
    delay: 0.16,
    duration: 0.18,
  },
]

const FILLS = [
  {
    id: "fill-left",
    d: "M 100 38 L 70 48 Q 58 54 56 66 L 52 158 Q 52 172 100 196 L 100 44 Z",
    delay: 1.55,
  },
  {
    id: "fill-right",
    d: "M 100 38 L 130 48 Q 142 54 144 66 L 148 158 Q 148 172 100 196 L 100 44 Z",
    delay: 1.65,
  },
]

const TOTAL_MS = 2800

export function PixelIntro() {
  const svgRef = useRef<SVGSVGElement>(null)
  const phaseRef = useRef<"idle" | "playing" | "fading" | "done">("idle")
  const [phase, setPhase] = useState<"idle" | "playing" | "fading" | "done">("idle")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1"

    if (prefersReducedMotion || alreadySeen) {
      phaseRef.current = "done"
      setPhase("done")
      return
    }

    phaseRef.current = "playing"
    setPhase("playing")
    document.body.style.overflow = "hidden"

    let fadeTimeout: ReturnType<typeof setTimeout>
    let finishTimeout: ReturnType<typeof setTimeout>

    const setupPaths = () => {
      const svg = svgRef.current
      if (!svg) return false

      svg.querySelectorAll<SVGPathElement>(".intro-stroke").forEach((path) => {
        const spec = STROKES.find((s) => s.id === path.id)
        if (!spec) return
        const length = path.getTotalLength()
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
        path.style.setProperty("--draw-duration", `${spec.duration}s`)
        path.style.setProperty("--draw-delay", `${spec.delay}s`)
      })

      svg.querySelectorAll<SVGPathElement>(".intro-fill").forEach((path) => {
        const spec = FILLS.find((f) => f.id === path.id)
        if (!spec) return
        path.style.opacity = "0"
        path.style.setProperty("--fill-delay", `${spec.delay}s`)
      })

      requestAnimationFrame(() => setReady(true))
      return true
    }

    if (!setupPaths()) {
      requestAnimationFrame(setupPaths)
    }

    finishTimeout = setTimeout(() => {
      phaseRef.current = "fading"
      setPhase("fading")
      fadeTimeout = setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "1")
        document.body.style.overflow = ""
        phaseRef.current = "done"
        setPhase("done")
      }, 700)
    }, TOTAL_MS)

    return () => {
      clearTimeout(fadeTimeout)
      clearTimeout(finishTimeout)
      document.body.style.overflow = ""
    }
  }, [])

  if (phase === "done") return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: NOVA.bg }}
      aria-hidden={phase === "fading"}
      role="presentation"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 200 240"
        className="w-[min(42vw,180px)] h-auto"
        aria-label="Shield"
      >
        {FILLS.map((fill) => (
          <path
            key={fill.id}
            id={fill.id}
            d={fill.d}
            fill={fill.id === "fill-left" ? NOVA.cream : NOVA.creamMuted}
            stroke="none"
            className={`intro-fill ${ready ? "intro-fill--animate" : ""}`}
          />
        ))}
        {STROKES.map((stroke) => (
          <path
            key={stroke.id}
            id={stroke.id}
            d={stroke.d}
            fill="none"
            stroke={NOVA.cream}
            strokeWidth={stroke.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`intro-stroke ${ready ? "intro-stroke--animate" : ""}`}
          />
        ))}
      </svg>
    </div>
  )
}
