"use client"

import { useCallback } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Hero() {
  const handleUploadClick = useCallback(() => {
    const target = document.getElementById("upload")
    if (!target) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    })
  }, [])

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative isolate overflow-hidden px-6 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#ffd9ff]/20 blur-[110px]" />
        <div className="absolute right-[10%] top-[10%] h-[180px] w-[180px] rounded-full bg-[#ffe7da]/15 blur-[80px]" />
        <div className="absolute left-[12%] bottom-[-18%] h-[260px] w-[260px] rounded-full bg-[#ffd6ff]/18 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center motion-safe:animate-[heroFade_1.6s_ease-out]">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#ffe7da]/35 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#ffe7da]/80 shadow-[0_16px_42px_rgba(56,25,50,0.35)] backdrop-blur-2xl">
          <span className="inline-flex size-2 rounded-full bg-[#ffd8ff]"></span>
          Whiteboard.AI
        </div>

        <h1
          id="hero-headline"
          className="bg-[linear-gradient(120deg,#ffe7da_0%,#fbd0ff_45%,#ffd8a4_75%,#ffe7da_100%)] bg-[length:200%_200%] bg-clip-text text-4xl font-semibold leading-[1.08] text-transparent sm:text-5xl lg:text-6xl motion-safe:animate-[heroShimmer_6s_linear_infinite]"
        >
          Transform whiteboard chaos into structured brilliance.
        </h1>

        <p className="text-lg leading-8 text-[#ffe7da]/85">
          <span className="block">
            Whiteboard.AI turns your photos of messy brainstorms into clean, editable documents — complete with
            summaries, insights, and next steps.
          </span>
          <span className="mt-3 block">Save time. Never lose an idea again.</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            id="cta-upload"
            aria-label="Upload a whiteboard photo"
            onClick={handleUploadClick}
            className="rounded-full bg-gradient-to-r from-[#ffe0ff] via-[#fbd0ff] to-[#ffd9a4] px-8 py-3 text-sm font-semibold text-[#381932] shadow-[0_18px_40px_rgba(255,210,255,0.45)] transition duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_26px_60px_rgba(255,210,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd9ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#381932]"
          >
            Upload Whiteboard
          </Button>

          <Button
            variant="outline"
            asChild
            className="rounded-full border-[#ffe7da]/40 bg-white/10 px-8 py-3 text-sm font-semibold text-[#ffe7da] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-[2px] hover:border-[#ffe0ff]/60 hover:bg-[#fff3e6]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd9ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#381932]"
          >
            <Link href="#demo">See Demo</Link>
          </Button>
        </div>

        <p className="text-sm font-medium text-[#ffe7da]/70">
          ✦ Powered by OpenAI Vision — built for teams, students, and creators.
        </p>
      </div>
    </section>
  )
}
