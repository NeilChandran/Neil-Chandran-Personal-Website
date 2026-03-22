"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { VisitorCounter } from "@/components/visitor-counter"
import { TerminalIntro } from "@/components/terminal-intro"

function StanfordMarquee() {
  // Create logo items for seamless infinite scroll
  const logos = Array.from({ length: 15 })
  
  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none overflow-hidden z-0 h-20">
      {/* Single row scrolling horizontally */}
      <div className="relative flex overflow-hidden h-full items-center">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {logos.map((_, i) => (
            <div key={`a-${i}`} className="flex-shrink-0 mx-8">
              <Image
                src="/stanford-logo.png"
                alt=""
                width={150}
                height={50}
                className="opacity-[0.08] dark:opacity-[0.12]"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-left whitespace-nowrap" aria-hidden="true">
          {logos.map((_, i) => (
            <div key={`b-${i}`} className="flex-shrink-0 mx-8">
              <Image
                src="/stanford-logo.png"
                alt=""
                width={150}
                height={50}
                className="opacity-[0.08] dark:opacity-[0.12]"
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
        <StanfordMarquee />
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
