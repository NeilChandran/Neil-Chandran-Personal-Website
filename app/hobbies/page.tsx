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
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#d4d4d4] tracking-tight">
          Hobbies & Interests
        </h1>
        <p className="text-xs text-[#737373] mb-2 tracking-wider uppercase">
          What I enjoy doing outside of academics.
        </p>
        <div className="h-px bg-gradient-to-r from-[#5eead4]/30 to-transparent mb-10" />

        <div className="space-y-6">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="border border-dashed border-[#262626] overflow-hidden hover:border-[#5eead4]/30 transition-colors"
            >
              <div className="relative">
                <img
                  src={hobby.image || "/placeholder.svg"}
                  alt={hobby.title}
                  className="w-full h-52 object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-[#d4d4d4]">{hobby.title}</h3>
                  <span className="text-[10px] text-[#737373] tracking-wider uppercase">
                    {hobby.timeline}
                  </span>
                </div>
                {hobby.description && (
                  <p className="text-xs text-[#737373]">{hobby.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
