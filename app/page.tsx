"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { ImageIcon, Loader2, Orbit, Sparkles, Upload, Waves } from "lucide-react"

import { cn } from "@/lib/utils"
import { Hero } from "@/components/Hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { OrbField } from "@/components/visuals/orb-field"

const featureHighlights = [
  {
    title: "Vision-to-Structure",
    description: "Detect handwriting lanes, sticky notes, and sketches, then rebuild them as tidy digital blocks.",
    icon: Sparkles,
  },
  {
    title: "Semantic Signal",
    description: "Auto-tag action items, owners, and timelines so teams can mobilize instantly.",
    icon: Orbit,
  },
  {
    title: "Playable Memory",
    description: "Export sharable summaries and motion transcripts that replay the board’s story.",
    icon: Waves,
  },
] as const

export default function WhiteboardAI() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{
    extractedText: string
    summary: string
  } | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileSelect(droppedFile)
    }
  }

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }

  const handleProcess = async () => {
    if (!file || !preview) return

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/process-whiteboard", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Processing failed")

      const data = await response.json()
      setResult({
        extractedText: data.extractedText,
        summary: data.summary,
      })
    } catch (error) {
      console.error("[v0] Error processing whiteboard:", error)
      alert("Failed to process whiteboard. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const dropZoneClasses = useMemo(
    () =>
      cn(
        "group relative flex min-h-[320px] flex-col items-center justify-center rounded-[30px] border border-dashed border-[#ffe7da]/45 bg-[#fff3e6]/8 px-8 py-12 text-center transition-all duration-500 ease-out",
        isDragging
          ? "border-[#ffe0ff] bg-[#fff3e6]/16 shadow-[0_40px_110px_rgba(255,210,255,0.35)] backdrop-blur-2xl"
          : "hover:border-[#ffe0ff]/80 hover:bg-[#fff3e6]/14 hover:shadow-[0_34px_90px_rgba(56,25,50,0.35)]",
      ),
    [isDragging],
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#381932]">
      <div className="bg-plum-stage absolute inset-0"></div>
      <div className="aurora-veil absolute inset-0"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(255,243,230,0.28),transparent_52%),radial-gradient(circle_at_78%_12%,rgba(255,196,255,0.32),transparent_58%),radial-gradient(circle_at_50%_80%,rgba(255,243,230,0.22),transparent_62%)]"></div>
      <OrbField />

      <main className="relative z-10 flex flex-col">
        <Hero />

        <section className="container mx-auto px-6 pb-16 lg:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
            <div className="space-y-8 text-left text-[#ffe7da]">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#ffe7da]/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#ffe7da]/80 shadow-[0_18px_40px_rgba(56,25,50,0.45)] backdrop-blur-2xl">
                <span className="relative inline-flex size-2 rounded-full bg-[#ffd8ff] glow-dot"></span>
                Workflow Highlights
              </div>

              <h2 className="text-balance text-3xl font-semibold leading-tight text-[#fff3e6] sm:text-4xl lg:text-[2.6rem]">
                Everything you need to digitize analog thinking in minutes.
              </h2>

              <p className="max-w-xl text-lg text-[#ffe7da]/85">
                Whiteboard.AI orchestrates handwriting capture, spatial reasoning, and language models to rebuild your
                wall of ideas as an organized playbook you can edit, share, and ship.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[#ffe7da]/70">
                <div className="flex items-center gap-2 rounded-full bg-[#fff3e6]/15 px-4 py-2">
                  <span className="size-2 rounded-full bg-[#ffd6ff]"></span>
                  Live kinetic typography
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#fff3e6]/15 px-4 py-2">
                  <span className="size-2 rounded-full bg-[#ffd09d]"></span>
                  Glassmorphism workflow hub
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#fff3e6]/15 px-4 py-2">
                  <span className="size-2 rounded-full bg-[#f5b0ff]"></span>
                  Three.js orbit scene
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {featureHighlights.map(({ title, description, icon: Icon }) => (
                  <Card
                    key={title}
                    className="glass-panel relative overflow-hidden rounded-3xl border-transparent px-6 py-6 text-left text-[#ffe7da]"
                  >
                    <div className="absolute -right-8 -top-8 size-24 rounded-full bg-[#ffd9ff]/15 blur-3xl"></div>
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-[#fff3e6]/15 text-[#ffe7da] shadow-inner">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-[#ffe7da]/80">{description}</p>
                  </Card>
                ))}
              </div>
            </div>

            <Card
              id="upload"
              className="glass-panel relative overflow-hidden rounded-[32px] border-transparent px-8 py-10 text-[#ffe7da] shadow-[0_32px_85px_rgba(0,0,0,0.35)]"
            >
              <div className="pointer-events-none absolute -right-20 top-10 h-48 w-48 rounded-full bg-[#ffd9ff]/25 blur-3xl"></div>
              <div className="pointer-events-none absolute -left-24 -top-12 h-56 w-56 rounded-full bg-[#ffe7da]/15 blur-[70px]"></div>

              <input className="hidden" type="file" id="file-upload" accept="image/*" onChange={handleFileInput} />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={dropZoneClasses}
              >
                {!preview ? (
                  <div className="flex flex-col items-center justify-center gap-5">
                    <div className="flex items-center justify-center rounded-3xl border border-[#ffe7da]/40 bg-[#fff3e6]/15 p-5">
                      <Upload className="size-12 text-[#ffe7da]" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold text-[#fff3e6]">Drag & drop your whiteboard</h2>
                      <p className="text-sm text-[#ffe7da]/75">PNG, JPG, HEIC up to 25MB. We scrub sensitive data.</p>
                    </div>
                    <label
                      htmlFor="file-upload"
                      className="inline-flex rounded-full border border-[#ffe7da]/40 bg-[#fff3e6]/20 px-6 py-2 text-sm font-medium text-[#381932] shadow-[0_16px_30px_rgba(255,210,255,0.25)] transition hover:-translate-y-[1px] hover:border-[#ffe0ff]/60 hover:bg-[#fff3e6]/35 hover:shadow-[0_22px_45px_rgba(255,210,255,0.35)] cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>
                ) : (
                  <div className="flex w-full flex-col gap-6">
                    <div className="relative overflow-hidden rounded-[24px] border border-[#ffe7da]/25 bg-[#fff3e6]/15 shadow-[0_24px_60px_rgba(56,25,50,0.45)] backdrop-blur-2xl">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Whiteboard preview"
                        className="max-h-[320px] w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#381932]/85 via-[#381932]/20 to-transparent p-4 text-left text-xs uppercase tracking-[0.35em] text-[#ffe7da]/80">
                        Ready for extraction
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between gap-3 sm:flex-nowrap">
                      <label
                        htmlFor="file-upload"
                        className="flex-1 cursor-pointer rounded-full border border-[#ffe7da]/35 px-4 py-3 text-center text-sm font-medium text-[#ffe7da] transition hover:border-[#ffe0ff]/65 hover:bg-[#fff3e6]/15"
                      >
                        Change Image
                      </label>
                      <Button
                        onClick={handleProcess}
                        disabled={isProcessing}
                        className="flex-1 rounded-full bg-gradient-to-r from-[#ffe0ff]/90 via-[#fbd0ff] to-[#ffd9a4] text-[#381932] shadow-[0_18px_40px_rgba(255,210,255,0.45)] transition hover:scale-[0.99] hover:shadow-[0_26px_60px_rgba(255,210,255,0.5)] disabled:opacity-60"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="size-4" />
                            <span>Upload &amp; Process</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>

        <section
          id="demo"
          className={cn(
            "container mx-auto px-6 text-[#ffe7da] transition-opacity duration-700",
            result && preview ? "pb-24 opacity-100" : "pb-0 opacity-0 motion-safe:duration-300",
          )}
          aria-live="polite"
        >
          {result && preview ? (
            <>
              <div className="mb-10 flex flex-wrap items-center gap-4">
                <Badge className="glass-panel rounded-full border-transparent px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#ffe7da]">
                  Insights Generated
                </Badge>
                <p className="text-sm text-[#ffe7da]/75">
                  Crafted with glassmorphic clarity, ready to drop into your favorite workflow.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.9fr_minmax(0,1.1fr)]">
                <Card className="glass-panel relative overflow-hidden rounded-[32px] border-transparent px-8 py-8 text-left text-[#ffe7da]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-[#ffe7da]/65">Original Capture</p>
                      <h2 className="mt-3 text-2xl font-semibold text-[#fff3e6]">Your board in high fidelity</h2>
                    </div>
                    <span className="rounded-full border border-[#ffe7da]/30 bg-[#fff3e6]/15 px-3 py-1 text-xs font-medium text-[#ffe7da]/85">
                      Glass preview
                    </span>
                  </div>
                  <div className="relative mt-6 overflow-hidden rounded-[26px] border border-[#ffe7da]/25 bg-[#fff3e6]/10 shadow-[0_32px_80px_rgba(56,25,50,0.45)]">
                    <img src={preview || "/placeholder.svg"} alt="Original whiteboard" className="w-full object-cover" />
                  </div>
                  <Button
                    onClick={() => {
                      setResult(null)
                      setFile(null)
                      setPreview(null)
                    }}
                    variant="outline"
                    className="mt-6 w-full rounded-full border-[#ffe7da]/40 bg-[#fff3e6]/20 text-[#381932] transition hover:border-[#ffe0ff]/60 hover:bg-[#fff3e6]/35"
                  >
                    Process Another Image
                  </Button>
                </Card>

                <div className="grid gap-8">
                  <Card className="glass-panel relative overflow-hidden rounded-[28px] border-transparent px-7 py-7 text-left text-[#ffe7da]">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[#fff3e6]/12 text-[#ffe7da]">
                        <Sparkles className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#ffe7da]/70">Extracted text</p>
                        <h3 className="text-xl font-semibold text-[#fff3e6]">Structured transcription</h3>
                      </div>
                    </div>
                    <div className="mt-5 max-h-72 overflow-y-auto rounded-[22px] border border-[#ffe7da]/15 bg-[#fff3e6]/85 p-5 text-sm leading-relaxed text-[#381932] shadow-inner">
                      <pre className="whitespace-pre-wrap font-sans">{result.extractedText}</pre>
                    </div>
                  </Card>

                  <Card className="glass-panel relative overflow-hidden rounded-[28px] border-transparent px-7 py-7 text-left text-[#ffe7da]">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[#fff3e6]/12 text-[#ffe7da]">
                        <Waves className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#ffe7da]/70">Kinetic summary</p>
                        <h3 className="text-xl font-semibold text-[#fff3e6]">Signal over noise</h3>
                      </div>
                    </div>
                    <div className="mt-5 rounded-[22px] border border-[#ffe7da]/15 bg-[#fff3e6]/15 p-5 text-base leading-relaxed text-[#ffe7da]/85 shadow-inner">
                      {result.summary}
                    </div>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="sr-only" aria-hidden="true">
              Demo content will appear here once a whiteboard has been processed.
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
