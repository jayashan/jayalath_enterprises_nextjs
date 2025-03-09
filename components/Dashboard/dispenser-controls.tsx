"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Droplet, Power, PowerOff } from "lucide-react"
import type { Dispenser } from "@/lib/types"

interface DispenserControlsProps{
    dispensers:Dispenser[];
    onActivate:(dispenserId:number,initialReading:number)=>void
    onDeactivate:(dispenserId:number,finalReading:number)=>void
}

export function DispenserControlls({dispensers,onActivate,onDeactivate}:DispenserControlsProps){
    const[readings,setReadings]=useState<Record<number,string>>({})

    const handleReadingChange=(dispenserId:number,value:string)=>{
        setReadings((prev)=>({
            ...prev,
            [dispenserId]:value,
        }))
    }

    const handleActivate=(dispenserId:number)=>{
        const readingValue=Number.parseFloat(readings[dispenserId]||"0");
        if(isNaN(readingValue)||readingValue<0){
            return
        }
        onActivate(dispenserId,readingValue)
        //clear the input after activation
        setReadings((prev)=>({
            ...prev,
            [dispenserId]:'',
        }))
    }


    const handleDeactivate=(dispenserId:number)=>{
        const readingValue=Number.parseFloat(readings[dispenserId]||"0");
        if(isNaN(readingValue)||readingValue<0){
            return
        }

        onDeactivate(dispenserId,readingValue)
        //clear the input after deactivate
        setReadings((prev)=>({
            ...prev,
            [dispenserId]:'',
        }))


    }




    return(
        <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dispensers.map((dispenser) => (
                <Card key={dispenser.id} className={dispenser.isActive ? "border-green-500" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-xl">Dispenser #{dispenser.id}</CardTitle>
                    <CardDescription>
                        {dispenser.fuelType} - {dispenser.isActive ? "Active" : "Inactive"}
                    </CardDescription>
                    </div>
                    <div
                    className={`p-2 rounded-full ${dispenser.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}`}
                    >
                    <Droplet className="h-5 w-5" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                        <span className="text-sm font-medium">Current Reading:</span>
                        <span className="text-sm">{dispenser.currentReading.toFixed(2)} liters</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Dispensed:</span>
                        <span className="text-sm">{dispenser.totalDispensed.toFixed(2)} liters</span>
                        </div>
                        {dispenser.lastUsed && (
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Last Used:</span>
                            <span className="text-sm">{new Date(dispenser.lastUsed).toLocaleString()}</span>
                        </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`reading-${dispenser.id}`}>
                        {dispenser.isActive ? "Final Reading" : "Initial Reading"}
                        </Label>
                        <Input
                        id={`reading-${dispenser.id}`}
                        type="number"
                        step="0.01"
                        min={dispenser.isActive ? dispenser.currentReading : 0}
                        placeholder={dispenser.isActive ? "Enter final reading" : "Enter initial reading"}
                        value={readings[dispenser.id] || ""}
                        onChange={(e) => handleReadingChange(dispenser.id, e.target.value)}
                        />
                    </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {dispenser.isActive ? (
                    <Button
                        className="w-full  bg-green-600 hover:bg-red-500 text-white"
                        variant="destructive"
                        onClick={() => handleDeactivate(dispenser.id)}
                        disabled={!readings[dispenser.id]}
                    >
                        <PowerOff className="mr-2 h-4 w-4" /> Deactivate Dispenser
                    </Button>
                    ) : (
                    <Button
                        className="w-full  bg-red-600 hover:bg-green-600 text-white"
                        onClick={() => handleActivate(dispenser.id)}
                        disabled={!readings[dispenser.id]}
                    >
                        <Power className="mr-2 h-4 w-4" /> Activate Dispenser
                    </Button>
                    )}
                </CardFooter>
                </Card>
            ))}
        </div>
        </>
    )
}