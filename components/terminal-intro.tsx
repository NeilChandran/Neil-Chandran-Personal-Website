"use client"

import { useState, useEffect } from "react"

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Show NC briefly then exit fast
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 400)
    }, 800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-400 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1
        className="font-mono text-green-400 text-6xl md:text-8xl font-bold tracking-widest"
        style={{ textShadow: "0 0 20px rgba(74,222,128,0.5), 0 0 40px rgba(74,222,128,0.2)" }}
      >
        NC
      </h1>
    </div>
  )
}
