import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { VisitorCounter } from "@/components/visitor-counter"
import { HedwigFlyover } from "@/components/hedwig-flyover"
import { SceneBackground } from "@/components/scene-background"

export default function Page() {
  return (
    <div className="min-h-screen">
      <SceneBackground />
      <HedwigFlyover />
      <Navigation />
      <main className="max-w-2xl mx-auto px-6 py-8">
        <HomeContent />
      </main>
      <VisitorCounter />
    </div>
  )
}
