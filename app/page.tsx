import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"

export default function Page() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <HomeContent />
      </main>
    </div>
  )
}
