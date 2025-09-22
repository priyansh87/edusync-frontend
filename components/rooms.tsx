"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Users, Clock, TrendingUp, Activity } from "lucide-react"

interface Room {
  id: string
  name: string
  type: "LT" | "CL" | "LAB"
  capacity: number
  currentOccupancy: number
  status: "Available" | "Occupied" | "Maintenance"
  nextClass: string
  utilizationRate: number
}

const mockRoomsData: Room[] = [
  {
    id: "LT-1",
    name: "Lecture Theatre 1",
    type: "LT",
    capacity: 120,
    currentOccupancy: 95,
    status: "Occupied",
    nextClass: "Free at 11:00 AM",
    utilizationRate: 85,
  },
  {
    id: "LT-2",
    name: "Lecture Theatre 2",
    type: "LT",
    capacity: 100,
    currentOccupancy: 0,
    status: "Available",
    nextClass: "Math-III at 2:00 PM",
    utilizationRate: 72,
  },
  {
    id: "LT-3",
    name: "Lecture Theatre 3",
    type: "LT",
    capacity: 80,
    currentOccupancy: 65,
    status: "Occupied",
    nextClass: "Free at 12:00 PM",
    utilizationRate: 90,
  },
  {
    id: "LT-4",
    name: "Lecture Theatre 4",
    type: "LT",
    capacity: 60,
    currentOccupancy: 0,
    status: "Maintenance",
    nextClass: "Under maintenance",
    utilizationRate: 0,
  },
  {
    id: "CL-101",
    name: "Classroom 101",
    type: "CL",
    capacity: 40,
    currentOccupancy: 35,
    status: "Occupied",
    nextClass: "Free at 1:00 PM",
    utilizationRate: 78,
  },
  {
    id: "CL-102",
    name: "Classroom 102",
    type: "CL",
    capacity: 35,
    currentOccupancy: 0,
    status: "Available",
    nextClass: "Programming at 3:00 PM",
    utilizationRate: 65,
  },
  {
    id: "LAB-A",
    name: "EMFT Lab",
    type: "LAB",
    capacity: 30,
    currentOccupancy: 28,
    status: "Occupied",
    nextClass: "Free at 1:00 PM",
    utilizationRate: 95,
  },
  {
    id: "LAB-B",
    name: "DSA Lab",
    type: "LAB",
    capacity: 25,
    currentOccupancy: 0,
    status: "Available",
    nextClass: "DSA Lab at 11:00 AM",
    utilizationRate: 88,
  },
  {
    id: "LAB-C",
    name: "Math Lab",
    type: "LAB",
    capacity: 20,
    currentOccupancy: 18,
    status: "Occupied",
    nextClass: "Free at 4:00 PM",
    utilizationRate: 82,
  },
]

const heatmapData = [
  { time: "9:00", LT: 85, CL: 70, LAB: 90 },
  { time: "10:00", LT: 95, CL: 85, LAB: 95 },
  { time: "11:00", LT: 75, CL: 60, LAB: 100 },
  { time: "12:00", LT: 40, CL: 30, LAB: 45 },
  { time: "13:00", LT: 20, CL: 15, LAB: 25 },
  { time: "14:00", LT: 80, CL: 75, LAB: 85 },
  { time: "15:00", LT: 90, CL: 80, LAB: 90 },
  { time: "16:00", LT: 60, CL: 50, LAB: 70 },
  { time: "17:00", LT: 30, CL: 25, LAB: 40 },
]

export default function Rooms() {
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredRooms = mockRoomsData.filter((room) => {
    const typeMatch = filterType === "all" || room.type === filterType
    const statusMatch = filterStatus === "all" || room.status === filterStatus
    return typeMatch && statusMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Occupied":
        return "bg-red-100 text-red-800"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "LT":
        return "bg-blue-100 text-blue-800"
      case "CL":
        return "bg-purple-100 text-purple-800"
      case "LAB":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHeatmapColor = (value: number) => {
    if (value >= 90) return "bg-red-500"
    if (value >= 75) return "bg-orange-500"
    if (value >= 50) return "bg-yellow-500"
    if (value >= 25) return "bg-green-500"
    return "bg-blue-500"
  }

  const getHeatmapIntensity = (value: number) => {
    return `opacity-${Math.max(20, Math.min(100, value))}` // Ensure opacity is between 20-100
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">9</div>
                <div className="text-xs text-muted-foreground">Total Rooms</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-xs text-muted-foreground">Currently Occupied</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">78%</div>
                <div className="text-xs text-muted-foreground">Average Utilization</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">10-11 AM</div>
                <div className="text-xs text-muted-foreground">Peak Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Room Filters</CardTitle>
          <CardDescription>Filter rooms by type and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Type:</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="LT">Lecture Theatre</SelectItem>
                  <SelectItem value="CL">Classroom</SelectItem>
                  <SelectItem value="LAB">Laboratory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Status:</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{room.id}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getTypeColor(room.type)}>{room.type}</Badge>
                  <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                </div>
              </div>
              <CardDescription>{room.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Occupancy */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Current Occupancy</span>
                  <span>
                    {room.currentOccupancy}/{room.capacity}
                  </span>
                </div>
                <Progress value={(room.currentOccupancy / room.capacity) * 100} className="h-2" />
              </div>

              {/* Utilization Rate */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Weekly Utilization</span>
                  <span>{room.utilizationRate}%</span>
                </div>
                <Progress value={room.utilizationRate} className="h-2" />
              </div>

              {/* Next Class */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{room.nextClass}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Room Utilization Heatmap
          </CardTitle>
          <CardDescription>Hourly utilization rates across different room types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Legend */}
            <div className="flex items-center gap-4 text-sm">
              <span>Utilization:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 opacity-20 rounded"></div>
                <span>0-25%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 opacity-50 rounded"></div>
                <span>25-50%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 opacity-75 rounded"></div>
                <span>50-75%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 opacity-90 rounded"></div>
                <span>75-90%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>90%+</span>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 gap-0">
                <div className="p-3 bg-muted font-medium text-center">Time</div>
                <div className="p-3 bg-muted font-medium text-center">Lecture Theatres</div>
                <div className="p-3 bg-muted font-medium text-center">Classrooms</div>
                <div className="p-3 bg-muted font-medium text-center">Laboratories</div>
              </div>

              {heatmapData.map((entry, index) => (
                <div key={index} className="grid grid-cols-4 gap-0 border-t">
                  <div className="p-3 bg-slate-50 font-medium text-center">{entry.time}</div>
                  <div className="p-3 text-center">
                    <div
                      className={`w-full h-8 rounded flex items-center justify-center text-white text-sm font-medium ${getHeatmapColor(entry.LT)}`}
                    >
                      {entry.LT}%
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <div
                      className={`w-full h-8 rounded flex items-center justify-center text-white text-sm font-medium ${getHeatmapColor(entry.CL)}`}
                    >
                      {entry.CL}%
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <div
                      className={`w-full h-8 rounded flex items-center justify-center text-white text-sm font-medium ${getHeatmapColor(entry.LAB)}`}
                    >
                      {entry.LAB}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
