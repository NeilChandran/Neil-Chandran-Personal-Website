"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const links = [
    { href: "/", label: "home" },
    { href: "/projects", label: "projects" },
    { href: "/research", label: "research" },
    { href: "/hobbies", label: "hobbies" },
  ]

  return (
    <nav className="border-b border-dashed border-border">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-primary/70 text-xs tracking-widest uppercase">
          nc://sys
        </span>

        <div className="flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-wider uppercase transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && <span className="text-primary mr-1">{">"}</span>}
                {link.label}
              </Link>
            )
          })}

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-primary transition-colors ml-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
