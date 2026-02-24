import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"

const hobbies = [
  {
    title: "Tennis",
    timeline: "2015 - Present",
    image: "/tennis-racquet.jpg",
    description: "4 Years Varsity, Served as Captain",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Spanish Classical Guitar",
    timeline: "2014 - Present",
    image: "/classical-guitar.jpg",
    description: "",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
]

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Hobbies & Interests</h1>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">What I enjoy doing outside of academics.</p>

        <div className="grid grid-cols-1 gap-6">
          {hobbies.map((hobby, index) => (
            <Card key={index} className={`p-8 bg-gradient-to-br ${hobby.gradient} border-border/50`}>
              <div className="mb-6 rounded-xl overflow-hidden">
                <img src={hobby.image || "/placeholder.svg"} alt={hobby.title} className="w-full h-64 object-cover" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold">{hobby.title}</h3>
                <span className="text-sm text-muted-foreground font-medium">{hobby.timeline}</span>
              </div>
              <p className="text-muted-foreground text-lg">{hobby.description}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
