"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileSpreadsheet, CheckCircle, Loader2, Calendar, Clock, MapPin, Globe } from "lucide-react"

interface TimetableEntry {
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
}

const mockTimetableData: Record<string, TimetableEntry[]> = {
  E15: [
    {
      time: "8:00-9:00",
      monday: "EMFT (LT-1)",
      tuesday: "Math-III (LT-2)",
      wednesday: "DSA (CL-101)",
      thursday: "EMFT (LT-1)",
      friday: "Math-III (LT-2)",
      saturday: "Free",
    },
    {
      time: "9:00-10:00",
      monday: "Comp AI (LT-3)",
      tuesday: "DSA (CL-101)",
      wednesday: "Math-III (LT-2)",
      thursday: "Comp AI (LT-3)",
      friday: "EMFT (LT-1)",
      saturday: "Free",
    },
    {
      time: "10:00-11:00",
      monday: "Break",
      tuesday: "Break",
      wednesday: "Break",
      thursday: "Break",
      friday: "Break",
      saturday: "Break",
    },
    {
      time: "11:00-13:00",
      monday: "EMFT Lab (Lab-A)",
      tuesday: "Free",
      wednesday: "DSA Lab (Lab-B)",
      thursday: "Free",
      friday: "Math Lab (Lab-C)",
      saturday: "Free",
    },
    {
      time: "13:00-14:00",
      monday: "Lunch Break",
      tuesday: "Lunch Break",
      wednesday: "Lunch Break",
      thursday: "Lunch Break",
      friday: "Lunch Break",
      saturday: "Lunch Break",
    },
    {
      time: "14:00-16:00",
      monday: "Free",
      tuesday: "Comp AI Lab (Lab-D)",
      wednesday: "Free",
      thursday: "EMFT Lab (Lab-A)",
      friday: "Free",
      saturday: "Free",
    },
  ],
  E16: [
    {
      time: "8:00-9:00",
      monday: "Physics (LT-2)",
      tuesday: "Chemistry (LT-1)",
      wednesday: "Math-II (LT-3)",
      thursday: "Physics (LT-2)",
      friday: "Chemistry (LT-1)",
      saturday: "Free",
    },
    {
      time: "9:00-10:00",
      monday: "Math-II (LT-3)",
      tuesday: "Physics (LT-2)",
      wednesday: "Chemistry (LT-1)",
      thursday: "Math-II (LT-3)",
      friday: "Physics (LT-2)",
      saturday: "Free",
    },
    {
      time: "10:00-11:00",
      monday: "Break",
      tuesday: "Break",
      wednesday: "Break",
      thursday: "Break",
      friday: "Break",
      saturday: "Break",
    },
    {
      time: "11:00-13:00",
      monday: "Physics Lab (Lab-E)",
      tuesday: "Free",
      wednesday: "Chem Lab (Lab-F)",
      thursday: "Free",
      friday: "Math Lab (Lab-C)",
      saturday: "Free",
    },
    {
      time: "13:00-14:00",
      monday: "Lunch Break",
      tuesday: "Lunch Break",
      wednesday: "Lunch Break",
      thursday: "Lunch Break",
      friday: "Lunch Break",
      saturday: "Lunch Break",
    },
    {
      time: "14:00-16:00",
      monday: "Free",
      tuesday: "Physics Lab (Lab-E)",
      wednesday: "Free",
      thursday: "Chem Lab (Lab-F)",
      friday: "Free",
      saturday: "Free",
    },
  ],
  E17: [
    {
      time: "8:00-9:00",
      monday: "English (LT-4)",
      tuesday: "Math-I (LT-1)",
      wednesday: "Programming (CL-102)",
      thursday: "English (LT-4)",
      friday: "Math-I (LT-1)",
      saturday: "Free",
    },
    {
      time: "9:00-10:00",
      monday: "Programming (CL-102)",
      tuesday: "English (LT-4)",
      wednesday: "Math-I (LT-1)",
      thursday: "Programming (CL-102)",
      friday: "English (LT-4)",
      saturday: "Free",
    },
    {
      time: "10:00-11:00",
      monday: "Break",
      tuesday: "Break",
      wednesday: "Break",
      thursday: "Break",
      friday: "Break",
      saturday: "Break",
    },
    {
      time: "11:00-13:00",
      monday: "Programming Lab (Lab-G)",
      tuesday: "Free",
      wednesday: "Math Lab (Lab-C)",
      thursday: "Free",
      friday: "Programming Lab (Lab-G)",
      saturday: "Free",
    },
    {
      time: "13:00-14:00",
      monday: "Lunch Break",
      tuesday: "Lunch Break",
      wednesday: "Lunch Break",
      thursday: "Lunch Break",
      friday: "Lunch Break",
      saturday: "Lunch Break",
    },
    {
      time: "14:00-16:00",
      monday: "Free",
      tuesday: "Programming Lab (Lab-G)",
      wednesday: "Free",
      thursday: "Math Lab (Lab-C)",
      friday: "Free",
      saturday: "Free",
    },
  ],
}

