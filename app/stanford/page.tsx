import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"

const activities = [
  {
    title: "Computer Science & Political Science",
    category: "Academics",
    description: "Pursuing a B.S. in Computer Science and B.A. in Political Science, graduating in 2029.",
  },
  {
    title: "Campus Leadership",
    category: "Activities",
    description:
      "Active in various student organizations and campus initiatives focused on technology and social impact.",
  },
  {
    title: "Hackathons & Competitions",
    category: "Events",
    description: "Regular participant in TreeHacks and other campus hackathons, building innovative solutions.",
  },
  {
    title: "Research Opportunities",
    category: "Research",
    description: "Engaging with faculty and research labs to explore cutting-edge topics in AI and policy.",
  },
]

export default function StanfordPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Stanford Life</h1>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          My academic journey and campus activities at Stanford University, Class of 2029.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <Card key={index} className="p-6 hover:border-primary/50 transition-colors">
              <div className="mb-3">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{activity.category}</span>
                <h3 className="text-xl font-bold mt-2">{activity.title}</h3>
              </div>
              <p className="text-muted-foreground">{activity.description}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
