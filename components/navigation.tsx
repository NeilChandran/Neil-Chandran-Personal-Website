"use client"

import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const htmlElement = document.documentElement
    setIsDark(htmlElement.classList.contains("dark"))
  }, [])

  const handleThemeToggle = () => {
    const htmlElement = document.documentElement
    const newIsDark = !isDark
    if (newIsDark) {
      htmlElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      htmlElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
    setIsDark(newIsDark)
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="py-6">
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
        {!isHomePage && (
          <div className="flex items-center gap-6">
            <Link href="/" className="text-foreground/70 hover:text-foreground text-sm">
              Home
            </Link>
            <Link href="/projects" className="text-foreground/70 hover:text-foreground text-sm">
              Projects
            </Link>
            <Link href="/research" className="text-foreground/70 hover:text-foreground text-sm">
              Research
            </Link>
            <Link href="/hobbies" className="text-foreground/70 hover:text-foreground text-sm">
              Hobbies
            </Link>
          </div>
        )}

        <div className={`flex items-center ${isHomePage ? 'ml-auto' : ''}`}>
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full border border-border hover:bg-muted"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
          </button>
        </div>
      </div>
    </nav>
  )
}
