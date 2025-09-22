import { Brain } from "lucide-react"

interface AuthHeaderProps {
  title: string
  description: string
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-xl">EduSync</h1>
          <p className="text-xs text-muted-foreground">AI-Powered Scheduling</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
