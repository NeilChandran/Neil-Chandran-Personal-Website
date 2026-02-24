import { Navigation } from "@/components/navigation"

const projects = [
  {
    title: "CalABLE - California State Treasurer's Office",
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
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#d4d4d4] tracking-tight">Projects</h1>
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
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] tracking-wider uppercase text-[#5eead4]/70 border border-[#5eead4]/20"
                  >
                    {tag}
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
