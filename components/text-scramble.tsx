"use client"

import { useState, useEffect, useRef } from "react"

interface TextScrambleProps {
  text: string
  className?: string
  as?: "span" | "p" | "h1" | "h2" | "h3"
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

export function TextScramble({ text, className = "", as: Component = "span" }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovered, setIsHovered] = useState(false)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const iterationRef = useRef(0)

  useEffect(() => {
    if (isHovered) {
      iterationRef.current = 0
      const iterations = text.length * 2

      if (animationRef.current) {
        clearInterval(animationRef.current)
      }

      animationRef.current = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " "

              if (index < iterationRef.current / 2) {
                return text[index]
              }

              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join(""),
        )

        iterationRef.current += 1

        if (iterationRef.current >= iterations) {
          setDisplayText(text)
          if (animationRef.current) {
            clearInterval(animationRef.current)
          }
        }
      }, 30)
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
      setDisplayText(text)
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isHovered, text])

  return (
    <Component className={className} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {displayText}
    </Component>
  )
}
