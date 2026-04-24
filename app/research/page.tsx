import { Navigation } from "@/components/navigation"

const research = [
  {
    title: "Presidential Election Forecasting",
    timeline: "2024",
    description: "ML models to predict U.S. presidential elections using polling and demographic data",
    tags: ["Hoover Institution", "Election ML"],
  },
  {
    title: "VR Game for Adolescent Support",
    timeline: "2022 - 2024",
    description: "Unity-based VR self-care games for children with cleft conditions and disabilities",
    tags: ["IEEE ICDH", "UC Santa Cruz", "XR"],
  },
  {
    title: "Public Opinion on AI Chatbots",
    timeline: "2024",
    description: "Research on parents and nonparents view of AI agents on child safety",
    tags: ["Meta", "Stanford", "AI Safety"],
  },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8">Research</h1>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {research.map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                {/* Year */}
                <div className="w-[60px] text-sm text-muted-foreground font-mono text-right shrink-0">
                  {item.timeline.split(" - ")[0]}
                </div>

                {/* Timeline dot */}
                <div className="relative shrink-0">
                  <div className="w-3 h-3 rounded-full bg-accent-color border-2 border-background ring-2 ring-border" />
                </div>

                {/* Content */}
                <div className="pb-2">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                  <div className="flex flex-wrap gap-x-2 mt-1">
                    {item.tags.map((tag, idx) => (
                      <span key={tag} className="text-xs font-semibold" style={{ color: "var(--link-color)" }}>
                        {tag}{idx < item.tags.length - 1 && " •"}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-1">{item.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
