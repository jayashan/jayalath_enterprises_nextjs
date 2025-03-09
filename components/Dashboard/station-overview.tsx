"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Droplet, Fuel, Timer } from "lucide-react"
import type { Dispenser,DispensingSession } from "@/app/types"



interface StationOverviewProps{
    dispensers:Dispenser[]
    sessions:DispensingSession[]
}






export function StationOverview({dispensers,sessions}:StationOverviewProps){
    const today=new Date();
    today.setHours(0,0,0,0);

    const todaySessions = sessions.filter((session) => {
        const sessionDate = new Date(session.endTime)
        return sessionDate >= today
    })

    //calculate Total Today Dispensed
    const totalTodayDispensed = todaySessions.reduce((total, session) => total + session.amountDispensed, 0);

    //calculate active dispensers
    const activeDispensers=dispensers.filter((d)=>d.isActive).length;

    //calculate total dispensed all the time
    const totalDispensed=dispensers.reduce((total,dispenser)=>total+dispenser.totalDispensed,0);

    // Calculate average dispensing amount
    const averageDispensed =
    sessions.length > 0 ? sessions.reduce((total, session) => total + session.amountDispensed, 0) / sessions.length : 0

    return(
        <>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-medium">Total Dispensed Today</CardTitle>
                        <CardDescription>Fuel dispensed since midnight</CardDescription>
                    </div>
                    <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                        <Droplet className="h-4 w-4" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{totalTodayDispensed.toFixed(2)} L</div>
                    <p className="text-xs text-muted-foreground">From {todaySessions.length} dispensing sessions</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-medium">Active Dispensers</CardTitle>
                        <CardDescription>Currently in use</CardDescription>
                    </div>
                    <div className="p-2 rounded-full bg-green-100 text-green-700">
                        <Activity className="h-4 w-4" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">
                        {activeDispensers} / {dispensers.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {((activeDispensers / dispensers.length) * 100).toFixed(0)}% utilization
                    </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-medium">Total Dispensed</CardTitle>
                        <CardDescription>All time</CardDescription>
                    </div>
                    <div className="p-2 rounded-full bg-amber-100 text-amber-700">
                        <Fuel className="h-4 w-4" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{totalDispensed.toFixed(2)} L</div>
                    <p className="text-xs text-muted-foreground">Across all dispensers</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-medium">Average Dispensed</CardTitle>
                        <CardDescription>Per session</CardDescription>
                    </div>
                    <div className="p-2 rounded-full bg-purple-100 text-purple-700">
                        <Timer className="h-4 w-4" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{averageDispensed.toFixed(2)} L</div>
                    <p className="text-xs text-muted-foreground">From {sessions.length} total sessions</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}