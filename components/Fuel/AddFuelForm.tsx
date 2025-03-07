"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Switch } from "@/components/ui/switch"
// import { ImagePlus, X } from "lucide-react"
//import { useRouter } from "next/navigation"


export default function AddFuelForm(){
  const [formData, setFormData] = useState({
    FuelCode: "",
    FuelName: "",
    UnitPrice: "",
    PreOrderLevel: "",
  })

//   const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  //const router=useRouter();   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))

//     // Clear error when field is changed
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleStatusChange = (checked: boolean) => {
//     setFormData((prev) => ({ ...prev, status: checked }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
//       setImages((prev) => [...prev, ...newImages])
//     }
//   }

//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index))
//   }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.FuelCode.trim()) newErrors.FuelCode = "Fuel Code is required"
    if (!formData.FuelName.trim()) newErrors.FuelName = "Fuel Name is required"
    if (!formData.UnitPrice) newErrors.UnitPrice = "Price is required"
    if (isNaN(Number(formData.UnitPrice)) || Number(formData.UnitPrice) <= 0)
      newErrors.UnitPrice = "Price must be a positive number"
    if(!formData.PreOrderLevel) newErrors.PreOrderLevel="Pre Order is required"
    else if(isNaN(Number(formData.PreOrderLevel))||Number(formData.PreOrderLevel)<=0)
        newErrors.PreOrderLevel="Pre Order Level must be positive number"
    // else if (
    //   isNaN(Number(formData.stockQuantity)) ||
    //   !Number.isInteger(Number(formData.stockQuantity)) ||
    //   Number(formData.stockQuantity) < 0
    // )
    //   newErrors.stockQuantity = "Stock quantity must be a non-negative integer"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      const res=await fetch("/api/fuel",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            FuelCode:(formData.FuelCode),
            FuelName:(formData.FuelName),
            UnitPrice:Number(formData.UnitPrice),
            PreOrderLevel:Number(formData.PreOrderLevel),
        }),
      })

      console.log("Product submitted:", {
        ...formData,
      })
      if(res.ok){
        console.log('fuel added')
        //router.push('/fuel');
        //router.refresh();
        window.location.href = "/fuel";
        
       
      }

      // Success - Clear form or navigate away
      //alert("Product added successfully!")
      setFormData({
        FuelCode:"",
        FuelName:"",
        UnitPrice:"",
        PreOrderLevel:""
      })
    //   setImages([])
    } catch (error) {
      console.error("Error submitting product:", error)
      alert("There was an error submitting the product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
        <CardDescription>Fill in the details to add a new product to your inventory</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          

          

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                FuelCode
                </Label>
                <Input
                id="FuelCode"
                name="FuelCode"
                value={formData.FuelCode}
                onChange={handleChange}
                className={errors.FuelCode ? "border-red-500" : ""}
                placeholder="Enter product name"
                />
                {errors.FuelCode && <p className="text-sm text-red-500">{errors.FuelCode}</p>}
            </div>

                <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">
                    Fuel Name
                </Label>
                <Input
                    id="FuelName"
                    name="FuelName"
                    value={formData.FuelName}
                    onChange={handleChange}
                    className={errors.FuelName ? "border-red-500" : ""}
                    placeholder="Enter Fuel Name"
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium">
                    Unit Price
                </Label>
                <Input
                    id="UnitPrice"
                    name="UnitPrice"
                    type="number"
                    value={formData.UnitPrice}
                    onChange={handleChange}
                    className={errors.UnitPrice ? "border-red-500" : ""}
                    placeholder="Enter Unit Price"
                />
                {errors.UnitPrice && <p className="text-sm text-red-500">{errors.UnitPrice}</p>}
                </div>

                <div className="space-y-2">
                <Label htmlFor="stockQuantity" className="text-sm font-medium">
                    Pre Order Level
                </Label>
                <Input
                    id="PreOrderLevel"
                    name="PreOrderLevel"
                    type="number"
                    value={formData.PreOrderLevel}
                    onChange={handleChange}
                    className={errors.PreOrderLevel ? "border-red-500" : ""}
                    placeholder="0"
                />
                {errors.PreOrderLevel && <p className="text-sm text-red-500">{errors.PreOrderLevel}</p>}
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

