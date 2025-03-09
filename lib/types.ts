export interface Dispenser {
    id: number
    fuelType: string
    isActive: boolean
    currentReading: number
    totalDispensed: number
    lastUsed?: string
  }
  
  export interface DispensingSession {
    id: number
    dispenserId: number
    startTime: string
    endTime: string
    initialReading: number
    finalReading: number
    amountDispensed: number
  }
  
  