const translations = {
  en: {
    uploadTitle: "Upload Timetable Data",
    uploadDesc: "Upload an Excel file containing batch schedules and room allocations",
    dragDrop: "Drag and drop your Excel file here, or click to browse",
    chooseFile: "Choose File",
    uploading: "Uploading timetable data...",
    processing: "Processing batch schedules...",
    complete: "Timetables generated successfully!",
    generatedTimetables: "Generated Timetables",
    selectBatch: "Select a batch to view their weekly schedule",
    selectBatchLabel: "Select Batch:",
    chooseBatch: "Choose a batch",
    batch: "Batch",
    timeSlots: "Time Slots",
    totalClasses: "Total Classes/Week",
    labSessions: "Lab Sessions",
    differentRooms: "Different Rooms",
    time: "Time",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    actions: "Actions",
    edit: "Edit",
    free: "Free",
    break: "Break",
    lunchBreak: "Lunch Break",
  },
  hi: {
    uploadTitle: "टाइमटेबल डेटा अपलोड करें",
    uploadDesc: "बैच शेड्यूल और रूम आवंटन वाली एक्सेल फ़ाइल अपलोड करें",
    dragDrop: "अपनी एक्सेल फ़ाइल यहाँ ड्रैग और ड्रॉप करें, या ब्राउज़ करने के लिए क्लिक करें",
    chooseFile: "फ़ाइल चुनें",
    uploading: "टाइमटेबल डेटा अपलोड हो रहा है...",
    processing: "बैच शेड्यूल प्रोसेस हो रहे हैं...",
    complete: "टाइमटेबल सफलतापूर्वक जेनरेट हुए!",
    generatedTimetables: "जेनरेट किए गए टाइमटेबल",
    selectBatch: "साप्ताहिक शेड्यूल देखने के लिए एक बैच चुनें",
    selectBatchLabel: "बैच चुनें:",
    chooseBatch: "एक बैच चुनें",
    batch: "बैच",
    timeSlots: "समय स्लॉट",
    totalClasses: "कुल कक्षाएं/सप्ताह",
    labSessions: "लैब सेशन",
    differentRooms: "विभिन्न कमरे",
    time: "समय",
    monday: "सोमवार",
    tuesday: "मंगलवार",
    wednesday: "बुधवार",
    thursday: "गुरुवार",
    friday: "शुक्रवार",
    saturday: "शनिवार",
    actions: "कार्य",
    edit: "संपादित करें",
    free: "खाली",
    break: "ब्रेक",
    lunchBreak: "लंच ब्रेक",
  },
}

interface GenerateTimetableProps {
  language?: "en" | "hi"
}

