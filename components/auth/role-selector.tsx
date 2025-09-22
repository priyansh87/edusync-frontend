"use client"

import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, GraduationCap, Users, Shield } from "lucide-react"

interface RoleSelectorProps {
  userType: "student" | "teacher" | "admin"
  onRoleSelect: (role: "student" | "teacher" | "admin") => void
}

export function RoleSelector({ userType, onRoleSelect }: RoleSelectorProps) {
  const { toast } = useToast()

  const handleRoleSelect = (role: "student" | "teacher" | "admin") => {
    console.log("[v0] Role clicked:", role)
    console.log("[v0] Current userType before update:", userType)
    console.log("[v0] onRoleSelect function:", typeof onRoleSelect)

    onRoleSelect(role)

    console.log("[v0] onRoleSelect called with:", role)

    toast({
      title: "Role Selected",
      description: `You've selected ${role.charAt(0).toUpperCase() + role.slice(1)} role`,
      duration: 2000,
    })
  }

  const userTypeOptions = [
    {
      type: "student" as const,
      icon: GraduationCap,
      title: "Student",
      description: "Access your timetables and assignments",
    },
    {
      type: "teacher" as const,
      icon: Users,
      title: "Teacher",
      description: "Manage your classes and schedules",
    },
    {
      type: "admin" as const,
      icon: Shield,
      title: "Admin",
      description: "Full system access and management",
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-3 block">I am a:</Label>
        <div className="grid grid-cols-1 gap-3">
          {userTypeOptions.map((option) => {
            const Icon = option.icon
            const isSelected = userType === option.type
            return (
              <button
                key={option.type}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log("[v0] Button clicked for:", option.type)
                  handleRoleSelect(option.type)
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/20 shadow-lg ring-4 ring-primary/30"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md scale-110"
                        : "bg-muted hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium transition-colors ${isSelected ? "text-primary font-semibold" : ""}`}>
                      {option.title}
                    </div>
                    <div
                      className={`text-sm transition-colors ${
                        isSelected ? "text-primary/80" : "text-muted-foreground"
                      }`}
                    >
                      {option.description}
                    </div>
                  </div>
                  {isSelected && <CheckCircle className="w-6 h-6 text-primary animate-in zoom-in-50 duration-300" />}
                </div>
              </button>
            )
          })}
        </div>
        <div className="mt-4 text-center">
          <Badge
            variant={userType === "student" ? "default" : "secondary"}
            className={`capitalize animate-in slide-in-from-bottom-2 px-4 py-2 text-sm font-medium ${
              userType === "teacher"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : userType === "admin"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  : ""
            }`}
          >
            Selected: {userType}
          </Badge>
        </div>
      </div>
    </div>
  )
}
