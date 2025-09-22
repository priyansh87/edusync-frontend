"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Brain,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Sparkles,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300`}>
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-xl">EduSync</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Scheduling</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="w-9 h-9 p-0">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth?mode=register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 animate-pulse">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Academic Scheduling
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              <span className="text-primary">Smart Timetables</span>
              <br />
              <span className="text-foreground">for Modern Universities</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your academic scheduling with EduSync's intelligent AI system. Optimize faculty workloads,
              maximize classroom utilization, and eliminate scheduling conflicts automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth?mode=register">
                <Button size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold mb-6">Intelligent Academic Management</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                EduSync revolutionizes university scheduling with advanced AI algorithms that understand the
                complexities of academic environments. Our platform seamlessly integrates with your existing systems to
                provide real-time optimization and conflict resolution.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Automated conflict detection and resolution</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Real-time faculty workload balancing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Optimal classroom and resource allocation</span>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Live Analytics Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Classroom Utilization</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[87%] animate-pulse"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Faculty Satisfaction</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full w-[94%] animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Academic Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for the unique challenges of university scheduling
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>AI-Powered Optimization</CardTitle>
                <CardDescription>
                  Advanced machine learning algorithms automatically optimize schedules for maximum efficiency
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Smart Timetable Generation</CardTitle>
                <CardDescription>
                  Generate conflict-free timetables in minutes, not hours, with intelligent constraint handling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Faculty Management</CardTitle>
                <CardDescription>
                  Balance workloads, track preferences, and ensure fair distribution of teaching responsibilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Real-Time Updates</CardTitle>
                <CardDescription>
                  Instant notifications and automatic adjustments when changes occur in your schedule
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Secure & Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security with full compliance to educational data protection standards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Process complex scheduling requirements in seconds with our optimized algorithms
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The Future of Academic Scheduling</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            EduSync represents the next generation of educational technology, combining cutting-edge AI with deep
            understanding of academic workflows to deliver unprecedented scheduling efficiency.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.7%</div>
              <div className="text-muted-foreground">Conflict Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">85%</div>
              <div className="text-muted-foreground">Time Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Universities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">From Chaos to Clarity</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Traditional Scheduling Problems</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span>Manual conflict resolution takes weeks</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span>Unbalanced faculty workloads</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span>Poor classroom utilization</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span>Last-minute schedule changes cause chaos</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-600">EduSync Solutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Automated conflict resolution in minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AI-balanced faculty workload distribution</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Optimized classroom and resource usage</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Real-time adaptation to changes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Scheduling?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of universities already using EduSync to streamline their academic operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth?mode=register">
              <Button size="lg" variant="secondary" className="group">
                Start Your Free Trial
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
          <p className="text-sm opacity-75 mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">EduSync</span>
          </div>
          <p className="text-muted-foreground text-sm">© 2024 EduSync. Revolutionizing academic scheduling with AI.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
