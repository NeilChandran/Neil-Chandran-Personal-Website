"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { VisitorCounter } from "@/components/visitor-counter"
import { TerminalIntro } from "@/components/terminal-intro"

function StanfordSlider() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Sliding Stanford logos in background */}
      <div className="absolute inset-0 flex flex-col justify-around">
        {/* Row 1 - sliding right */}
        <div className="flex animate-slide-right">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`row1-${i}`} className="flex-shrink-0 mx-16">
              <Image
                src="/stanford-logo.png"
                alt=""
                width={60}
                height={60}
                className="opacity-[0.04] dark:opacity-[0.06]"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
        
        {/* Row 2 - sliding left */}
        <div className="flex animate-slide-left">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`row2-${i}`} className="flex-shrink-0 mx-16">
              <Image
                src="/stanford-logo.png"
                alt=""
                width={50}
                height={50}
                className="opacity-[0.03] dark:opacity-[0.05]"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
        
        {/* Row 3 - sliding right slower */}
        <div className="flex animate-slide-right-slow">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`row3-${i}`} className="flex-shrink-0 mx-20">
              <Image
                src="/stanford-logo.png"
                alt=""
                width={70}
                height={70}
                className="opacity-[0.035] dark:opacity-[0.055]"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
        
        {/* Row 4 - sliding left slower */}
        <div className="flex animate-slide-left-slow">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`row4-${i}`} className="flex-shrink-0 mx-14">
              <Image
                src="/stanford-logo.png"
                alt=""
                width={55}
                height={55}
                className="opacity-[0.025] dark:opacity-[0.045]"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [showIntro, setShowIntro] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro")
    if (!hasSeenIntro) {
      setShowIntro(true)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    sessionStorage.setItem("hasSeenIntro", "true")
  }

  if (!mounted) return null

  return (
    <>
      {showIntro && <TerminalIntro onComplete={handleIntroComplete} />}
      <div
        className={`min-h-screen bg-background transition-all duration-500 relative ${
          showIntro ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <StanfordSlider />
        <div className="relative z-10">
          <Navigation />
          <main className="max-w-4xl mx-auto px-6 py-12">
            <HomeContent />
          </main>
          <VisitorCounter />
        </div>
      </div>
    </>
  )
}
