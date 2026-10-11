"use client"

import { useEffect, useRef, useState } from "react"

const SESSION_KEY = "hedwig-owl-flown"
const FLIGHT_MS = 3400
/** How long the night-to-day color transition runs after landing. */
const DAWN_MS = 1500
/** Fraction of the flight image's height taken up by the owl's body. */
const BODY_FRACTION = 0.5
/** Vertical center of the owl's body within the flight image (0..1). */
const BODY_CENTER_Y = 0.536

/**
 * On the first open of a session: night falls (deep Gotham sky with stars),
 * the Hedwig owl flaps across it, and as it lands on the inline mark next to
 * "Hedwig" ([data-hedwig-perch]) dawn breaks — the page transitions to the
 * light theme. The theme toggle keeps working afterwards. Plays once per
 * session; skipped under prefers-reduced-motion.
 */
export function HedwigFlyover() {
  const [flying, setFlying] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

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
    // Position the owl's center at (cx, cy).
    const at = (cx: number, cy: number, deg: number, scale = 1) =>
      `translate(${cx - bw / 2}px, ${cy - bh / 2}px) rotate(${deg}deg) scale(${scale})`

    const perch = document.querySelector<HTMLElement>("[data-hedwig-perch]")
    let revealPerch = () => {}
    let frames: Keyframe[]

    if (perch) {
      const pr = perch.getBoundingClientRect()
      const pcx = pr.left + pr.width / 2
      // Scale so the owl's BODY (not the wingspan) matches the perched mark.
      const endScale = Math.max(0.06, pr.height / (bh * BODY_FRACTION))
      // Land with the body's center, which sits below the image center, on
      // the perch's center.
      const pcy = pr.top + pr.height / 2 - (BODY_CENTER_Y - 0.5) * bh * endScale
      const cruiseY = Math.max(90, pcy - vh * 0.26)
      perch.style.visibility = "hidden"
      revealPerch = () => {
        perch.style.visibility = ""
      }
      // Glide in from the left, cross the page, then curve down onto the perch.
      frames = [
        { transform: at(-bw * 0.7, cruiseY + 30, -4), offset: 0, easing: "cubic-bezier(0.3, 0, 0.55, 1)" },
        { transform: at(vw * 0.45, cruiseY - 16, 4), offset: 0.34, easing: "cubic-bezier(0.5, 0, 0.5, 1)" },
        { transform: at(vw * 0.8, cruiseY + vh * 0.1, 5), offset: 0.6, easing: "cubic-bezier(0.4, 0, 0.35, 1)" },
        { transform: at(pcx + 120, pcy - 60, -4, 0.5), offset: 0.85, easing: "cubic-bezier(0.35, 0, 0.4, 1)" },
        { transform: at(pcx, pcy, 0, endScale), offset: 1 },
      ]
    } else {
      // No perch on the page: glide across and exit right.
      frames = [
        { transform: at(-bw * 0.7, vh * 0.2, -4), easing: "ease-in-out" },
        { transform: at(vw + bw, vh * 0.14, 5) },
      ]
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
      <div
        ref={boxRef}
        className="hedwig-flyover pointer-events-none fixed left-0 top-0 z-[90] w-fit text-[150px] text-foreground md:text-[190px]"
        style={{ transform: "translate(-150vw, 0)" }}
        aria-hidden="true"
      >
        <div className="hedwig-flyover__bob relative h-[1em] w-[1em] overflow-hidden">
          {/* Flappy-bird flap: one 4-cell sprite sheet (up, mid, down, mid)
              stepped by a single animation, so frames can never overlap. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hedwig-owl-flight-sprite.png"
            alt=""
            draggable={false}
            className="hedwig-flyover__strip absolute left-0 top-0 h-full w-auto max-w-none select-none invert dark:invert-0"
          />
        </div>
      </div>
    </>
  )
}
