"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Timetable from "@/components/timetable"
import GenerateTimetable from "@/components/generate-timetable"
import Rooms from "@/components/rooms"
import {
  Calendar,
  Brain,
  Settings,
  Clock,
  Users,
  CheckCircle,
  Upload,
  MessageCircle,
  Home,
  ClipboardList,
  UserCheck,
  Building,
  Bell,
  TrendingUp,
  Globe,
  X,
  Send,
  Menu,
  FileSpreadsheet,
  Loader2,
  Database,
  LogOut,
  Moon,
  Sun,
  Coffee,
  MessageSquare,
  BookOpen,
} from "lucide-react"
import JCafe from "@/components/jcafe"
import Feedback from "@/components/feedback"
import LMS from "@/components/lms"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "complete">("idle")
  const [chatOpen, setChatOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot" as "bot" | "user",
      message: "Hello! I'm your EduSync AI assistant. How can I help you today?",
      messageHi: "नमस्ते! मैं आपका EduSync AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [user] = useState({
    name: "Admin User",
    email: "admin@university.edu",
    role: "admin" as "student" | "teacher" | "admin",
    avatar: "A",
  })

  const translations = {
    en: {
      dashboard: "Dashboard",
      timetable: "Timetable",
      assignments: "Assignments",
      faculty: "Faculty",
      rooms: "Rooms",
      notifications: "Notifications",
      analytics: "Analytics",
      settings: "Settings",
      uploadTitle: "Upload Faculty Timetable",
      uploadDesc: "Upload an Excel file containing faculty schedules",
      chatPlaceholder: "Ask me anything about EduSync...",
      classroomUtil: "Classroom Utilization",
      facultyWorkload: "Faculty Workload",
      peakHours: "Peak Hours",
      totalFaculty: "Total Faculty",
      generateTimetable: "Generate Timetable",
    },
    hi: {
      dashboard: "डैशबोर्ड",
      timetable: "समय सारणी",
      assignments: "असाइनमेंट",
      faculty: "संकाय",
      rooms: "कमरे",
      notifications: "सूचनाएं",
      analytics: "विश्लेषण",
      settings: "सेटिंग्स",
      uploadTitle: "संकाय समय सारणी अपलोड करें",
      uploadDesc: "संकाय कार्यक्रम वाली एक्सेल फ़ाइल अपलोड करें",
      chatPlaceholder: "EduSync के बारे में कुछ भी पूछें...",
      classroomUtil: "कक्षा उपयोग",
      facultyWorkload: "संकाय कार्यभार",
      peakHours: "व्यस्त घंटे",
      totalFaculty: "कुल संकाय",
      generateTimetable: "समय सारणी जनरेट करें",
    },
  }

  const t = translations[language]

  const getSidebarItems = () => {
    const baseItems = [
      { id: "dashboard", label: t.dashboard, icon: Home, roles: ["student", "teacher", "admin"] },
      { id: "timetable", label: t.timetable, icon: Calendar, roles: ["student", "teacher", "admin"] },
    ]

    const roleSpecificItems = [
      { id: "assignments", label: t.assignments, icon: ClipboardList, roles: ["student", "teacher"] },
      { id: "generate-timetable", label: t.generateTimetable, icon: FileSpreadsheet, roles: ["admin"] },
      { id: "faculty", label: t.faculty, icon: UserCheck, roles: ["admin"] },
      { id: "notifications", label: t.notifications, icon: Bell, roles: ["student", "teacher", "admin"] },
      { id: "jcafe", label: "JCafe", icon: Coffee, roles: ["student", "teacher", "admin"] },
      { id: "feedback", label: "Feedback", icon: MessageSquare, roles: ["student", "teacher", "admin"] },
      { id: "lms", label: "LMS", icon: BookOpen, roles: ["student", "teacher", "admin"] },
    ]

    return [...baseItems, ...roleSpecificItems].filter((item) => item.roles.includes(user.role))
  }

  const sidebarItems = getSidebarItems()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadStatus("uploading")
      setUploadProgress(0)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setUploadStatus("processing")

            setTimeout(() => {
              setUploadStatus("complete")
            }, 2000)

            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const mockFacultyData = [
    { name: "Dr. Smith", department: "Computer Science", hours: 18, status: "Active" },
    { name: "Prof. Johnson", department: "Mathematics", hours: 16, status: "Active" },
    { name: "Dr. Williams", department: "Physics", hours: 20, status: "Active" },
    { name: "Prof. Brown", department: "Chemistry", hours: 14, status: "Leave" },
    { name: "Dr. Davis", department: "Biology", hours: 17, status: "Active" },
  ]

  const handleLogoClick = () => {
    window.location.href = "/"
  }

  const sendMessage = () => {
    if (!currentMessage.trim()) return

    const newUserMessage = {
      type: "user" as "bot" | "user",
      message: currentMessage,
      messageHi: currentMessage,
    }

    setChatMessages((prev) => [...prev, newUserMessage])
    const userMessage = currentMessage.toLowerCase()
    setCurrentMessage("")

    // Simulate AI response with intelligent responses
    setTimeout(() => {
      let botResponse = {
        type: "bot" as "bot" | "user",
        message: "",
        messageHi: "",
      }

      // Check for specific queries
      if (userMessage.includes("e15") && userMessage.includes("classes")) {
        botResponse = {
          type: "bot" as "bot" | "user",
          message:
            "You have 2 labs and 2 lectures namely EMFT from 9-10, Comprehensive AI from 10-11, EMFT Lab 11-1 and Comprehensive AI Lab from 2-4.",
          messageHi:
            "आपके पास 2 लैब और 2 लेक्चर हैं जैसे EMFT 9-10 से, Comprehensive AI 10-11 से, EMFT Lab 11-1 और Comprehensive AI Lab 2-4 से।",
        }
      } else if (userMessage.includes("timetable") && userMessage.includes("e15")) {
        botResponse = {
          type: "bot" as "bot" | "user",
          message:
            'You can view your complete timetable by clicking here: <button onclick="window.dispatchEvent(new CustomEvent(\'switchToTimetable\'))" style="color: #0066cc; text-decoration: underline; background: none; border: none; cursor: pointer;">View Timetable</button>',
          messageHi:
            'आप यहाँ क्लिक करके अपना पूरा टाइमटेबल देख सकते हैं: <button onclick="window.dispatchEvent(new CustomEvent(\'switchToTimetable\'))" style="color: #0066cc; text-decoration: underline; background: none; border: none; cursor: pointer;">टाइमटेबल देखें</button>',
        }
      } else {
        // Default responses
        const responses = {
          en: [
            "I can help you with timetable scheduling, faculty management, and room allocation.",
            "Your current classroom utilization is at 78%. Would you like to see detailed analytics?",
            "I found 5 available rooms for your requested time slot. Shall I book one for you?",
            "The faculty workload is optimally distributed. Dr. Smith has the highest load at 20 hours.",
            "Peak hours are between 10-12 AM. Consider scheduling important classes during this time.",
          ],
          hi: [
            "मैं आपकी समय सारणी, संकाय प्रबंधन और कमरे के आवंटन में मदद कर सकता हूं।",
            "आपका वर्तमान कक्षा उपयोग 78% है। क्या आप विस्तृत विश्लेषण देखना चाहेंगे?",
            "मुझे आपके अनुरोधित समय के लिए 5 उपलब्ध कमरे मिले हैं। क्या मैं एक बुक कर दूं?",
            "संकाय कार्यभार अच्छी तरह से वितरित है। डॉ. स्मिथ का सबसे अधिक 20 घंटे का भार है।",
            "व्यस्त समय सुबह 10-12 बजे के बीच है। इस समय महत्वपूर्ण कक्षाएं शेड्यूल करने पर विचार करें।",
          ],
        }

        const randomResponse = responses[language][Math.floor(Math.random() * responses[language].length)]
        botResponse = {
          type: "bot" as "bot" | "user",
          message: language === "en" ? randomResponse : responses.en[responses.hi.indexOf(randomResponse)],
          messageHi: language === "hi" ? randomResponse : responses.hi[responses.en.indexOf(randomResponse)],
        }
      }

      setChatMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleChatKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  useEffect(() => {
    const handleSwitchToTimetable = () => {
      setActiveTab("timetable")
      setChatOpen(false)
    }

    window.addEventListener("switchToTimetable", handleSwitchToTimetable)
    return () => window.removeEventListener("switchToTimetable", handleSwitchToTimetable)
  }, [])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogoClick}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Brain className="w-5 h-5 text-primary-foreground" />
            </button>
            {sidebarOpen && (
              <div>
                <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
                  <h1 className="font-bold text-lg">EduSync</h1>
                </button>
                <p className="text-xs text-muted-foreground capitalize">{user.role} Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full mb-2">
            <Menu className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold capitalize">{t[activeTab as keyof typeof t] || activeTab}</h2>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="w-9 h-9 p-0">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {language === "en" ? "हिंदी" : "English"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-destructive hover:text-destructive bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">{user.avatar}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Analytics Cards - Only show for admin */}
              {user.role === "admin" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{t.classroomUtil}</CardTitle>
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78%</div>
                      <Progress value={78} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">+2% from last week</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{t.facultyWorkload}</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">16.8h</div>
                      <Progress value={84} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">Average per week</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{t.peakHours}</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">10-12 AM</div>
                      <Progress value={92} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">Highest utilization</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{t.totalFaculty}</CardTitle>
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">142</div>
                      <Progress value={95} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">5 on leave</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Excel Upload Module - Only for admin */}
              {user.role === "admin" && (
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-primary" />
                      {t.uploadTitle}
                    </CardTitle>
                    <CardDescription>{t.uploadDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop your Excel file here, or click to browse
                      </p>
                      <Input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Choose File
                        </label>
                      </Button>
                    </div>

                    {uploadStatus !== "idle" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {uploadStatus === "uploading" && (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                              <span className="text-sm">Uploading...</span>
                            </>
                          )}
                          {uploadStatus === "processing" && (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                              <span className="text-sm">Processing...</span>
                            </>
                          )}
                          {uploadStatus === "complete" && (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">Added to Database</span>
                            </>
                          )}
                        </div>

                        {uploadStatus === "uploading" && <Progress value={uploadProgress} className="w-full" />}

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Uploaded</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {uploadStatus === "processing" ? (
                              <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                            ) : uploadStatus === "complete" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span>Processing</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {uploadStatus === "complete" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Database className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span>Added to Database</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {uploadStatus === "complete" && (
                      <div className="mt-6">
                        <h4 className="font-medium mb-3">Processed Faculty Schedules (10 records)</h4>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-muted px-4 py-2 grid grid-cols-4 gap-4 text-sm font-medium">
                            <span>Faculty Name</span>
                            <span>Department</span>
                            <span>Weekly Hours</span>
                            <span>Status</span>
                          </div>
                          {mockFacultyData.map((faculty, index) => (
                            <div key={index} className="px-4 py-2 grid grid-cols-4 gap-4 text-sm border-t">
                              <span>{faculty.name}</span>
                              <span>{faculty.department}</span>
                              <span>{faculty.hours}h</span>
                              <Badge variant={faculty.status === "Active" ? "default" : "secondary"}>
                                {faculty.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Student/Teacher specific content */}
              {(user.role === "student" || user.role === "teacher") && (
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Timetable</CardTitle>
                      <CardDescription>Your schedule for this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">Mathematics 101</div>
                            <div className="text-sm text-muted-foreground">Room A-204</div>
                          </div>
                          <div className="text-sm">9:00 AM</div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">Physics Lab</div>
                            <div className="text-sm text-muted-foreground">Lab B-101</div>
                          </div>
                          <div className="text-sm">2:00 PM</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Notifications</CardTitle>
                      <CardDescription>Latest updates and announcements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="font-medium text-sm">Schedule Updated</div>
                          <div className="text-xs text-muted-foreground">
                            Your Monday class has been moved to Room C-301
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="font-medium text-sm">New Assignment</div>
                          <div className="text-xs text-muted-foreground">Physics assignment due next Friday</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Timetable Tab Content */}
          {activeTab === "timetable" && <Timetable batch="E15" />}

          {/* Generate Timetable Tab Content */}
          {activeTab === "generate-timetable" && <GenerateTimetable language={language} />}

          {/* Rooms Tab Content */}
          {activeTab === "rooms" && <Rooms />}

          {/* JCafe Tab Content */}
          {activeTab === "jcafe" && <JCafe />}

          {/* Feedback Tab Content */}
          {activeTab === "feedback" && <Feedback />}

          {/* LMS Tab Content */}
          {activeTab === "lms" && <LMS />}

          {/* Other tab contents */}
          {activeTab !== "dashboard" &&
            activeTab !== "timetable" &&
            activeTab !== "generate-timetable" &&
            activeTab !== "rooms" &&
            activeTab !== "jcafe" &&
            activeTab !== "feedback" &&
            activeTab !== "lms" && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">{t[activeTab as keyof typeof t]}</h3>
                  <p className="text-muted-foreground">This section is under development</p>
                </div>
              </div>
            )}
        </main>
      </div>

      {/* Floating Chatbot */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 z-50"
        >
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </button>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-card border border-border rounded-2xl shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-medium">EduSync AI</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setChatOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`${msg.type === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block max-w-[80%] rounded-lg p-3 text-sm ${
                      msg.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: language === "en" ? msg.message : msg.messageHi,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder={t.chatPlaceholder}
                className="flex-1"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleChatKeyPress}
              />
              <Button size="sm" onClick={sendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
