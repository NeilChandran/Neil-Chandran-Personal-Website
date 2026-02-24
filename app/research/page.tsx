import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"

const projects = [
  {
    title: "Presidential Election Forecasting",
    description:
      "Developed machine learning models to predict outcomes of U.S. presidential elections using polling and demographic data.",
    tags: ["Hoover Institution", "Election ML"],
    year: "2024",
  },
  {
    title: "VR Game for Adolescent Support",
    description:
      "Developed Unity-based VR self-care games designed for children with cleft conditions and disabilities. Integrated adaptive design principles for therapeutic accessibility.",
    tags: ["IEEE ICDH", "UC Santa Cruz", "XR"],
    year: "2022-2024",
  },
  {
    title: "Public Opinion on AI Chatbots",
    description: "Research on parents and nonparents view of AI agents on child safety.",
    tags: ["Meta", "Stanford", "AI Safety"],
    year: "2024",
  },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-balance">Research</h1>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="text-sm">
                {project.tags.map((tag, idx) => (
                  <span key={tag}>
                    <span className="text-blue-400">{tag}</span>
                    {idx < project.tags.length - 1 && <span className="text-muted-foreground"> • </span>}
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
