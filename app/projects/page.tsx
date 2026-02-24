import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"

const projects = [
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

        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{project.year}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
