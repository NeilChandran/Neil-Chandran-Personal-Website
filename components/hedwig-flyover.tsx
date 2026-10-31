"use client"

import { useEffect, useRef, useState } from "react"

const SESSION_KEY = "hedwig-owl-flown"
const FLIGHT_MS = 3800
/** How long the night-to-day color transition runs after landing. */
const DAWN_MS = 1500
/** The agent fills nearly its whole image; land it body-for-body on the perch. */
const BODY_FRACTION = 0.94
/** Brightness ramp from zainjavaid.com's ASCII ghost, sparse to dense. */
const GHOST_RAMP = " .,:;+*?%S#@"

/**
 * First open of a session: night falls over Gotham, the Hedwig agent flies
 * across the screen trailing a wisp of ASCII glyphs (zainjavaid.com-style) —
 * then lands beside the name ([data-hedwig-perch]) as dawn breaks
 * into the light theme. Once per session; skipped under
 * prefers-reduced-motion.
 */
export function HedwigFlyover() {
  const [flying, setFlying] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (sessionStorage.getItem(SESSION_KEY) === "1") return
    sessionStorage.setItem(SESSION_KEY, "1")
    setFlying(true)
  }, [])

  useEffect(() => {
    if (!flying) return
    const box = boxRef.current
    if (!box || typeof box.animate !== "function") {
      // The boot script may have painted Gotham already — fall back to the
      // stored theme if the flight can't run.
      const htmlEl = document.documentElement
      htmlEl.classList.remove("hedwig-night")
      try {
        if (localStorage.getItem("theme") === "light") htmlEl.classList.remove("dark")
      } catch {
        // Keep dark as the default.
      }
      setFlying(false)
      return
    }

    // Night falls for the flight, whatever the stored theme preference.
    const html = document.documentElement
    const wasDark = html.classList.contains("dark")
    html.classList.add("dark", "hedwig-night")
    let finished = false

    const { width: bw, height: bh } = box.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    // Position the agent's center at (cx, cy).
    const at = (cx: number, cy: number, deg: number, scale = 1) =>
      `translate(${cx - bw / 2}px, ${cy - bh / 2}px) rotate(${deg}deg) scale(${scale})`

    const perch = document.querySelector<HTMLElement>("[data-hedwig-perch]")
    let revealPerch = () => {}
    let frames: Keyframe[]

    if (perch) {
      const pr = perch.getBoundingClientRect()
      const pcx = pr.left + pr.width / 2
      const pcy = pr.top + pr.height / 2
      const endScale = Math.max(0.05, pr.height / (bh * BODY_FRACTION))
      const cruiseY = Math.max(90, pcy - vh * 0.26)
      perch.style.visibility = "hidden"
      revealPerch = () => {
        perch.style.visibility = ""
      }
      // Fly in from the left, swoop across the screen, then curve down onto
      // the perch beside the name.
      frames = [
        { transform: at(-bw, cruiseY + 40, -6), offset: 0, easing: "cubic-bezier(0.3, 0, 0.55, 1)" },
        { transform: at(vw * 0.42, cruiseY - 30, 5), offset: 0.3, easing: "cubic-bezier(0.5, 0, 0.5, 1)" },
        { transform: at(vw * 0.85, cruiseY + vh * 0.16, 8), offset: 0.58, easing: "cubic-bezier(0.4, 0, 0.35, 1)" },
        { transform: at(pcx + 130, pcy - 70, -6, 0.55), offset: 0.85, easing: "cubic-bezier(0.35, 0, 0.4, 1)" },
        { transform: at(pcx, pcy, 0, endScale), offset: 1 },
      ]
    } else {
      frames = [
        { transform: at(-bw, vh * 0.2, -6), easing: "ease-in-out" },
        { transform: at(vw + bw, vh * 0.14, 5) },
      ]
    }

    // Ghost trail (zainjavaid.com style): ASCII glyphs shed from the agent's
    // back that thin out along a density ramp and drift as they fade.
    const trail = trailRef.current
    let trailRaf = 0
    if (trail) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      trail.width = Math.round(vw * dpr)
      trail.height = Math.round(vh * dpr)
      const ctx = trail.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        type Glyph = { x: number; y: number; vx: number; vy: number; age: number; life: number }
        const glyphs: Glyph[] = []
        let prev: { x: number; y: number } | null = null
        const paint = () => {
          ctx.clearRect(0, 0, vw, vh)
          const r = box.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const cy = r.top + r.height / 2
          if (prev && r.width > 4) {
            const dx = cx - prev.x
            const dy = cy - prev.y
            const speed = Math.hypot(dx, dy) || 1
            // Shed from the trailing edge, opposite the direction of travel.
            const bx = cx - (dx / speed) * r.width * 0.45
            const by = cy - (dy / speed) * r.height * 0.45
            const count = Math.min(6, 2 + Math.round(speed / 4))
            for (let i = 0; i < count; i++) {
              const t = i / count
              glyphs.push({
                x: bx - dx * t + (Math.random() - 0.5) * r.height * 0.5,
                y: by - dy * t + (Math.random() - 0.5) * r.height * 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -0.15 - Math.random() * 0.25,
                age: 0,
                life: 40 + Math.random() * 30,
              })
            }
          }
          prev = { x: cx, y: cy }
          const fontPx = Math.max(7, Math.round(r.height * 0.22))
          ctx.font = `${fontPx}px ui-monospace, "Geist Mono", monospace`
          for (let i = glyphs.length - 1; i >= 0; i--) {
            const g = glyphs[i]
            g.age++
            if (g.age >= g.life) {
              glyphs.splice(i, 1)
              continue
            }
            g.x += g.vx
            g.y += g.vy
            const k = 1 - g.age / g.life
            ctx.fillStyle = `rgba(214, 228, 255, ${(k * 0.85).toFixed(3)})`
            ctx.fillText(GHOST_RAMP[Math.max(1, Math.round(k * (GHOST_RAMP.length - 1)))], g.x, g.y)
          }
          trailRaf = requestAnimationFrame(paint)
        }
        trailRaf = requestAnimationFrame(paint)
      }
    }

    const animation = box.animate(frames, { duration: FLIGHT_MS, fill: "forwards" })
    animation.onfinish = () => {
      finished = true
      revealPerch()
      // Dawn breaks: smooth transition from night to the light theme.
      html.classList.add("hedwig-dawn")
      html.classList.remove("hedwig-night", "dark")
      try {
        localStorage.setItem("theme", "light")
      } catch {
        // Private browsing: the theme still flips for this page view.
      }
      setTimeout(() => html.classList.remove("hedwig-dawn"), DAWN_MS)
      setFlying(false)
    }
    return () => {
      cancelAnimationFrame(trailRaf)
      animation.onfinish = null
      animation.cancel()
      revealPerch()
      html.classList.remove("hedwig-night")
      // Interrupted mid-flight: restore the theme we started from.
      if (!finished && !wasDark) html.classList.remove("dark")
    }
  }, [flying])

  if (!flying) return null

  return (
    <>
      <canvas ref={trailRef} className="hedwig-flyover__trail" aria-hidden="true" />
      <div
        ref={boxRef}
        className="hedwig-flyover pointer-events-none fixed left-0 top-0 z-[90] w-fit text-[34px] md:text-[42px]"
        style={{ transform: "translate(-150vw, 0)" }}
        aria-hidden="true"
      >
        <div className="hedwig-flyover__bob relative h-[1em] w-[1em]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hedwig-agent.png"
            alt=""
            draggable={false}
            className="hedwig-flyover__agent h-full w-full select-none"
          />
        </div>
      </div>
    </>
  )
}