export default function GenerateTimetable({ language = "en" }: GenerateTimetableProps) {
  const [selectedBatch, setSelectedBatch] = useState<string>("")
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "complete">("idle")
  const [uploadProgress, setUploadProgress] = useState(0)

  const t = translations[language]

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
              setSelectedBatch("E15") // Auto-select first batch after upload
            }, 2000)

            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const getSubjectColor = (subject: string) => {
    if (subject === "Free" || subject === t.free)
      return "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
    if (subject === "Break" || subject === t.break)
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700"
    if (subject === "Lunch Break" || subject === t.lunchBreak)
      return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-700"
    if (subject.includes("Lab"))
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 font-medium"
    if (subject.includes("EMFT"))
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700"
    if (subject.includes("Math"))
      return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
    if (subject.includes("AI"))
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
    if (subject.includes("DSA"))
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
    if (subject.includes("Physics"))
      return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700"
    if (subject.includes("Chemistry"))
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700"
    if (subject.includes("Programming"))
      return "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-700"
    return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
  }

  return (
    <div className="space-y-8">
      {/* Language Toggle */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // This would be handled by parent component in real implementation
            console.log("Language toggle clicked")
          }}
          className="flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          {language === "en" ? "हिंदी" : "English"}
        </Button>
      </div>

      {/* File Upload Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/50 dark:from-background dark:to-muted/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-primary" />
            </div>
            {t.uploadTitle}
          </CardTitle>
          <CardDescription className="text-base">{t.uploadDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">{t.dragDrop}</p>
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="timetable-upload"
            />
            <Button asChild variant="default" size="lg">
              <label htmlFor="timetable-upload" className="cursor-pointer">
                {t.chooseFile}
              </label>
            </Button>
          </div>

          {uploadStatus !== "idle" && (
            <div className="space-y-4 p-4 bg-muted/50 dark:bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                {uploadStatus === "uploading" && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    <span className="font-medium">{t.uploading}</span>
                  </>
                )}
                {uploadStatus === "processing" && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-yellow-500" />
                    <span className="font-medium">{t.processing}</span>
                  </>
                )}
                {uploadStatus === "complete" && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-green-700 dark:text-green-400">{t.complete}</span>
                  </>
                )}
              </div>

              {uploadStatus === "uploading" && <Progress value={uploadProgress} className="w-full h-2" />}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Batch Selection and Timetable Display */}
      {(uploadStatus === "complete" || selectedBatch) && (
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              {t.generatedTimetables}
            </CardTitle>
            <CardDescription className="text-base">{t.selectBatch}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Batch Selector */}
            <div className="flex items-center gap-6 p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
              <label className="font-medium text-lg">{t.selectBatchLabel}</label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-64 h-12">
                  <SelectValue placeholder={t.chooseBatch} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="E15">E15 - Electronics (3rd Year)</SelectItem>
                  <SelectItem value="E16">E16 - Electronics (2nd Year)</SelectItem>
                  <SelectItem value="E17">E17 - Electronics (1st Year)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timetable Display */}
            {selectedBatch && mockTimetableData[selectedBatch] && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Badge variant="default" className="text-base px-4 py-2">
                    {t.batch}: {selectedBatch}
                  </Badge>
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    {mockTimetableData[selectedBatch].length} {t.timeSlots}
                  </Badge>
                </div>

                {/* Enhanced Timetable Table */}
                <div className="border rounded-xl overflow-hidden shadow-sm bg-background dark:bg-background">
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                    <div className="grid grid-cols-8 gap-0">
                      <div className="p-4 font-semibold text-center border-r border-primary-foreground/20">
                        {t.time}
                      </div>
                      <div className="p-4 font-semibold text-center border-r border-primary-foreground/20">
                        {t.monday}
                      </div>
                      <div className="p-4 font-semibold text-center border-r border-primary-foreground/20">
                        {t.tuesday}
                      </div>
                      <div className="p-4 font-semibold text-center border-r border-primary-foreground/20">
                        {t.wednesday}
                      </div>
                      <div className="p-4 font-semibold text-center border-r border-primary-foreground/20">
                        {t.thursday}
                      </div>
                      <div className="p-4 font-semibold text-center border-r border-primary-foreground/20">
                        {t.friday}
                      </div>
                      <div className="p-4 font-semibold text-center border-r border-primary-foreground/20">
                        {t.saturday}
                      </div>
                      <div className="p-4 font-semibold text-center">{t.actions}</div>
                    </div>
                  </div>

                  {mockTimetableData[selectedBatch].map((entry, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-8 gap-0 border-t border-border hover:bg-muted/30 dark:hover:bg-muted/20 transition-colors"
                    >
                      <div className="p-4 text-center border-r border-border bg-muted/30 dark:bg-muted/20 font-semibold flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm">{entry.time}</span>
                        </div>
                      </div>

                      {[entry.monday, entry.tuesday, entry.wednesday, entry.thursday, entry.friday, entry.saturday].map(
                        (subject, dayIndex) => (
                          <div key={dayIndex} className="p-3 border-r border-border">
                            <div
                              className={`rounded-lg p-3 text-sm text-center transition-all hover:shadow-sm ${getSubjectColor(subject)}`}
                            >
                              <div className="font-semibold">{subject.split("(")[0].trim()}</div>
                              {subject.includes("(") && (
                                <div className="flex items-center justify-center gap-1 mt-2">
                                  <MapPin className="w-3 h-3" />
                                  <span className="text-xs">{subject.match(/$$(.*?)$$/)?.[1]}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                      )}

                      <div className="p-4 text-center">
                        <Button variant="ghost" size="sm" className="text-sm hover:bg-primary/10">
                          {t.edit}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Summary Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-0">
                      <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">18</div>
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{t.totalClasses}</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800">
                    <CardContent className="p-0">
                      <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-2">8</div>
                      <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">{t.labSessions}</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800">
                    <CardContent className="p-0">
                      <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">7</div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">{t.differentRooms}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
