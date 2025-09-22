import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users } from "lucide-react"

interface TimetableProps {
  batch?: string
}

export default function Timetable({ batch = "E15" }: TimetableProps) {
  const timetableData = {
    E15: {
      Monday: [
        { time: "9:00-10:00", subject: "EMFT", type: "Lecture", room: "A-204", faculty: "Dr. Smith" },
        { time: "10:00-11:00", subject: "Comprehensive AI", type: "Lecture", room: "B-301", faculty: "Prof. Johnson" },
        { time: "11:00-13:00", subject: "EMFT Lab", type: "Lab", room: "Lab-C1", faculty: "Dr. Smith" },
        { time: "14:00-16:00", subject: "Comprehensive AI Lab", type: "Lab", room: "Lab-D2", faculty: "Prof. Johnson" },
      ],
      Tuesday: [
        { time: "9:00-10:00", subject: "Data Structures", type: "Lecture", room: "A-205", faculty: "Dr. Williams" },
        { time: "10:00-11:00", subject: "Database Systems", type: "Lecture", room: "B-302", faculty: "Prof. Brown" },
        { time: "11:00-13:00", subject: "Data Structures Lab", type: "Lab", room: "Lab-C2", faculty: "Dr. Williams" },
      ],
      Wednesday: [
        { time: "9:00-10:00", subject: "EMFT", type: "Lecture", room: "A-204", faculty: "Dr. Smith" },
        { time: "10:00-11:00", subject: "Comprehensive AI", type: "Lecture", room: "B-301", faculty: "Prof. Johnson" },
        { time: "14:00-16:00", subject: "Database Lab", type: "Lab", room: "Lab-D1", faculty: "Prof. Brown" },
      ],
      Thursday: [
        { time: "9:00-10:00", subject: "Data Structures", type: "Lecture", room: "A-205", faculty: "Dr. Williams" },
        { time: "10:00-11:00", subject: "Database Systems", type: "Lecture", room: "B-302", faculty: "Prof. Brown" },
        { time: "11:00-13:00", subject: "EMFT Lab", type: "Lab", room: "Lab-C1", faculty: "Dr. Smith" },
      ],
      Friday: [
        { time: "9:00-10:00", subject: "EMFT", type: "Lecture", room: "A-204", faculty: "Dr. Smith" },
        { time: "10:00-11:00", subject: "Comprehensive AI", type: "Lecture", room: "B-301", faculty: "Prof. Johnson" },
        { time: "14:00-16:00", subject: "Comprehensive AI Lab", type: "Lab", room: "Lab-D2", faculty: "Prof. Johnson" },
      ],
    },
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const schedule = timetableData[batch as keyof typeof timetableData] || timetableData.E15

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Weekly Timetable</h2>
          <p className="text-muted-foreground">Batch: {batch}</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Users className="w-4 h-4 mr-1" />
          {batch} Batch
        </Badge>
      </div>

      <div className="grid gap-6">
        {days.map((day) => (
          <Card key={day} className="overflow-hidden">
            <CardHeader className="bg-muted/50 py-3">
              <CardTitle className="text-lg">{day}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {schedule[day as keyof typeof schedule]?.length > 0 ? (
                <div className="divide-y divide-border">
                  {schedule[day as keyof typeof schedule].map((class_, index) => (
                    <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant={class_.type === "Lab" ? "destructive" : "default"} className="text-xs">
                              {class_.type}
                            </Badge>
                            <h3 className="font-semibold">{class_.subject}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {class_.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {class_.room}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {class_.faculty}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No classes scheduled for {day}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
