import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { VisitorCounter } from "@/components/visitor-counter"
import { PixelIntro } from "@/components/pixel-intro"

export default function Page() {
  return (
    <>
      <PixelIntro />
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-2xl mx-auto px-6 py-8">
          <HomeContent />
        </main>
        <VisitorCounter />
      </div>
    </>
  )
}
