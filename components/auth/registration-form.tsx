"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Mail, Lock, User } from "lucide-react"
import { RoleSelector } from "./role-selector"

export function RegistrationForm() {
  const { toast } = useToast()
  const [userType, setUserType] = useState<"student" | "teacher" | "admin">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (role: "student" | "teacher" | "admin") => {
    setUserType(role)
  }

  const handleRegister = () => {
    if (!email || !fullName || !password || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Get existing users
      const existingUsersStr = localStorage.getItem("edusync_users")
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : []

      // Check if user already exists
      if (existingUsers.some((u: any) => u.email === email)) {
        toast({
          title: "User Exists",
          description: "An account with this email already exists",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In a real app, this should be hashed
        name: fullName,
        role: userType,
      }

      // Save to local storage
      localStorage.setItem("edusync_users", JSON.stringify([...existingUsers, newUser]))
      localStorage.setItem("edusync_current_user", JSON.stringify(newUser))

      toast({
        title: "Account Created!",
        description: "Welcome to EduSync. Redirecting to dashboard...",
      })

      // Redirect
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <RoleSelector userType={userType} onRoleSelect={handleRoleSelect} />

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
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              placeholder="Create a password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="pl-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleRegister}
          className="w-full"
          disabled={!email || !fullName || !password || !confirmPassword || loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </div>
  )
}
