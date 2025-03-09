"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Dispenser, DispensingSession } from "@/lib/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

interface DispenserStatsProps {
  dispensers: Dispenser[]
  sessions: DispensingSession[]
}

export function DispenserStats({ dispensers, sessions }: DispenserStatsProps) {
  const [timeRange, setTimeRange] = useState("week")

  // Filter sessions based on time range
  const filteredSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.endTime)
    const now = new Date()

    if (timeRange === "day") {
      const yesterday = new Date(now)
      yesterday.setDate(now.getDate() - 1)
      return sessionDate >= yesterday
    } else if (timeRange === "week") {
      const lastWeek = new Date(now)
      lastWeek.setDate(now.getDate() - 7)
      return sessionDate >= lastWeek
    } else if (timeRange === "month") {
      const lastMonth = new Date(now)
      lastMonth.setMonth(now.getMonth() - 1)
      return sessionDate >= lastMonth
    }

    return true // All time
  })

  // Prepare data for dispenser usage chart
  const dispenserUsageData = dispensers.map((dispenser) => {
    const dispenserSessions = filteredSessions.filter((session) => session.dispenserId === dispenser.id)

    const totalDispensed = dispenserSessions.reduce((total, session) => total + session.amountDispensed, 0)

    return {
      name: `Dispenser #${dispenser.id}`,
      value: totalDispensed,
      sessions: dispenserSessions.length,
    }
  })

  // Prepare data for daily usage chart
  const dailyUsageMap = new Map()

  filteredSessions.forEach((session) => {
    const date = new Date(session.endTime).toLocaleDateString()
    const current = dailyUsageMap.get(date) || 0
    dailyUsageMap.set(date, current + session.amountDispensed)
  })

  const dailyUsageData = Array.from(dailyUsageMap.entries())
    .map(([date, amount]) => ({
      date,
      amount,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7) // Show last 7 days with data

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Dispenser Statistics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dispenser Usage</CardTitle>
            <CardDescription>Fuel dispensed by each dispenser</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {dispenserUsageData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dispenserUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value.toFixed(2)}L`}
                  >
                    {dispenserUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)} L`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No data available for the selected time range</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Fuel Dispensed</CardTitle>
            <CardDescription>Fuel dispensed per day</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {dailyUsageData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)} L`} />
                  <Bar dataKey="amount" fill="#3b82f6" name="Fuel Dispensed (L)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No data available for the selected time range</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

