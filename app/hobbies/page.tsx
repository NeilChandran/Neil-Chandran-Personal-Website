import { Navigation } from "@/components/navigation"

const hobbies = [
  {
    title: "Spanish Classical Guitar",
    timeline: "2014 - Present",
    description: "",
  },
  {
    title: "Tennis",
    timeline: "2015 - Present",
    description: "3 Years Varsity, Captain",
  },
  {
    title: "Pickleball",
    timeline: "2024 - Present",
    description: "",
  },
  {
    title: "Poker",
    timeline: "2025 - Present",
    description: "",
  },
  {
    title: "Pool",
    timeline: "2026 - Present",
    description: "",
  },
]

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8">Hobbies</h1>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {hobbies.map((hobby, index) => (
              <div key={index} className="flex items-start gap-6">
                {/* Year */}
                <div className="w-[60px] text-sm text-muted-foreground font-mono text-right shrink-0">
                  {hobby.timeline.split(" - ")[0]}
                </div>

                {/* Timeline dot */}
                <div className="relative shrink-0">
                  <div className="w-3 h-3 rounded-full bg-accent-color border-2 border-background ring-2 ring-border" />
                </div>

                {/* Content */}
                <div className="pb-2">
                  <h3 className="font-semibold text-foreground">{hobby.title}</h3>
                  {hobby.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">{hobby.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground/60 mt-1">{hobby.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
