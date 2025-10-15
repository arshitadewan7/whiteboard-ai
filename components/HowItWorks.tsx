"use client"

import { Camera, Brain, FileText, Share2 } from "lucide-react"

const steps = [
  {
    icon: Camera,
    title: "Snap It",
    description: "Upload a photo of your whiteboard or brainstorming wall.",
  },
  {
    icon: Brain,
    title: "AI Reads Everything",
    description: "Whiteboard.AI intelligently extracts handwriting, text, and shapes.",
  },
  {
    icon: FileText,
    title: "Get Organized Output",
    description: "Generate a clean, editable document with summaries and insights.",
  },
  {
    icon: Share2,
    title: "Share or Save",
    description: "Export your notes to PDF, Google Docs, or Notion.",
  },
] as const

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="relative z-10 mx-auto mt-4 max-w-6xl px-6 pb-16 text-center text-[#ffe7da] motion-safe:animate-[heroFade_1.2s_ease-out]"
    >
      <div className="glass-panel relative overflow-hidden rounded-[32px] border border-[#ffe7da]/25 px-8 py-12 shadow-[0_30px_80px_rgba(56,25,50,0.42)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-[#ffd9ff]/15 blur-[120px]" />
          <div className="absolute right-[10%] top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#ffe7da]/12 blur-[90px]" />
          <div className="absolute left-[12%] bottom-0 h-52 w-52 rounded-full bg-[#ffd6ff]/18 blur-[110px]" />
        </div>

        <div className="relative mx-auto flex max-w-2xl flex-col gap-4">
          <h2 id="how-it-works-title" className="text-3xl font-semibold leading-tight sm:text-4xl text-[#fff3e6]">
            How Whiteboard.AI Works
          </h2>
          <p className="text-lg text-[#ffe7da]/80">
            From messy notes to structured insights — in seconds.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[26px] border border-[#ffe7da]/20 bg-white/10 px-6 py-7 text-left text-[#ffe7da] transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_26px_60px_rgba(255,210,255,0.35)] focus-within:-translate-y-2 focus-within:shadow-[0_26px_60px_rgba(255,210,255,0.35)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffe7da]/12 via-[#ffd9ff]/20 to-transparent" />
              </div>

              <div className="relative flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#fff3e6]/15 text-[#ffe7da] shadow-inner">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ffe7da]/65">
                  {title}
                </span>
              </div>

              <p className="relative mt-4 text-sm leading-relaxed text-[#ffe7da]/80">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
