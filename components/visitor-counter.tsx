"use client"

import { useState, useEffect } from "react"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/visitors")
        const data = await res.json()
        setCount(data.count)
      } catch (error) {
        console.error("Failed to fetch visitor count:", error)
      }
    }

    fetchCount()
  }, [])

  if (count === null) return null

  return (
    <div className="fixed bottom-6 left-6 text-[10px] text-muted-foreground/50 tracking-widest uppercase">
      sys.visitors: {count.toString().padStart(6, "0")}
    </div>
  )
}
