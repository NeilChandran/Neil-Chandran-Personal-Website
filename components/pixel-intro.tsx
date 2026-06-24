"use client"

import { useEffect, useRef, useState } from "react"
import { Pinyon_Script } from "next/font/google"

const signatureFont = Pinyon_Script({ weight: "400", subsets: ["latin"] })

const SESSION_KEY = "pixel-intro-seen"

const NOVA = {
  bg: "#0c1d2b",
  cream: "#e6e2d4",
} as const

const TOTAL_MS = 4600
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
        className={`signature-jefferson ${signatureFont.className} ${
          ready ? "signature-jefferson--animate" : ""
        }`}
        style={{ color: NOVA.cream }}
      >
        <span className="signature-part signature-part--1" aria-hidden="true">
          <span className="sig-cap">N</span>
          <span className="sig-body">eil</span>
        </span>

        <span className="signature-part signature-part--2" aria-hidden="true">
          <span className="sig-cap sig-cap--c">C</span>
          <span className="sig-body sig-body--long">handran</span>
        </span>

        <svg
          className="signature-tail"
          viewBox="0 0 240 16"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 10 C40 8, 80 6, 130 7 S210 9, 240 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1}
          />
        </svg>

        <span className="sr-only">Neil Chandran</span>
      </div>
    </div>
  )
}
