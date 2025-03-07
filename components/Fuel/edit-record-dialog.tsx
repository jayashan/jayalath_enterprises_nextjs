"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TFuel } from "@/app/types"

// interface Record {
//   id: number
//   name: string
//   email: string
//   role: string
//   status: string
// }

interface EditRecordDialogProps {
  record: TFuel
  onSave: (updatedRecord: TFuel) => void
  onCancel: () => void
}

export function EditRecordDialog({ record, onSave, onCancel }: EditRecordDialogProps) {
  const [formData, setFormData] = useState<TFuel>({ ...record })
  const [errors, setErrors] = useState<Partial<TFuel>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name as keyof TFuel]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // const handleStatusChange = (value: string) => {
  //   setFormData((prev) => ({ ...prev, status: value }))

  //   // Clear error when field is edited
  //   // if (errors.status) {
  //   //   setErrors((prev) => ({ ...prev, status: undefined }))
  //   // }
  // }

  const validateForm = (): boolean => {
    const newErrors: Partial<TFuel> = {}

    if (!formData.FuelCode.trim()) {
      newErrors.FuelCode = "Fuel Code is required"
    }

    // if (!formData.FuelName.trim()) {
    //   newErrors. = "Email is required"
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Email is invalid"
    // }

    if (!formData.FuelName.trim()) {
      newErrors.FuelName = "Fuel Name is required"
    }
    if (!formData.UnitPrice) {
      newErrors.FuelName = "Unit Price is required"
    }
    if (!formData.PreOrderLevel) {
      newErrors.FuelName = "Pre is required"
    }



    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Fuel Code</Label>
              <Input
                id="FuelCode"
                name="FuelCode"
                value={formData.FuelCode}
                onChange={handleChange}
                className={errors.FuelCode ? "border-destructive" : ""}
              />
              {errors.FuelCode && <p className="text-sm text-destructive">{errors.FuelCode}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="FuelName">Fuel Name</Label>
              <Input
                id="FuelName"
                name="FuelName"
                // type="em"
                value={formData.FuelName}
                onChange={handleChange}
                className={errors.FuelName ? "border-destructive" : ""}
              />
              {errors.FuelName && <p className="text-sm text-destructive">{errors.FuelName}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Unit Price</Label>
              <Input
                id="UnitPrice"
                name="UnitPrice"
                type="number"
                value={formData.UnitPrice}
                onChange={handleChange}
                className={errors.UnitPrice ? "border-destructive" : ""}
              />
              {errors.UnitPrice && <p className="text-sm text-destructive">{errors.UnitPrice}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Pre Order Level</Label>
              <Input
                id="PreOrderLevel"
                name="PreOrderLevel"
                type="number"
                value={formData.PreOrderLevel}
                onChange={handleChange}
                className={errors.PreOrderLevel ? "border-destructive" : ""}
              />
              {errors.PreOrderLevel && <p className="text-sm text-destructive">{errors.PreOrderLevel}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

