"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Moon, Sun } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function AuthLayout({ children, darkMode, onToggleDarkMode }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Dark Mode Toggle */}
      <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className="absolute top-4 right-4 w-9 h-9 p-0">
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>

      {/* Back to Home */}
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>{/* Header content will be passed as children */}</CardHeader>
        <CardContent>{children}</CardContent>
      </Card>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
