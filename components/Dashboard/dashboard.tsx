'use client'

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/components/ui/use-toasts'
import { Toaster } from "@/components/ui/toaster"
import { StationOverview } from "@/components/Dashboard/station-overview"
import { Dispenser,DispensingSession } from "@/lib/types"
import { initialDispensers } from "@/lib/data"
import Link from "next/link"
import { DispenserControlls } from "./dispenser-controls"
import { DispenserHistory } from "./dispenser-history"
import { DispenserStats } from "./dispenser-stats"

export default function Dashboard(){
    const [dispensers, setDispensers] = useState<Dispenser[]>(initialDispensers)
    const [sessions, setSessions] = useState<DispensingSession[]>([])
    const { toast } = useToast();

  //Load Data from Localstorage on component mount

  useEffect(()=>{
    const savedDispensers=localStorage.getItem('dispensers');
    const savedSessions=localStorage.getItem('sessions');

    if(savedDispensers){
      setDispensers(JSON.parse(savedDispensers))
    }

    if(savedSessions){
      setSessions(JSON.parse(savedSessions))
    }
  },[])

  //save data to localstaorage where it change

  useEffect(()=>{
    localStorage.setItem('dispensers',JSON.stringify(dispensers));
    localStorage.setItem('sessions',JSON.stringify(sessions));

  },[dispensers,sessions])


  



    const handleActivateDispenser=(dispenserId:number,initialReading:number)=>{
        setDispensers((prev)=>
            prev.map((d)=>(d.id===dispenserId?{...d,isActive:true,
            currentReading:initialReading
            }:d))
        )
        toast({
            title:"Dispenser Activated",
            description:`Dispenser #${dispenserId} activated with initial reading:${initialReading.toFixed(2)} liters`
        })
    }

    
    const handleDeactivateDispenser = (dispenserId: number, finalReading: number) => {
        const dispenser = dispensers.find((d) => d.id === dispenserId)
    
        if (!dispenser || !dispenser.isActive) {
          toast({
            title: "Error",
            description: "Cannot deactivate an inactive dispenser",
            variant: "destructive",
          })
          return
        }
    
        const initialReading = dispenser.currentReading
        const amountDispensed = finalReading - initialReading
    
        if (amountDispensed <= 0) {
          toast({
            title: "Error",
            description: "Final reading must be greater than initial reading",
            variant: "destructive",
          })
          return
        }
    
        // Create a new session record
        const newSession: DispensingSession = {
          id: Date.now(),
          dispenserId,
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          initialReading,
          finalReading,
          amountDispensed,
        }
    
        setSessions((prev) => [newSession, ...prev])
    
        // Update dispenser state
        setDispensers((prev) =>
          prev.map((d) =>
            d.id === dispenserId
              ? {
                  ...d,
                  isActive: false,
                  currentReading: finalReading,
                  totalDispensed: d.totalDispensed + amountDispensed,
                  lastUsed: new Date().toISOString(),
                }
              : d,
          ),
        )
    
        toast({
          title: "Dispenser Deactivated",
          description: `Dispenser #${dispenserId} deactivated. Amount dispensed: ${amountDispensed.toFixed(2)} liters`,
        })
      }



    return(
        <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Fuel Station Management</h1>
            <p className="text-muted-foreground">Monitor and control your fuel dispensers</p>
          </div>
  
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="dispensers">Dispensers</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
  
            <TabsContent value="overview" className="space-y-4">
              <Link href='#' className="cursor-pointer">
                <StationOverview dispensers={dispensers} sessions={sessions} />
              </Link>
            </TabsContent>
  
            <TabsContent value="dispensers" className="space-y-4">
              <DispenserControlls
                dispensers={dispensers}
                onActivate={handleActivateDispenser}
                onDeactivate={handleDeactivateDispenser}
              />
            </TabsContent>
  
            <TabsContent value="history" className="space-y-4">
              <DispenserHistory sessions={sessions} />
            </TabsContent>
  
            <TabsContent value="stats" className="space-y-4">
              <DispenserStats dispensers={dispensers} sessions={sessions} />
            </TabsContent>
          </Tabs>
        </div>
        <Toaster />
      </div>
    )
}