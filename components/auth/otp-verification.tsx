"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle } from "lucide-react"

interface OTPVerificationProps {
  email: string
  onResendOTP: () => void
}

export function OTPVerification({ email, onResendOTP }: OTPVerificationProps) {
  const { toast } = useToast()
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerifyOTP = () => {
    if (otp === "123456") {
      console.log("[v0] OTP verified, redirecting to dashboard")
      setLoading(true)
      toast({
        title: "Account Created!",
        description: "Welcome to EduSync. Redirecting to dashboard...",
      })
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please use 123456 for demo",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          <CheckCircle className="w-3 h-3 mr-1" />
          OTP Sent Successfully
        </Badge>
        <p className="text-sm text-muted-foreground">We've sent a verification code to {email}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter 6-digit code"
          className="text-center text-lg tracking-widest"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <Button onClick={handleVerifyOTP} className="w-full" disabled={otp.length !== 6 || loading}>
        {loading ? "Verifying..." : "Verify & Complete Registration"}
      </Button>

      <div className="text-center">
        <Button variant="ghost" size="sm" onClick={onResendOTP} disabled={loading}>
          Resend Code
        </Button>
      </div>
    </div>
  )
}
