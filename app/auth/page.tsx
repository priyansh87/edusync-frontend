"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthHeader } from "@/components/auth/auth-header"
import { LoginForm } from "@/components/auth/login-form"
import { RegistrationForm } from "@/components/auth/registration-form"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [darkMode, setDarkMode] = useState(false)

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
    }
  }

  return (
    <AuthLayout darkMode={darkMode} onToggleDarkMode={toggleDarkMode}>
      <AuthHeader {...getHeaderProps()} />

      <div className="space-y-6 mt-6">
        {mode === "login" && <LoginForm onSuccess={() => {}} />}
        {mode === "register" && <RegistrationForm />}

        <div className="text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setMode("register")} className="text-primary hover:underline">
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-primary hover:underline">
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
