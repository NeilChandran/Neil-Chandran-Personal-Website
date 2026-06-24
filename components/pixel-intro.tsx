"use client"

import { useEffect, useRef, useState } from "react"
import { Great_Vibes } from "next/font/google"

const cursive = Great_Vibes({ weight: "400", subsets: ["latin"] })

const SESSION_KEY = "pixel-intro-seen"

const NOVA = {
  bg: "#0c1d2b",
  cream: "#e6e2d4",
} as const

const SIGNATURE_WORDS = ["Neil", "Chandran"] as const

const TOTAL_MS = 4200
const FADE_MS = 700

export function PixelIntro() {
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

    requestAnimationFrame(() => setReady(true))

    let fadeTimeout: ReturnType<typeof setTimeout>
    const finishTimeout = setTimeout(() => {
      phaseRef.current = "fading"
      setPhase("fading")
      fadeTimeout = setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "1")
        document.body.style.overflow = ""
        phaseRef.current = "done"
        setPhase("done")
      }, FADE_MS)
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
      <div
        className={`signature-block ${cursive.className} ${ready ? "signature-block--animate" : ""}`}
        style={{ color: NOVA.cream }}
      >
        {SIGNATURE_WORDS.map((word, index) => (
          <span
            key={word}
            className={`signature-word signature-word--${index + 1}`}
          >
            {word}
          </span>
        ))}
        <span className="signature-flourish" aria-hidden="true" />
      </div>
    </div>
  )
}
