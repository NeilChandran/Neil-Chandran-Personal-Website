import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Code, Lightbulb, Users, TrendingUp } from "lucide-react"

const hobbies = [
  {
    title: "Technology Exploration",
    icon: Code,
    description: "Building side projects and exploring new technologies, frameworks, and programming languages.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Innovation & Startups",
    icon: Lightbulb,
    description: "Following the startup ecosystem, attending founder events, and learning about entrepreneurship.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Community Building",
    icon: Users,
    description: "Connecting with like-minded individuals and building communities around shared interests.",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Personal Growth",
    icon: TrendingUp,
    description: "Reading, learning new skills, and continuously improving through various challenges.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
]

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Hobbies & Interests</h1>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          What I enjoy doing outside of academics and work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hobbies.map((hobby, index) => (
            <Card key={index} className={`p-8 bg-gradient-to-br ${hobby.gradient} border-border/50`}>
              <div className="p-3 rounded-xl bg-card w-fit mb-4">
                <hobby.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{hobby.title}</h3>
              <p className="text-muted-foreground">{hobby.description}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
