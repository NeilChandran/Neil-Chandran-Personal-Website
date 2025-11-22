"use client"

import { useState, useEffect } from "react"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    // Get current count from localStorage
    const currentCount = Number.parseInt(localStorage.getItem("visitorCount") || "0", 10)
    const hasVisitedThisSession = sessionStorage.getItem("hasVisited")

    // Only increment if this is a new session
    if (!hasVisitedThisSession) {
      const newCount = currentCount + 1
      localStorage.setItem("visitorCount", newCount.toString())
      sessionStorage.setItem("hasVisited", "true")
      setCount(newCount)
    } else {
      setCount(currentCount)
    }
  }, [])

  if (count === null) return null

  return (
    <div className="fixed bottom-6 left-6 text-sm text-foreground/60 font-mono">
      visitors: {count.toString().padStart(6, "0")}
    </div>
  )
}
