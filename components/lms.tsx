"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Send, Loader2, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "bot"
  content: string
}

export default function LMS() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [pdfText, setPdfText] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/lms/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setPdfText(data.text)
        setMessages([
          {
            role: "bot",
            content: `I've analyzed ${file.name}. You can now ask me questions about it!`,
          },
        ])
        toast({
          title: "File Uploaded",
          description: "PDF processed successfully.",
        })
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload and process PDF.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !pdfText) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setChatLoading(true)

    try {
      const response = await fetch("/api/lms/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: pdfText,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessages((prev) => [...prev, { role: "bot", content: data.response }])
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      })
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I encountered an error processing your request." },
      ])
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upload Section */}
      <Card className="lg:col-span-1 h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Document
          </CardTitle>
          <CardDescription>Upload a PDF to chat with it</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-4">
              {file ? file.name : "Select a PDF file"}
            </p>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <Button asChild variant="outline" className="w-full">
              <label htmlFor="pdf-upload" className="cursor-pointer">
                Choose File
              </label>
            </Button>
          </div>

          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={!file || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Upload & Analyze"
            )}
          </Button>

          {pdfText && (
            <div className="text-sm text-green-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              Document ready for chat
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Section */}
      <Card className="lg:col-span-2 flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Document Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                  Upload a document to start chatting!
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`rounded-lg p-3 text-sm max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {chatLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2 mt-auto pt-2">
            <Input
              placeholder="Ask a question about the document..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={!pdfText || chatLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!pdfText || chatLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
