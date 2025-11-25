"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Mail, Lock } from "lucide-react"

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both email and password",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    setTimeout(() => {
      // Get existing users
      const existingUsersStr = localStorage.getItem("edusync_users")
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : []

      // Find user
      const user = existingUsers.find((u: any) => u.email === email && u.password === password)

      if (user) {
        // Set current user
        localStorage.setItem("edusync_current_user", JSON.stringify(user))

        toast({
          title: "Login Successful!",
          description: "Welcome back! Redirecting to dashboard...",
        })
        
        // Redirect
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1000)
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleLogin} className="w-full" disabled={!email || !password || loading}>
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </div>
  )
}
