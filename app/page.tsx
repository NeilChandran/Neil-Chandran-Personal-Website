"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { VisitorCounter } from "@/components/visitor-counter"
import { TerminalIntro } from "@/components/terminal-intro"

export default function Page() {
  const [showIntro, setShowIntro] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hasSeenIntro = localStorage.getItem("hasSeenIntro")
    if (!hasSeenIntro) {
      setShowIntro(true)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    localStorage.setItem("hasSeenIntro", "true")
  }

  if (!mounted) return null

  return (
    <>
      {showIntro && <TerminalIntro onComplete={handleIntroComplete} />}
      <div
        className={`min-h-screen bg-background transition-all duration-500 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navigation />
        <main className="max-w-3xl mx-auto px-6 py-12">
          <HomeContent />
        </main>
        <VisitorCounter />
      </div>
    </>
  )
}
