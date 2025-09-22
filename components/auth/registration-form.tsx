"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Mail, Lock, User } from "lucide-react"
import { RoleSelector } from "./role-selector"

interface RegistrationFormProps {
  onOTPSent: (email: string) => void
}

export function RegistrationForm({ onOTPSent }: RegistrationFormProps) {
  const { toast } = useToast()
  const [userType, setUserType] = useState<"student" | "teacher" | "admin">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (role: "student" | "teacher" | "admin") => {
    console.log("[v0] RegistrationForm - Role selection handler called with:", role)
    console.log("[v0] RegistrationForm - Current userType before setState:", userType)
    setUserType(role)
    console.log("[v0] RegistrationForm - setUserType called with:", role)
  }

  const handleSendOTP = () => {
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

    console.log("[v0] Registration attempt:", { email, fullName, userType })
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast({
        title: "OTP Sent!",
        description: "Check your email for the verification code. Use 123456 for demo.",
      })
      onOTPSent(email)
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
          onClick={handleSendOTP}
          className="w-full"
          disabled={!email || !fullName || !password || !confirmPassword || loading}
        >
          {loading ? "Creating Account..." : "Create Account & Send OTP"}
        </Button>
      </div>
    </div>
  )
}
