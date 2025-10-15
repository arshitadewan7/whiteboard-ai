"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

const phrases = [
  "Organized Knowledge",
  "Frictionless Handoffs",
  "Instant Clarity",
  "Future-Proof Notes",
  "Cosmic Insights",
]

interface KineticHeadingProps {
  className?: string
}

export function KineticHeading({ className }: KineticHeadingProps) {
  const [index, setIndex] = useState(0)

  const activePhrase = useMemo(() => phrases[index], [index])

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 3400)

    return () => {
      window.clearInterval(id)
    }
  }, [])

  return (
    <span className={cn("kinetic-viewport min-h-[3.5rem] text-balance", className)}>
      <span
        key={activePhrase}
        className="kinetic-word bg-clip-text text-transparent bg-gradient-to-r from-[#ffe0ff] via-[#ffe7da] to-[#d9a3ff] text-4xl font-semibold leading-tight"
      >
        {activePhrase}
      </span>
    </span>
  )
}
