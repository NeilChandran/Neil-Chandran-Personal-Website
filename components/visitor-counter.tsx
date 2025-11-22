"use client"

import { useState, useEffect } from "react"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        // First, get the current count
        const getRes = await fetch("/api/visitors")
        const getData = await getRes.json()

        // Check if we need to increment (API will check cookie)
        const postRes = await fetch("/api/visitors", { method: "POST" })
        const postData = await postRes.json()

        setCount(postData.count)
      } catch (error) {
        console.error("Failed to fetch visitor count:", error)
      }
    }

    fetchCount()
  }, [])

  if (count === null) return null

  return (
    <div className="fixed bottom-6 left-6 text-sm text-foreground/60 font-mono">
      visitors: {count.toString().padStart(6, "0")}
    </div>
  )
}
