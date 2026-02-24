import { Navigation } from "@/components/navigation"

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
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#d4d4d4] tracking-tight">Research</h1>
        <div className="h-px bg-gradient-to-r from-[#5eead4]/30 to-transparent mb-10" />

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-dashed border-[#262626] p-5 hover:border-[#5eead4]/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-[#d4d4d4]">{project.title}</h3>
                <span className="text-[10px] text-[#737373] tracking-wider uppercase ml-4 shrink-0">
                  {project.year}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#737373] mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wider uppercase text-[#5eead4]/70"
                  >
                    {tag}
                    {idx < project.tags.length - 1 && (
                      <span className="text-[#262626] ml-2">{"/"}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
