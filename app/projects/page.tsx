import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "GridVeda - Edge AI Infrastructure Intelligence",
    description:
      "Edge-deployed AI system for early detection of electrical transformer failures, running fully on-site without cloud dependency. Physics-informed ML pipelines monitor and classify faults across 20+ transformers in real-time with GPU-accelerated inference on NVIDIA hardware.",
    tags: ["Edge AI", "Hackathon"],
    year: "2026",
    badge: "TreeHacks Winner",
    link: "https://devpost.com/software/gridveda",
  },
  {
    title: "PUSHPA - Pyro UAV System",
    description:
      "Smart glasses-controlled drone system for wildfire response with 20x optimized edge compute. Real-time hazard detection without Wi-Fi connectivity for first responders.",
    tags: ["Edge AI", "Hackathon"],
    year: "2025",
    badge: "TreeHacks Winner",
    link: "https://devpost.com/software/pushpa-pyro-uav-system-for-hazard-prevention-assistance",
  },
  {
    title: "Prometheus",
    description:
      "AI-powered O-1 visa application platform helping extraordinary individuals navigate immigration.",
    tags: ["AI", "Immigration"],
    year: "2025",
    link: "https://devpost.com/software/prometheus-cpw2sl",
  },
  {
    title: "CalABLE – California State Treasurer's Office",
    description:
      "Automated financial reporting processes for CalABLE savings program using Excel macros and Python scripts. Developed visual summaries & slidedecks for CA State Treasurer Ma.",
    tags: ["Python", "Excel", "Automation"],
    year: "2024",
  },
  {
    title: "Smile Train VR Self-Care Game",
    description:
      "Designed and developed Unity-based VR self-care games for Smile Train, tailored for thousands of children with cleft conditions and disabilities, integrating adaptive design principles for therapeutic accessibility.",
    tags: ["Unity", "C#", "VR", "Healthcare"],
    year: "2022-2024",
  },
  {
    title: "NeuroBridge - Job Platform for Neurodiversity",
    description:
      "Creating an inclusive employment platform connecting neurodivergent individuals with accommodating employers, featuring AI-powered job matching and workplace accessibility assessments.",
    tags: ["Python", "AI", "Social Impact"],
    year: "2025",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-balance">Projects</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 hover:border-primary/50 transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  {project.badge && (
                    <span className="px-3 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full">
                      {project.badge}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="External link"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={tag} className="text-sm" style={{ color: "var(--link-color)" }}>
                      {tag}{i < project.tags.length - 1 && <span className="mx-1">•</span>}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium flex items-center gap-1 hover:underline"
                    style={{ color: "var(--link-color)" }}
                  >
                    Visit Project <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
