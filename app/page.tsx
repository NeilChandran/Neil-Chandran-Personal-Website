"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { VisitorCounter } from "@/components/visitor-counter"
import { TerminalIntro } from "@/components/terminal-intro"

function StanfordMarquee() {
  // Create logo items for seamless infinite scroll
  const logos = Array.from({ length: 20 })
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Multiple rows of scrolling logos */}
      <div className="absolute inset-0 flex flex-col justify-around py-8">
        {/* Row 1 - scrolling left */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-left">
            {logos.map((_, i) => (
              <div key={`r1a-${i}`} className="flex-shrink-0 mx-12">
                <Image
                  src="/stanford-logo.png"
                  alt=""
                  width={120}
                  height={40}
                  className="opacity-[0.06] dark:opacity-[0.08]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-left" aria-hidden="true">
            {logos.map((_, i) => (
              <div key={`r1b-${i}`} className="flex-shrink-0 mx-12">
                <Image
                  src="/stanford-logo.png"
                  alt=""
                  width={120}
                  height={40}
                  className="opacity-[0.06] dark:opacity-[0.08]"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Row 2 - scrolling right */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-right">
            {logos.map((_, i) => (
              <div key={`r2a-${i}`} className="flex-shrink-0 mx-12">
                <Image
                  src="/stanford-logo.png"
                  alt=""
                  width={100}
                  height={33}
                  className="opacity-[0.05] dark:opacity-[0.07]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-right" aria-hidden="true">
            {logos.map((_, i) => (
              <div key={`r2b-${i}`} className="flex-shrink-0 mx-12">
                <Image
                  src="/stanford-logo.png"
                  alt=""
                  width={100}
                  height={33}
                  className="opacity-[0.05] dark:opacity-[0.07]"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Row 3 - scrolling left slower */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-left-slow">
            {logos.map((_, i) => (
              <div key={`r3a-${i}`} className="flex-shrink-0 mx-14">
                <Image
                  src="/stanford-logo.png"
                  alt=""
                  width={140}
                  height={47}
                  className="opacity-[0.055] dark:opacity-[0.075]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-left-slow" aria-hidden="true">
            {logos.map((_, i) => (
              <div key={`r3b-${i}`} className="flex-shrink-0 mx-14">
                <Image
                  src="/stanford-logo.png"
                  alt=""
                  width={140}
                  height={47}
                  className="opacity-[0.055] dark:opacity-[0.075]"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Row 4 - scrolling right slower */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-right-slow">
            {logos.map((_, i) => (
              <div key={`r4a-${i}`} className="flex-shrink-0 mx-10">
                <Image
                  src="/stanford-logo.png"
                  alt=""
                  width={110}
                  height={37}
                  className="opacity-[0.045] dark:opacity-[0.065]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-right-slow" aria-hidden="true">
            {logos.map((_, i) => (
              <div key={`r4b-${i}`} className="flex-shrink-0 mx-10">
                <Image
                  src="/stanford-logo.png"
                  alt=""
                  width={110}
                  height={37}
                  className="opacity-[0.045] dark:opacity-[0.065]"
                />
              </div>
            ))}
          </div>
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
