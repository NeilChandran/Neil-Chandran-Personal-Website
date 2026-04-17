"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Linkedin, Github } from "lucide-react"
import Link from "next/link"

export function HomeContent() {
  const [isAwardsExpanded, setIsAwardsExpanded] = useState(true)
  const [isFellowshipsExpanded, setIsFellowshipsExpanded] = useState(false)

  const linkClass = "hover:underline font-semibold"
  const linkStyle = { color: "var(--link-color)" }

  return (
    <div className="space-y-6 pb-32">
      <h1 className="text-4xl md:text-5xl font-bold text-balance">
        Hi, I&apos;m Neil!
      </h1>

      <p className="text-lg leading-relaxed">
        I&apos;m a student at{" "}
        <a href="https://www.stanford.edu/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
          Stanford
        </a>
        .
      </p>

      <p className="text-lg leading-relaxed">
        Currently building{" "}
        <span
          className="inline-block w-24 h-5 rounded bg-muted align-middle"
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
          className="flex items-center gap-2 text-lg font-semibold"
        >
          Awards &amp; Honors
          {isAwardsExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>

        {isAwardsExpanded && (
          <div className="mt-4 pl-6">
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
          className="flex items-center gap-2 text-lg font-semibold"
        >
          Technical Fellowships
          {isFellowshipsExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>

        {isFellowshipsExpanded && (
          <div className="mt-4 pl-6">
            <p className="text-lg leading-relaxed text-foreground/90">
              <a href="https://www.zfellows.com/" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
                Z Fellow
              </a>
              , Grata Scholar, Hoover Student Fellow
            </p>
          </div>
        )}
      </div>

      <p className="text-lg leading-relaxed pt-4">
        Reach out:{" "}
        <a href="mailto:neilchandran@stanford.edu" className={linkClass} style={linkStyle}>
          neilchandran@stanford.edu
        </a>
        .
      </p>

      <div className="flex items-center gap-3 text-lg pt-6">
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

      <div className="flex items-center gap-6 pt-4">
        <a
          href="https://x.com/Ne1lChandran"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 hover:text-foreground"
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
          className="text-foreground/70 hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://github.com/NeilChandran"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </div>
  )
}
