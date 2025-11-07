"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Linkedin } from "lucide-react"

export function HomeContent() {
  const [isAwardsExpanded, setIsAwardsExpanded] = useState(false)
  const [isFellowshipsExpanded, setIsFellowshipsExpanded] = useState(false)

  return (
    <div className="space-y-8 pb-32">
      <h1 className="text-4xl md:text-5xl font-bold text-balance">Hi, I&apos;m Neil!</h1>

      <p className="text-lg leading-relaxed">
        I&apos;m a student at{" "}
        <a
          href="https://www.stanford.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          Stanford University
        </a>
        .
      </p>

      <p className="text-lg leading-relaxed">
        Currently venture scouting for{" "}
        <a
          href="https://afore.vc/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          Afore Capital
        </a>{" "}
        ($500M AUM - Feel free to reach out if you&apos;re building something cool).
      </p>

      <p className="text-lg leading-relaxed">
        Also, creating prediction and market models @{" "}
        <a
          href="https://yougov.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          YouGov
        </a>
        .
      </p>

      <p className="text-lg leading-relaxed">
        I have done AI, government, policy, and tech research at{" "}
        <a
          href="https://www.stanford.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          Stanford University
        </a>
        ,{" "}
        <a
          href="https://www.hoover.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          Hoover Institution
        </a>
        ,{" "}
        <a
          href="https://hsph.harvard.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          Harvard T.H. Chan School of Public Health
        </a>
        , and{" "}
        <a
          href="https://www.ucsc.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          UC Santa Cruz
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
                className="text-[#4ade80] hover:underline font-semibold"
              >
                Coca-Cola Scholar
              </a>
              ,{" "}
              <a
                href="http://www.usaco.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4ade80] hover:underline font-semibold"
              >
                USACO Gold
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
        <a href="mailto:neilchandran@stanford.edu" className="text-[#6366f1] hover:underline">
          neilchandran@stanford.edu
        </a>
        .
      </p>

      <div className="flex items-center gap-3 text-lg pt-8">
        <Link href="/projects" className="text-[#6366f1] hover:underline">
          Projects
        </Link>
        <span className="text-foreground/50">•</span>
        <Link href="/research" className="text-[#6366f1] hover:underline">
          Research
        </Link>
        <span className="text-foreground/50">•</span>
        <Link href="/hobbies" className="text-[#6366f1] hover:underline">
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
      </div>
    </div>
  )
}
