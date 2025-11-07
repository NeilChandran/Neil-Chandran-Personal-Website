"use client"

import Link from "next/link"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function Navigation() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const htmlElement = document.documentElement
    setIsDark(htmlElement.classList.contains("dark"))
  }, [])

  const handleThemeToggle = () => {
    const htmlElement = document.documentElement
    if (isDark) {
      htmlElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      htmlElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={handleThemeToggle}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
        </button>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-foreground/80 transition-colors text-sm">
            Home
          </Link>
          <Link href="/projects" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
            Projects
          </Link>
          <Link href="/research" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
            Research
          </Link>
          <Link href="/hobbies" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
            Hobbies
          </Link>
        </div>
      </div>
    </nav>
  )
}
