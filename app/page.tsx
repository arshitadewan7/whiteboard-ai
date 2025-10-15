"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 text-balance">
            Turn whiteboard chaos into organized notes.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Upload a photo of your whiteboard and let AI extract, organize, and summarize the content for you.
          </p>
        </div>

        {/* Upload Section */}
        {!result && (
          <Card className="max-w-2xl mx-auto p-8 shadow-lg">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileInput} />

              {!preview ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="w-16 h-16 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">Drag and drop your whiteboard image here</p>
                    <p className="text-sm text-gray-500 mb-4">or</p>
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                        <span>Browse Files</span>
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-md">
                    <img src={preview || "/placeholder.svg"} alt="Whiteboard preview" className="w-full h-auto" />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                        <span>Change Image</span>
                      </Button>
                    </label>
                    <Button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Upload & Process
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Results Section */}
        {result && preview && (
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Original Image */}
              <Card className="p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Original Image</h2>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img src={preview || "/placeholder.svg"} alt="Original whiteboard" className="w-full h-auto" />
                </div>
                <Button
                  onClick={() => {
                    setResult(null)
                    setFile(null)
                    setPreview(null)
                  }}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Process Another Image
                </Button>
              </Card>

              {/* Results Cards */}
              <div className="space-y-6">
                {/* Extracted Text Card */}
                <Card className="p-6 shadow-lg backdrop-blur-sm bg-white/80 border border-white/20">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Extracted Text
                  </h2>
                  <div className="prose prose-sm max-w-none">
                    <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-sans text-gray-700 text-sm leading-relaxed">
                        {result.extractedText}
                      </pre>
                    </div>
                  </div>
                </Card>

                {/* Summary Card */}
                <Card className="p-6 shadow-lg backdrop-blur-sm bg-white/80 border border-white/20">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Summary
                  </h2>
                  <div className="prose prose-sm max-w-none">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 text-sm leading-relaxed">{result.summary}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
