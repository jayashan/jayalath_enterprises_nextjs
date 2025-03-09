import type { Dispenser } from "./types"

export const initialDispensers: Dispenser[] = [
  {
    id: 1,
    fuelType: "Petrol",
    isActive: false,
    currentReading: 10000.0,
    totalDispensed: 5000.0,
    lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    fuelType: "Diesel",
    isActive: false,
    currentReading: 8500.0,
    totalDispensed: 3200.0,
    lastUsed: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    fuelType: "Premium Petrol",
    isActive: false,
    currentReading: 5200.0,
    totalDispensed: 1800.0,
    lastUsed: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    fuelType: "Diesel",
    isActive: false,
    currentReading: 7800.0,
    totalDispensed: 2500.0,
    lastUsed: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    fuelType: "Petrol",
    isActive: false,
    currentReading: 12000.0,
    totalDispensed: 6000.0,
    lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 6,
    fuelType: "Premium Diesel",
    isActive: false,
    currentReading: 4500.0,
    totalDispensed: 1200.0,
    lastUsed: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
]

