import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { message, context } = await req.json()

        if (!message || !context) {
            return NextResponse.json({ error: "Missing message or context" }, { status: 400 })
        }

        const lowerMessage = message.toLowerCase()
        const lowerContext = context.toLowerCase()

        let response = "I couldn't find specific information about that in the document."

        // Simple keyword matching logic
        if (lowerMessage.includes("summary") || lowerMessage.includes("summarize")) {
            response = "Here is a brief summary based on the beginning of the document:\n\n" + context.substring(0, 500) + "..."
        } else {
            // Find sentences containing keywords from the message
            const keywords = lowerMessage.split(" ").filter((word: string) => word.length > 4)
            const sentences = context.match(/[^.!?]+[.!?]+/g) || []

            const relevantSentences = sentences.filter((sentence: string) =>
                keywords.some((keyword: string) => sentence.toLowerCase().includes(keyword))
            )

            if (relevantSentences.length > 0) {
                response = "Based on the document, here is what I found:\n\n" + relevantSentences.slice(0, 3).join(" ")
            }
        }

        return NextResponse.json({ response })
    } catch (error) {
        console.error("Error in chat:", error)
        return NextResponse.json({ error: "Failed to process chat" }, { status: 500 })
    }
}
