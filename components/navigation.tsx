"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "home" },
    { href: "/projects", label: "projects" },
    { href: "/research", label: "research" },
    { href: "/hobbies", label: "hobbies" },
  ]

  return (
    <nav className="border-b border-dashed border-[#262626]">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-[#5eead4]/70 text-xs tracking-widest uppercase">
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
                    ? "text-[#5eead4]"
                    : "text-[#737373] hover:text-[#d4d4d4]"
                }`}
              >
                {isActive && <span className="text-[#5eead4] mr-1">{">"}</span>}
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
