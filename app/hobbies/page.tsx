import { Navigation } from "@/components/navigation"

const hobbies = [
  {
    title: "Tennis",
    timeline: "2015 - Present",
    image: "/tennis-racquet.jpg",
    description: "4 Years Varsity, Served as Captain",
  },
  {
    title: "Spanish Classical Guitar",
    timeline: "2014 - Present",
    image: "/classical-guitar.jpg",
    description: "",
  },
]

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground tracking-tight">
          Hobbies & Interests
        </h1>
        <p className="text-xs text-muted-foreground mb-2 tracking-wider uppercase">
          What I enjoy doing outside of academics.
        </p>
        <div className="h-px bg-gradient-to-r from-primary/30 to-transparent mb-10" />

        <div className="space-y-6">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="border border-dashed border-border overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="relative">
                <img
                  src={hobby.image || "/placeholder.svg"}
                  alt={hobby.title}
                  className="w-full h-52 object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-foreground">{hobby.title}</h3>
                  <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
                    {hobby.timeline}
                  </span>
                </div>
                {hobby.description && (
                  <p className="text-xs text-muted-foreground">{hobby.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
