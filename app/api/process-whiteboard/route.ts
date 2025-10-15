import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")
    const mimeType = image.type

    // Extract text from whiteboard using vision model
    const { text: extractedText } = await generateText({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all text and content from this whiteboard image. Organize it in a clear, readable format. Preserve any structure like bullet points, lists, or sections. If there are diagrams or drawings, describe them briefly.",
            },
            {
              type: "image",
              image: `data:${mimeType};base64,${base64Image}`,
            },
          ],
        },
      ],
    })

    // Generate summary
    const { text: summary } = await generateText({
      model: "openai/gpt-4o",
      prompt: `Based on the following whiteboard content, create a concise summary highlighting the key points, main ideas, and action items:\n\n${extractedText}`,
    })

    return NextResponse.json({
      extractedText,
      summary,
    })
  } catch (error) {
    console.error("[v0] Error processing whiteboard:", error)
    return NextResponse.json({ error: "Failed to process whiteboard image" }, { status: 500 })
  }
}
