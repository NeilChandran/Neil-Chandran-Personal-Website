"use client"

import { useState, useEffect, useCallback, useRef } from "react"

type Phase =
  | "idle"
  | "username-label"
  | "username"
  | "password-label"
  | "password"
  | "auth"
  | "granted"
  | "welcome"
  | "done"

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [usernameLabel, setUsernameLabel] = useState("")
  const [username, setUsername] = useState("")
  const [passwordLabel, setPasswordLabel] = useState("")
  const [password, setPassword] = useState("")
  const [authDots, setAuthDots] = useState("")
  const [fadeOut, setFadeOut] = useState(false)
  const [welcomeFade, setWelcomeFade] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const CHAR_SPEED = 90
  const LABEL_SPEED = 50

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
        setPhase("welcome")
      }, 800)
      return () => clearTimeout(t)
    }

    if (phase === "welcome") {
      // Fade in the welcome text
      const fadeInTimer = setTimeout(() => setWelcomeFade(true), 50)
      // Hold, then fade out
      const exitTimer = setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setPhase("done")
          onComplete()
        }, 600)
      }, 1200)
      return () => {
        clearTimeout(fadeInTimer)
        clearTimeout(exitTimer)
      }
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

  const showCursor = phase !== "auth" && phase !== "granted" && phase !== "welcome"
  const isWelcome = phase === "welcome"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "#050505",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 600ms ease",
      }}
    >
      {/* Scanlines */}
      <div className="scanlines fixed inset-0 z-10" />

      {/* Skip */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-30 text-[#5eead4]/20 hover:text-[#5eead4]/50 transition-colors font-mono uppercase text-[10px] tracking-[0.3em] px-3 py-1.5"
      >
        Skip
      </button>

      {/* Welcome screen */}
      {isWelcome && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{
            opacity: welcomeFade ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
        >
          <div className="text-center">
            <h1 className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-[#d4d4d4]">
              WELCOME, NEIL
            </h1>
            <div className="mt-4 mx-auto w-24 h-px bg-[#5eead4]/40" />
          </div>
        </div>
      )}

      {/* Login terminal content */}
      {!isWelcome && (
        <div className="font-mono text-sm sm:text-base leading-relaxed z-20 max-w-lg px-8">
          {phase !== "idle" && (
            <div className="flex">
              <span className="text-[#5eead4]/60">{usernameLabel}</span>
              <span className="text-[#d4d4d4]">{username}</span>
              {showCursor && (phase === "username" || phase === "username-label") && (
                <span className="text-[#5eead4] animate-pulse">_</span>
              )}
            </div>
          )}

          {(phase === "password-label" || phase === "password" || phase === "auth" || phase === "granted") && (
            <div className="flex mt-1">
              <span className="text-[#5eead4]/60">{passwordLabel}</span>
              <span className="text-[#d4d4d4]">{password}</span>
              {showCursor && (phase === "password" || phase === "password-label") && (
                <span className="text-[#5eead4] animate-pulse">_</span>
              )}
            </div>
          )}

          {(phase === "auth" || phase === "granted") && (
            <div className="mt-4">
              <span className="text-[#737373]">
                {"AUTHENTICATING"}{authDots}
              </span>
            </div>
          )}

          {phase === "granted" && (
            <div className="mt-2 relative">
              <span className="text-[#5eead4] font-bold tracking-widest">
                ACCESS GRANTED
              </span>
              {/* Subtle glitch line */}
              <div
                className="absolute left-0 right-0 h-px bg-[#5eead4]/30"
                style={{
                  top: "50%",
                  animation: "glitch-line 0.3s ease-out forwards",
                }}
              />
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes glitch-line {
          0% { transform: scaleX(0); opacity: 1; }
          50% { transform: scaleX(1.2); opacity: 0.6; }
          100% { transform: scaleX(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
