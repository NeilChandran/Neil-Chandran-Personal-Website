import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"

const projects = [
  {
    title: "OutsideConnection - Reentry Employment Platform",
    status: "Rise Global Winner",
    description:
      "Scaled a web-based employment platform connecting over 10,000 formerly incarcerated individuals across all 50 states with inclusive job opportunities at companies like Amazon and Microsoft.",
    tags: ["Python", "Excel", "Social Impact"],
    year: "2024-2025",
  },
  {
    title: "CalABLE – California State Treasurer's Office",
    status: "Completed",
    description:
      "Automated financial reporting processes for CalABLE savings program using Excel macros and Python scripts. Developed visual summaries for CA State Treasurer Ma.",
    tags: ["Python", "Excel", "Automation"],
    year: "2024",
  },
  {
    title: "AI Safety & Ethics Research at Meta",
    status: "Published",
    description:
      "Co-authored 2 research papers revealing major shifts in public opinion on AI safety, including a 52% increase in American parent opposition to unrestricted AI use.",
    tags: ["AI Research", "Ethics", "Data Analysis"],
    year: "2024",
  },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Research & Projects</h1>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          Research work, publications, and impactful projects I&apos;ve contributed to.
        </p>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-500">
                      {project.status}
                    </span>
                  </div>
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
