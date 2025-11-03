"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Linkedin } from "lucide-react"

export function HomeContent() {
  const [isAwardsExpanded, setIsAwardsExpanded] = useState(false)
  const [isLeadershipExpanded, setIsLeadershipExpanded] = useState(false)

  return (
    <div className="space-y-8 pb-32">
      <h1 className="text-4xl md:text-5xl font-bold text-balance">Hi, I&apos;m Neil!</h1>

      <p className="text-lg leading-relaxed">
        I currently am a student at{" "}
        <a
          href="https://www.stanford.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          Stanford University
        </a>
        , graduating in 2029.
      </p>

      <p className="text-lg leading-relaxed">
        I am a Venture Scout at{" "}
        <a
          href="https://afore.vc/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ade80] hover:underline font-semibold"
        >
          Afore Capital
        </a>
        , where I source and evaluate early-stage founders for their $500M pre-seed fund.
      </p>

      <p className="text-lg leading-relaxed">
        I created{" "}
        <a href="#" className="text-[#4ade80] hover:underline font-semibold">
          OutsideConnection
        </a>
        , a reentry employment platform connecting 10,000+ formerly incarcerated individuals with inclusive job
        opportunities. Awarded Rise Global Winner and Prudential Emerging Visionary.
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
              Coca-Cola Scholar, Prudential Emerging Visionaries Grand Winner, USACO Silver, Presidential Lifetime
              Achievement Award, Rise Global Winner
            </p>
          </div>
        )}
      </div>

      <div className="pt-2">
        <button
          onClick={() => setIsLeadershipExpanded(!isLeadershipExpanded)}
          className="flex items-center gap-2 text-lg font-semibold hover:text-foreground/80 transition-colors"
        >
          Leadership
          {isLeadershipExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>

        {isLeadershipExpanded && (
          <div className="mt-6 pl-6">
            <p className="text-lg leading-relaxed text-foreground/90">
              UN Youth Leadership Council Policy Director (worked with US Congress, Senate, UN, & UNESCO to pass 10+
              education bills), Youth Giving Project President (created 3,800+ STEM activity kits, raised $8,000+)
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

      <div className="pt-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Supported By</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 items-center justify-items-center">
          <a
            href="https://yougov.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eY6zlf0IrRKXeu2TD3gAs40c5GsWif.png"
              alt="YouGov"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://about.meta.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
              alt="Meta"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://afore.vc/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-11-03%20at%203.00.56%E2%80%AFPM-LIb55A6EDb7wRuNRpsKzlHbD49javo.png"
              alt="Afore Capital"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.stanford.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png"
              alt="Stanford University"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://hsph.harvard.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-11-03%20at%203.13.42%E2%80%AFPM-GInkwpzDSfu6opigBGGuNYO09Vgb0u.png"
              alt="Harvard T.H. Chan School of Public Health"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.ucsc.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2021-Logo-variation2-XPQg9NI3r1aZkXa0AIgbuLZrXYHq2x.jpg"
              alt="UC Santa Cruz"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.un.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://www.un.org/sites/un2.un.org/files/2021/03/un-logo.png"
              alt="United Nations"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://digitalpromise.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-5f31b78A2h9ZK3n3KCr1HBks1axJhT.png"
              alt="Digital Promise"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.cde.ca.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-w1jwbo8o9Ph9pqMPKqmqxbeqw0E3oH.png"
              alt="California Department of Education"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.whitehouse.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-O9xPPEuX44iQKMyUl8VR4dsA4pJHkP.jpg"
              alt="White House"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 mix-blend-multiply"
            />
          </a>
          <a
            href="https://www.hoover.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-1-Pz6dkdQWTUjCi269hSrji16NRd8Snz.jpg"
              alt="Hoover Institution"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.treasurer.ca.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-20 flex items-center justify-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rJu1A0SP_400x400-gEis1JvsEpaKRGGtuKl0gciVzsiZCm.jpg"
              alt="California State Treasurer's Office"
              className="h-20 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 mix-blend-multiply"
            />
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3 text-lg pt-8">
        <Link href="/projects" className="text-[#6366f1] hover:underline">
          Projects
        </Link>
        <span className="text-foreground/50">•</span>
        <Link href="/research" className="text-[#6366f1] hover:underline">
          Research
        </Link>
        <span className="text-foreground/50">•</span>
        <Link href="/work" className="text-[#6366f1] hover:underline">
          Work
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
