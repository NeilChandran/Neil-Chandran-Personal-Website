import { Navigation } from "@/components/navigation"

const experiences = [
  {
    title: "Venture Scout",
    company: "Afore Capital",
    period: "September 2025 - Present",
    description:
      "Sourced and evaluated early-stage founders for Afore Capital's $500M pre-seed fund, focusing on student-led startups at Stanford, UC Berkeley, and neighboring universities.",
    tags: ["Venture Capital", "Startups", "Networking"],
  },
  {
    title: "Software Development Engineering and Research Intern",
    company: "YouGov",
    period: "May 2024 - Present",
    description:
      "Conducted voter behavior forecasting and created prediction models using R across the 50 states. Performed quantitative analysis on 50,000+ national and state-level data points.",
    tags: ["R", "Python", "Data Analysis"],
  },
  {
    title: "GenAI Student Researcher",
    company: "Meta",
    period: "June 2024 - December 2024",
    description:
      "Analyzed over 10,000 data points from 2000+ participants in 4 countries to assess shifts in public opinion on AI safety, ethics, and user control. Co-authored 2 research papers.",
    tags: ["AI Research", "Data Analysis", "Research"],
  },
  {
    title: "Engineering Intern",
    company: "UC Santa Cruz ASSIST Lab",
    period: "April 2022 - 2024",
    description:
      "Designed and developed Unity-based VR self-care games for Smile Train and UC Santa Cruz, tailored for thousands of children with cleft conditions and disabilities.",
    tags: ["Unity", "C#", "VR Development"],
  },
]

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground tracking-tight">Work Experience</h1>
        <p className="text-xs text-muted-foreground mb-2 tracking-wider uppercase">
          Professional experiences and internships throughout my journey.
        </p>
        <div className="h-px bg-gradient-to-r from-primary/30 to-transparent mb-10" />

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border border-dashed border-border p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-sm font-bold text-foreground">{exp.title}</h3>
                  <p className="text-xs text-primary/70 mt-0.5">{exp.company}</p>
                </div>
                <span className="text-[10px] text-muted-foreground tracking-wider uppercase whitespace-nowrap ml-4">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground mb-3 mt-2">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] tracking-wider uppercase text-primary/70 border border-primary/20"
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
