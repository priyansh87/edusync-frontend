"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthHeader } from "@/components/auth/auth-header"
import { LoginForm } from "@/components/auth/login-form"
import { RegistrationForm } from "@/components/auth/registration-form"
import { OTPVerification } from "@/components/auth/otp-verification"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<"login" | "register" | "otp">("login")
  const [darkMode, setDarkMode] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const modeParam = searchParams.get("mode")
    if (modeParam === "register") {
      setMode("register")
    }
  }, [searchParams])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleOTPSent = (userEmail: string) => {
    setEmail(userEmail)
    setMode("otp")
  }

  const handleResendOTP = () => {
    setMode("register")
  }

  const getHeaderProps = () => {
    switch (mode) {
      case "login":
        return {
          title: "Welcome Back",
          description: "Sign in to your EduSync account",
        }
      case "register":
        return {
          title: "Create Account",
          description: "Join EduSync and optimize your scheduling",
        }
      case "otp":
        return {
          title: "Verify Your Email",
          description: `We've sent a verification code to ${email}`,
        }
    }
  }

  return (
    <AuthLayout darkMode={darkMode} onToggleDarkMode={toggleDarkMode}>
      <AuthHeader {...getHeaderProps()} />

      <div className="space-y-6 mt-6">
        {mode === "login" && <LoginForm onSuccess={() => {}} />}
        {mode === "register" && <RegistrationForm onOTPSent={handleOTPSent} />}
        {mode === "otp" && <OTPVerification email={email} onResendOTP={handleResendOTP} />}

        <div className="text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setMode("register")} className="text-primary hover:underline">
                Sign up
              </button>
            </p>
          ) : mode === "register" ? (
            <p>
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-primary hover:underline">
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Didn't receive the code?{" "}
              <button onClick={handleResendOTP} className="text-primary hover:underline">
                Resend
              </button>
            </p>
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
