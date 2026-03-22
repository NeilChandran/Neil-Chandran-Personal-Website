"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Show logo briefly then exit fast
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 400)
    }, 1200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-400 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-4 md:gap-6">
        <span 
          className="font-mono text-5xl md:text-7xl font-bold"
          style={{ 
            color: "#8C1515",
            textShadow: "0 0 20px rgba(140,21,21,0.3), 0 0 40px rgba(140,21,21,0.1)" 
          }}
        >
          N
        </span>
        <div className="relative w-20 h-20 md:w-28 md:h-28">
          <Image
            src="/stanford-logo.png"
            alt="Stanford Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span 
          className="font-mono text-5xl md:text-7xl font-bold"
          style={{ 
            color: "white",
            textShadow: "0 0 20px rgba(0,0,0,0.2), 0 0 40px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.3)",
            WebkitTextStroke: "2px #8C1515"
          }}
        >
          C
        </span>
      </div>
    </div>
  )
}
