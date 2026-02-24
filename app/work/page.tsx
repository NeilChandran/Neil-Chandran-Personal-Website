import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"

const experiences = [
  {
    title: "Venture Scout",
    company: "Afore Capital",
    period: "September 2025 – Present",
    description:
      "Sourced and evaluated early-stage founders for Afore Capital's $500M pre-seed fund, focusing on student-led startups at Stanford, UC Berkeley, and neighboring universities.",
    tags: ["Venture Capital", "Startups", "Networking"],
  },
  {
    title: "Software Development Engineering and Research Intern",
    company: "YouGov",
    period: "May 2024 – Present",
    description:
      "Conducted voter behavior forecasting and created prediction models using R across the 50 states. Performed quantitative analysis on 50,000+ national and state-level data points.",
    tags: ["R", "Python", "Data Analysis"],
  },
  {
    title: "GenAI Student Researcher",
    company: "Meta",
    period: "June 2024 – December 2024",
    description:
      "Analyzed over 10,000 data points from 2000+ participants in 4 countries to assess shifts in public opinion on AI safety, ethics, and user control. Co-authored 2 research papers.",
    tags: ["AI Research", "Data Analysis", "Research"],
  },
  {
    title: "Engineering Intern",
    company: "UC Santa Cruz ASSIST Lab",
    period: "April 2022 – 2024",
    description:
      "Designed and developed Unity-based VR self-care games for Smile Train and UC Santa Cruz, tailored for thousands of children with cleft conditions and disabilities.",
    tags: ["Unity", "C#", "VR Development"],
  },
]

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Work Experience</h1>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          Professional experiences and internships throughout my journey.
        </p>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">{exp.period}</span>
              </div>
              <p className="text-muted-foreground mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
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
