"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { DispensingSession } from "@/lib/types"
import { Search } from "lucide-react"

interface DispenserHistoryProps {
  sessions: DispensingSession[]
}

export function DispenserHistory({ sessions }: DispenserHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSessions = sessions.filter(
    (session) =>
      session.dispenserId.toString().includes(searchTerm) ||
      new Date(session.startTime).toLocaleString().includes(searchTerm) ||
      new Date(session.endTime).toLocaleString().includes(searchTerm) ||
      session.amountDispensed.toString().includes(searchTerm),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispensing History</CardTitle>
        <CardDescription>Record of all fuel dispensing sessions</CardDescription>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search records..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">No dispensing sessions recorded yet</p>
            </div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispenser ID</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Initial Reading</TableHead>
                  <TableHead>Final Reading</TableHead>
                  <TableHead className="text-right">Amount Dispensed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">#{session.dispenserId}</TableCell>
                    <TableCell>{new Date(session.startTime).toLocaleString()}</TableCell>
                    <TableCell>{new Date(session.endTime).toLocaleString()}</TableCell>
                    <TableCell>{session.initialReading.toFixed(2)}</TableCell>
                    <TableCell>{session.finalReading.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{session.amountDispensed.toFixed(2)} L</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

