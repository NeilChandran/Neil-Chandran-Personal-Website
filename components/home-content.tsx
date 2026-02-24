"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { TextScramble } from "./text-scramble"

export function HomeContent() {
  const [isAwardsExpanded, setIsAwardsExpanded] = useState(true)
  const [isFellowshipsExpanded, setIsFellowshipsExpanded] = useState(false)

  const linkClass = "text-primary hover:text-primary/80 hover:underline underline-offset-4 decoration-dashed"

  return (
    <div className="space-y-6 pb-32">
      <div className="mb-8">
        <TextScramble
          text="Hi, I'm Neil!"
          as="h1"
          className="text-2xl md:text-3xl font-bold text-foreground tracking-tight"
        />
        <div className="mt-2 h-px bg-gradient-to-r from-primary/30 to-transparent" />
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        I'm a student at{" "}
        <a href="https://www.stanford.edu/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Stanford
        </a>
        .
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Currently building{" "}
        <span
          className="inline-block w-20 h-4 bg-border align-middle"
          aria-hidden="true"
        />{" "}
        and helping with growth for{" "}
        <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Perplexity
        </a>
        .
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Before, I was the youngest intern at{" "}
        <a href="https://yougov.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          YouGov
        </a>
        , scouted for{" "}
        <a href="https://afore.vc/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Afore Capital
        </a>{" "}
        ($500M AUM), and worked with the{" "}
        <a href="https://www.un.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          United Nations
        </a>{" "}
        as a Youth Advisor.
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground">
        I have done AI, government, policy, and tech research at{" "}
        <a href="https://www.hoover.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Hoover Institution
        </a>
        ,{" "}
        <a href="https://hsph.harvard.edu/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Harvard T.H. Chan School of Public Health
        </a>
        ,{" "}
        <a href="https://www.ucsc.edu/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          UC Santa Cruz
        </a>
        , and{" "}
        <a href="https://fsi.stanford.edu/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Stanford FSI
        </a>{" "}
        in partnership with{" "}
        <a href="https://about.meta.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Meta
        </a>
        .
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-border my-2" />

      {/* Awards */}
      <div>
        <button
          onClick={() => setIsAwardsExpanded(!isAwardsExpanded)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
        >
          <span className="text-primary">{">"}</span>
          Awards & Honors
          {isAwardsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {isAwardsExpanded && (
          <div className="mt-4 pl-4 border-l border-dashed border-border">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <a
                href="https://www.coca-colascholarsfoundation.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Coca-Cola Scholar
              </a>
              ,{" "}
              <a href="https://treehacks.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                TreeHacks Winner: Sustainability Track
              </a>
              ,{" "}
              <a href="http://www.usaco.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                USACO Gold
              </a>
              , U.S. President&apos;s Lifetime Achievement Award (White House Issued), MIT Solve Global Challenge
              Finalist (1%), U.S. Presidential Scholar Semifinalist, Hershey&apos;s Grant Recipient
            </p>
          </div>
        )}
      </div>

      {/* Fellowships */}
      <div>
        <button
          onClick={() => setIsFellowshipsExpanded(!isFellowshipsExpanded)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
        >
          <span className="text-primary">{">"}</span>
          Fellowships
          {isFellowshipsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {isFellowshipsExpanded && (
          <div className="mt-4 pl-4 border-l border-dashed border-border">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Hoover Student Fellow, Grata Private Equity Scholar
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-border my-2" />

      <p className="text-sm leading-relaxed text-muted-foreground">
        Reach out:{" "}
        <a href="mailto:neilchandran@stanford.edu" className={linkClass}>
          neilchandran@stanford.edu
        </a>
        .
      </p>

      <div className="flex items-center gap-4 text-xs uppercase tracking-wider pt-4">
        <Link href="/projects" className="text-primary hover:text-primary/70 transition-colors">
          [projects]
        </Link>
        <span className="text-border">|</span>
        <Link href="/research" className="text-primary hover:text-primary/70 transition-colors">
          [research]
        </Link>
        <span className="text-border">|</span>
        <Link href="/hobbies" className="text-primary hover:text-primary/70 transition-colors">
          [hobbies]
        </Link>
      </div>

      <div className="flex items-center gap-5 pt-4">
        <a
          href="https://x.com/Ne1lChandran"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="X (Twitter)"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/neil-chandran-02aa69167/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/NeilChandran"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}
