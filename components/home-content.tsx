"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronUp, ChevronDown, Linkedin, Github } from "lucide-react"
import Link from "next/link"

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"

function useTypewriter(text: string, speed: number = 50, startDelay: number = 0, trigger: boolean = true) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!trigger) return
    setDisplayed("")
    setDone(false)
    let i = 0
    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(delayTimeout)
  }, [text, speed, startDelay, trigger])

  return { displayed, done }
}

function ScrambledEmail({ email }: { email: string }) {
  const [revealed, setRevealed] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const animRef = useRef<NodeJS.Timeout | null>(null)
  const iterRef = useRef(0)

  // Initialize with scrambled text
  useEffect(() => {
    setDisplayText(
      email
        .split("")
        .map((c) => (c === "@" || c === "." ? c : characters[Math.floor(Math.random() * characters.length)]))
        .join("")
    )
  }, [email])

  const handleClick = () => {
    if (revealed) return
    setRevealed(true)
    iterRef.current = 0
    const totalIterations = email.length * 3

    if (animRef.current) clearInterval(animRef.current)

    animRef.current = setInterval(() => {
      setDisplayText(
        email
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iterRef.current / 3) return email[index]
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      )
      iterRef.current += 1
      if (iterRef.current >= totalIterations) {
        setDisplayText(email)
        if (animRef.current) clearInterval(animRef.current)
      }
    }, 25)
  }

  return (
    <button
      onClick={handleClick}
      className={`font-semibold transition-colors inline ${
        revealed
          ? "cursor-default"
          : "cursor-pointer hover:opacity-80"
      }`}
      style={{ color: "var(--link-color)" }}
      title={revealed ? email : "Click to reveal email"}
    >
      {revealed ? (
        <a href={`mailto:${email}`} style={{ color: "var(--link-color)" }}>
          {displayText}
        </a>
      ) : (
        <span className="border-b border-dashed border-current">{displayText}</span>
      )}
    </button>
  )
}

export function HomeContent() {
  const [isAwardsExpanded, setIsAwardsExpanded] = useState(true)
  const [isFellowshipsExpanded, setIsFellowshipsExpanded] = useState(false)

  const line1 = useTypewriter("Hi, I'm Neil!", 60, 200)
  const line2 = useTypewriter("I'm a student at Stanford.", 45, 0, line1.done)
  const [showRest, setShowRest] = useState(false)

  useEffect(() => {
    if (line2.done) {
      const t = setTimeout(() => setShowRest(true), 300)
      return () => clearTimeout(t)
    }
  }, [line2.done])

  const linkClass = "hover:underline font-semibold"
  const linkStyle = { color: "var(--link-color)" }

  return (
    <div className="space-y-8 pb-32">
      {/* Line 1: Hi, I'm Neil! -- typewriter */}
      <h1 className="text-4xl md:text-5xl font-bold text-balance">
        {line1.displayed}
        {!line1.done && <span className="animate-pulse">|</span>}
      </h1>

      {/* Line 2: I'm a student at Stanford -- typewriter */}
      {line1.done && (
        <p className="text-lg leading-relaxed">
          {line2.displayed.includes("Stanford") ? (
            <>
              {line2.displayed.split("Stanford")[0]}
              <a href="https://www.stanford.edu/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
                Stanford
              </a>
              {line2.displayed.split("Stanford")[1]}
            </>
          ) : (
            line2.displayed
          )}
          {!line2.done && <span className="animate-pulse">|</span>}
        </p>
      )}

      {/* Everything else fades in after typewriter finishes */}
      <div
        className={`space-y-8 transition-all duration-700 ${
          showRest ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ pointerEvents: showRest ? "auto" : "none" }}
      >
        <p className="text-lg leading-relaxed">
          Currently building{" "}
          <span
            className="inline-block w-24 h-5 rounded bg-gradient-to-r from-gray-200/60 via-gray-300/40 to-gray-200/60 dark:from-gray-600/40 dark:via-gray-500/30 dark:to-gray-600/40 blur-[4px] align-middle"
            aria-hidden="true"
          />{" "}
          and helping with growth for{" "}
          <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            Perplexity
          </a>
          .
        </p>

        <p className="text-lg leading-relaxed">
          Before, I was the youngest intern at{" "}
          <a href="https://yougov.com/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            YouGov
          </a>
          , scouted for{" "}
          <a href="https://afore.vc/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            Afore Capital
          </a>{" "}
          ($500M AUM), and worked with the{" "}
          <a href="https://www.un.org/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            United Nations
          </a>{" "}
          as a Youth Advisor.
        </p>

        <p className="text-lg leading-relaxed">
          I have done AI, government, policy, and tech research at{" "}
          <a href="https://www.hoover.org/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            Hoover Institution
          </a>
          ,{" "}
          <a href="https://hsph.harvard.edu/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            Harvard T.H. Chan School of Public Health
          </a>
          ,{" "}
          <a href="https://www.ucsc.edu/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            UC Santa Cruz
          </a>
          , and{" "}
          <a href="https://fsi.stanford.edu/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            Stanford FSI
          </a>{" "}
          in partnership with{" "}
          <a href="https://about.meta.com/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
            Meta
          </a>
          .
        </p>

        <div className="pt-4">
          <button
            onClick={() => setIsAwardsExpanded(!isAwardsExpanded)}
            className="flex items-center gap-2 text-lg font-semibold hover:text-foreground/80 transition-colors"
          >
            Awards & Honors
            {isAwardsExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>

          {isAwardsExpanded && (
            <div className="mt-6 pl-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                <a
                  href="https://www.coca-colascholarsfoundation.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  style={linkStyle}
                >
                  Coca-Cola Scholar
                </a>
                ,{" "}
                <a href="https://treehacks.com/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
                  TreeHacks 1st Place Winner: Sustainability Track
                </a>
                ,{" "}
                <a href="http://www.usaco.org/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
                  USA Computing Olympiad Gold
                </a>
                , U.S. President&apos;s Lifetime Achievement Award (White House Issued), MIT Solve Global Challenge
                Finalist (1%), U.S. Presidential Scholar Semifinalist, Hershey&apos;s Grant Recipient
              </p>
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={() => setIsFellowshipsExpanded(!isFellowshipsExpanded)}
            className="flex items-center gap-2 text-lg font-semibold hover:text-foreground/80 transition-colors"
          >
            Fellowships
            {isFellowshipsExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>

          {isFellowshipsExpanded && (
            <div className="mt-6 pl-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                Hoover Student Fellow, Grata Private Equity Scholar
              </p>
            </div>
          )}
        </div>

        <p className="text-lg leading-relaxed pt-4">
          Reach out:{" "}
          <ScrambledEmail email="neilchandran@stanford.edu" />
          .
        </p>

        <div className="flex items-center gap-3 text-lg pt-8">
          <Link href="/projects" className={linkClass} style={linkStyle}>
            Projects
          </Link>
          <span className="text-foreground/50">&bull;</span>
          <Link href="/research" className={linkClass} style={linkStyle}>
            Research
          </Link>
          <span className="text-foreground/50">&bull;</span>
          <Link href="/hobbies" className={linkClass} style={linkStyle}>
            Hobbies
          </Link>
        </div>

        <div className="flex items-center gap-6 pt-6">
          <a
            href="https://x.com/Ne1lChandran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors"
            aria-label="X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/neil-chandran-02aa69167/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/NeilChandran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  )
}
