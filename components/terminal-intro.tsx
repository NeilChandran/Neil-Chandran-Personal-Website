"use client"

import { useState, useEffect, useCallback } from "react"

const USERNAME = "neilchandran"
const PASSWORD_MASK = "*********"
const CHAR_DELAY = 90
const AUTH_DELAY = 1200
const GRANTED_DELAY = 800

type Phase =
  | "username-label"
  | "username-typing"
  | "password-label"
  | "password-typing"
  | "authenticating"
  | "granted"
  | "exit"

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("username-label")
  const [typedUsername, setTypedUsername] = useState("")
  const [typedPassword, setTypedPassword] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [exiting, setExiting] = useState(false)

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(interval)
  }, [])

  // Phase: show username label then start typing
  useEffect(() => {
    if (phase === "username-label") {
      const t = setTimeout(() => setPhase("username-typing"), 400)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Type username
  useEffect(() => {
    if (phase !== "username-typing") return
    if (typedUsername.length < USERNAME.length) {
      const t = setTimeout(() => {
        setTypedUsername(USERNAME.slice(0, typedUsername.length + 1))
      }, CHAR_DELAY)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase("password-label"), 300)
    return () => clearTimeout(t)
  }, [phase, typedUsername])

  // Phase: show password label then start typing
  useEffect(() => {
    if (phase === "password-label") {
      const t = setTimeout(() => setPhase("password-typing"), 400)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Type password
  useEffect(() => {
    if (phase !== "password-typing") return
    if (typedPassword.length < PASSWORD_MASK.length) {
      const t = setTimeout(() => {
        setTypedPassword(PASSWORD_MASK.slice(0, typedPassword.length + 1))
      }, CHAR_DELAY)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase("authenticating"), 300)
    return () => clearTimeout(t)
  }, [phase, typedPassword])

  // Authenticating phase
  useEffect(() => {
    if (phase === "authenticating") {
      const t = setTimeout(() => setPhase("granted"), AUTH_DELAY)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Granted phase -> exit
  useEffect(() => {
    if (phase === "granted") {
      const t = setTimeout(() => setPhase("exit"), GRANTED_DELAY)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Exit animation
  useEffect(() => {
    if (phase === "exit") {
      setExiting(true)
      const t = setTimeout(onComplete, 600)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  const handleSkip = useCallback(() => {
    setExiting(true)
    setTimeout(onComplete, 300)
  }, [onComplete])

  const cursor = showCursor ? "\u2588" : "\u00A0"

  const showUsernameLabel = phase !== "username-label" || true
  const showPasswordLine =
    phase === "password-label" ||
    phase === "password-typing" ||
    phase === "authenticating" ||
    phase === "granted" ||
    phase === "exit"
  const showAuth = phase === "authenticating" || phase === "granted" || phase === "exit"
  const showGranted = phase === "granted" || phase === "exit"

  // Determine where cursor goes
  const cursorOnUsername = phase === "username-label" || phase === "username-typing"
  const cursorOnPassword = phase === "password-label" || phase === "password-typing"

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,255,0,0.03) 0px, rgba(0,255,0,0.03) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-20 font-mono text-sm text-green-500/60 hover:text-green-400 transition-colors border border-green-500/30 hover:border-green-400/50 px-3 py-1.5 rounded"
      >
        SKIP
      </button>

      {/* Terminal */}
      <div className="relative z-20 w-full max-w-lg px-8">
        {/* System header */}
        <div className="font-mono text-green-500/50 text-xs mb-6 tracking-widest">
          {">"} CHANDRAN SYSTEMS v2.029 -- SECURE TERMINAL
        </div>

        <div className="font-mono text-green-400 text-base space-y-3 leading-relaxed" style={{ textShadow: "0 0 8px rgba(74,222,128,0.4)" }}>
          {/* Username line */}
          {showUsernameLabel && (
            <div className="flex">
              <span className="text-green-500/70 mr-2">USERNAME:</span>
              <span>
                {typedUsername}
                {cursorOnUsername && <span className="text-green-400">{cursor}</span>}
              </span>
            </div>
          )}

          {/* Password line */}
          {showPasswordLine && (
            <div className="flex">
              <span className="text-green-500/70 mr-2">PASSWORD:</span>
              <span className="tracking-wider">
                {typedPassword}
                {cursorOnPassword && <span className="text-green-400">{cursor}</span>}
              </span>
            </div>
          )}

          {/* Authenticating */}
          {showAuth && (
            <div className="pt-2">
              <span className="text-yellow-400/80" style={{ textShadow: "0 0 6px rgba(250,204,21,0.3)" }}>
                {phase === "authenticating" ? (
                  <span className="animate-pulse">AUTHENTICATING...</span>
                ) : (
                  "AUTHENTICATING..."
                )}
              </span>
            </div>
          )}

          {/* Access granted */}
          {showGranted && (
            <div className="pt-1">
              <span
                className="text-green-300 font-bold tracking-wider"
                style={{ textShadow: "0 0 12px rgba(74,222,128,0.6), 0 0 24px rgba(74,222,128,0.3)" }}
              >
                ACCESS GRANTED
              </span>
            </div>
          )}
        </div>

        {/* Bottom decoration */}
        <div className="font-mono text-green-500/20 text-xs mt-8 tracking-widest">
          {">"} INITIALIZING SESSION...
        </div>
      </div>
    </div>
  )
}
