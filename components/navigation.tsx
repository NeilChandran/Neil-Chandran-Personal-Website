"use client"

import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const accentColors = [
  { name: "Blue", light: "#2563EB", dark: "#60A5FA" },
  { name: "Green", light: "#16A34A", dark: "#4ADE80" },
  { name: "Red", light: "#DC2626", dark: "#F87171" },
  { name: "Black", light: "#000000", dark: "#FFFFFF" },
]

export function Navigation() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [activeColor, setActiveColor] = useState("Blue")

  useEffect(() => {
    setMounted(true)
    const htmlElement = document.documentElement
    setIsDark(htmlElement.classList.contains("dark"))
    const savedColor = localStorage.getItem("accentColor") || "Blue"
    setActiveColor(savedColor)
    const color = accentColors.find((c) => c.name === savedColor) || accentColors[0]
    const isDarkMode = htmlElement.classList.contains("dark")
    document.documentElement.style.setProperty("--link-color", isDarkMode ? color.dark : color.light)
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
    const color = accentColors.find((c) => c.name === activeColor) || accentColors[0]
    document.documentElement.style.setProperty("--link-color", newIsDark ? color.dark : color.light)
  }

  const handleColorChange = (colorName: string) => {
    const color = accentColors.find((c) => c.name === colorName)
    if (!color) return
    setActiveColor(colorName)
    localStorage.setItem("accentColor", colorName)
    document.documentElement.style.setProperty("--link-color", isDark ? color.dark : color.light)
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {accentColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color.name)}
                className={`w-4 h-4 rounded-full ${
                  activeColor === color.name
                    ? "ring-2 ring-offset-2 ring-foreground/40 ring-offset-background"
                    : ""
                }`}
                style={{ backgroundColor: isDark ? color.dark : color.light }}
                aria-label={`Set accent color to ${color.name}`}
              />
            ))}
          </div>

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
