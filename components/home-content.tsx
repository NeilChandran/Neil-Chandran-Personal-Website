"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { OrgLink } from "@/components/org-link"

export function HomeContent() {
  const [isAwardsExpanded, setIsAwardsExpanded] = useState(true)
  const [isFellowshipsExpanded, setIsFellowshipsExpanded] = useState(false)

  const linkClass = "font-medium text-foreground border-b border-dashed border-foreground/40 hover:border-solid hover:border-red-500 pb-[1px]"

  return (
    <div className="space-y-8 pb-32 max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
        Neil Chandran
      </h1>

      <p className="text-lg leading-relaxed">
        I study <strong>Computer Science</strong> and <strong>Mathematics</strong> at{" "}
        <OrgLink href="https://www.stanford.edu/" label="Stanford" />
        .
      </p>

      <p className="text-lg leading-relaxed">
        Currently building{" "}
        <span
          className="inline-block align-middle select-none blur-sm text-foreground/70"
          aria-hidden="true"
        >something</span>{" "}
        and doing multimodal research at{" "}
        <OrgLink href="https://ai.stanford.edu/" label="SAIL" />
        .
      </p>

      <p className="text-lg leading-relaxed">
        Before, I was the youngest intern at{" "}
        <OrgLink href="https://yougov.com/" label="YouGov" />
        , scouted for{" "}
        <OrgLink href="https://afore.vc/" label="Afore Capital" />{" "}
        ($500M AUM), helped with GTM and growth for{" "}
        <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Perplexity
        </a>
        , and worked with the{" "}
        <OrgLink href="https://www.un.org/" label="United Nations" />{" "}
        as a Youth Advisor.
      </p>

      <p className="text-lg leading-relaxed">
        I have done AI, government, policy, and tech research at the{" "}
        <OrgLink href="https://www.hoover.org/" label="Hoover Institution" />
        ,{" "}
        <OrgLink
          href="https://hsph.harvard.edu/"
          label="Harvard T.H. Chan School of Public Health"
        />
        ,{" "}
        <OrgLink href="https://www.ucsc.edu/" label="UC Santa Cruz" />
        , and{" "}
        <OrgLink href="https://fsi.stanford.edu/" label="Stanford FSI" />{" "}
        in partnership with{" "}
        <OrgLink href="https://about.meta.com/" label="Meta" />
        .
      </p>

      <div className="pt-2">
        <button
          onClick={() => setIsAwardsExpanded(!isAwardsExpanded)}
          className="flex items-center gap-2 text-lg font-semibold"
        >
          Awards &amp; Honors
          {isAwardsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isAwardsExpanded && (
          <div className="mt-3 pl-4 border-l-2 border-border">
            <p className="text-base leading-relaxed text-foreground/80">
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
                TreeHacks 1st Place: Sustainability Track
              </a>
              ,{" "}
              <a href="http://www.usaco.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                USA Computing Olympiad Gold
              </a>
              , U.S. Presidential Lifetime Achievement Award, MIT Solve Finalist, U.S. Presidential Scholar Finalist, Hershey Grant Recipient
            </p>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setIsFellowshipsExpanded(!isFellowshipsExpanded)}
          className="flex items-center gap-2 text-lg font-semibold"
        >
          Technical Fellowships
          {isFellowshipsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isFellowshipsExpanded && (
          <div className="mt-3 pl-4 border-l-2 border-border">
            <p className="text-base leading-relaxed text-foreground/80">
              <a href="https://www.zfellows.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                Z Fellow
              </a>
              , Grata Scholar, Hoover Student Fellow
            </p>
          </div>
        )}
      </div>

      <p className="text-lg leading-relaxed">
        Reach out:{" "}
        <a href="mailto:neilchandran@stanford.edu" className={linkClass}>
          neilchandran@stanford.edu
        </a>
        .
      </p>

      <div className="flex items-center gap-4 text-base pt-4">
        <Link href="/projects" className={linkClass}>
          Projects
        </Link>
        <span className="text-foreground/30">|</span>
        <Link href="/research" className={linkClass}>
          Research
        </Link>
        <span className="text-foreground/30">|</span>
        <Link href="/hobbies" className={linkClass}>
          Hobbies
        </Link>
      </div>

      <div className="flex items-center gap-5 pt-2">
        <a
          href="https://x.com/Ne1lChandran"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 hover:text-foreground"
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
          className="text-foreground/60 hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/NeilChandran"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>

      <footer className="pt-12 text-sm text-muted-foreground font-mono">
        &copy; 2026 Neil Chandran.<br />
        All rights reserved.
      </footer>
    </div>
  )
}
