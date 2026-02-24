"use client"

import { useState, useEffect, useCallback, useRef } from "react"

type Phase = "idle" | "username-label" | "username" | "password-label" | "password" | "auth" | "granted" | "done"

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [usernameLabel, setUsernameLabel] = useState("")
  const [username, setUsername] = useState("")
  const [passwordLabel, setPasswordLabel] = useState("")
  const [password, setPassword] = useState("")
  const [authDots, setAuthDots] = useState("")
  const [fadeOut, setFadeOut] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const CHAR_SPEED = 90
  const LABEL_SPEED = 50

  // Type a string character by character
  const typeText = useCallback(
    (
      text: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      speed: number,
      onDone: () => void,
    ) => {
      let i = 0
      intervalRef.current = setInterval(() => {
        i++
        setter(text.slice(0, i))
        if (i >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          onDone()
        }
      }, speed)
    },
    [],
  )

  // Sequencer
  useEffect(() => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

    if (phase === "idle") {
      const t = setTimeout(() => setPhase("username-label"), 400)
      return () => clearTimeout(t)
    }

    if (phase === "username-label") {
      typeText("USERNAME: ", setUsernameLabel, LABEL_SPEED, () => {
        setPhase("username")
      })
      return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }

    if (phase === "username") {
      typeText("neilchandran", setUsername, CHAR_SPEED, () => {
        delay(300).then(() => setPhase("password-label"))
      })
      return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }

    if (phase === "password-label") {
      typeText("PASSWORD: ", setPasswordLabel, LABEL_SPEED, () => {
        setPhase("password")
      })
      return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }

    if (phase === "password") {
      typeText("*********", setPassword, CHAR_SPEED, () => {
        delay(400).then(() => setPhase("auth"))
      })
      return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }

    if (phase === "auth") {
      let dotCount = 0
      const dotInterval = setInterval(() => {
        dotCount = (dotCount % 3) + 1
        setAuthDots(".".repeat(dotCount))
      }, 350)

      const timeout = setTimeout(() => {
        clearInterval(dotInterval)
        setPhase("granted")
      }, 1400)

      return () => {
        clearInterval(dotInterval)
        clearTimeout(timeout)
      }
    }

    if (phase === "granted") {
      const t = setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setPhase("done")
          onComplete()
        }, 500)
      }, 800)
      return () => clearTimeout(t)
    }
  }, [phase, typeText, onComplete])

  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (intervalRef.current) clearInterval(intervalRef.current)
      setFadeOut(true)
      setTimeout(() => {
        setPhase("done")
        onComplete()
      }, 200)
    },
    [onComplete],
  )

  if (phase === "done") return null

  const showCursor = phase !== "auth" && phase !== "granted"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "#050505",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 500ms ease",
      }}
    >
      {/* Faint scanlines */}
      <div className="scanlines fixed inset-0 z-10" />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-30 text-[#5eead4]/20 hover:text-[#5eead4]/50 transition-colors font-mono uppercase text-[10px] tracking-[0.3em] px-3 py-1.5"
      >
        Skip
      </button>

      {/* Terminal content */}
      <div className="font-mono text-sm sm:text-base leading-relaxed z-20 max-w-lg px-8">
        {/* Username line */}
        {phase !== "idle" && (
          <div className="flex">
            <span className="text-[#5eead4]/60">{usernameLabel}</span>
            <span className="text-[#d4d4d4]">{username}</span>
            {showCursor && phase === "username" && (
              <span className="text-[#5eead4] animate-pulse">_</span>
            )}
            {showCursor && phase === "username-label" && (
              <span className="text-[#5eead4] animate-pulse">_</span>
            )}
          </div>
        )}

        {/* Password line */}
        {(phase === "password-label" || phase === "password" || phase === "auth" || phase === "granted") && (
          <div className="flex mt-1">
            <span className="text-[#5eead4]/60">{passwordLabel}</span>
            <span className="text-[#d4d4d4]">{password}</span>
            {showCursor && (phase === "password" || phase === "password-label") && (
              <span className="text-[#5eead4] animate-pulse">_</span>
            )}
          </div>
        )}

        {/* Authenticating */}
        {(phase === "auth" || phase === "granted") && (
          <div className="mt-4">
            <span className="text-[#737373]">
              {"AUTHENTICATING"}{authDots}
            </span>
          </div>
        )}

        {/* Access granted */}
        {phase === "granted" && (
          <div className="mt-2">
            <span className="text-[#5eead4] font-bold tracking-widest">
              ACCESS GRANTED
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
