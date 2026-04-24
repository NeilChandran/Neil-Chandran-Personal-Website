import { Navigation } from "@/components/navigation"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "GridVeda - Edge AI Infrastructure Intelligence",
    timeline: "2026",
    description: "Edge-deployed AI system for early detection of electrical transformer failures",
    tags: ["Edge AI", "Hackathon"],
    badge: "TreeHacks 1st Place Winner",
    link: "https://devpost.com/software/gridveda",
  },
  {
    title: "OutsideConnection - Reentry Employment Platform",
    timeline: "2025",
    description: "Employment platform connecting 10,000+ formerly incarcerated individuals with jobs",
    tags: ["Next.js", "AI", "Social Impact"],
  },
  {
    title: "NeuroBridge - Job Platform for Neurodiversity",
    timeline: "2025",
    description: "Inclusive employment platform for neurodivergent individuals with AI job matching",
    tags: ["Python", "AI", "Social Impact"],
  },
  {
    title: "CalABLE – California State Treasurer's Office",
    timeline: "2024",
    description: "Automated financial reporting for CalABLE savings program",
    tags: ["Python", "Excel", "Automation"],
  },
  {
    title: "Smile Train VR Self-Care Game",
    timeline: "2022 - 2024",
    description: "Unity-based VR self-care games for children with cleft conditions",
    tags: ["Unity", "C#", "VR", "Healthcare"],
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8">Projects</h1>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="flex items-start gap-6">
                {/* Year */}
                <div className="w-[60px] text-sm text-muted-foreground font-mono text-right shrink-0">
                  {project.timeline.split(" - ")[0]}
                </div>

                {/* Timeline dot */}
                <div className="relative shrink-0">
                  <div className="w-3 h-3 rounded-full bg-accent-color border-2 border-background ring-2 ring-border" />
                </div>

                {/* Content */}
                <div className="pb-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      {project.badge && (
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full mt-1">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground shrink-0"
                        aria-label="External link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-x-2 mt-1">
                    {project.tags.map((tag, idx) => (
                      <span key={tag} className="text-xs font-semibold" style={{ color: "var(--link-color)" }}>
                        {tag}{idx < project.tags.length - 1 && " •"}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-1">{project.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
