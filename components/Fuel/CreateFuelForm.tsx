"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
//import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Switch } from "@/components/ui/switch"
// import { ImagePlus, X } from "lucide-react"
// import { error } from "console"
import { useRouter } from "next/navigation"

export default function CreateFuelForm() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   category: "",
  //   sku: "",
  //   stockQuantity: "",
  //   status: true,
  // })

  // const [images, setImages] = useState<string[]>([])
  // const [isSubmitting, setIsSubmitting] = useState(false)
  // const [errors, setErrors] = useState<Record<string, string>>({})

  //formData

  const[FuelCode,setFuelCode]=useState("");
  const[FuelName,setFuelName]=useState("");
  const[UnitPrice,setUnitPrice]=useState("");
  const[PreOrderLevel,setPreOrderLevel]=useState("");
  const[error,setError]=useState("");

  const router=useRouter();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target
  //   setFormData((prev) => ({ ...prev, [name]: value }))

  //   // Clear error when field is changed
  //   if (errors[name]) {
  //     setErrors((prev) => {
  //       const newErrors = { ...prev }
  //       delete newErrors[name]
  //       return newErrors
  //     })
  //   }
  // }

  // const handleSelectChange = (name: string, value: string) => {
  //   setFormData((prev) => ({ ...prev, [name]: value }))

  //   // Clear error when field is changed
  //   if (errors[name]) {
  //     setErrors((prev) => {
  //       const newErrors = { ...prev }
  //       delete newErrors[name]
  //       return newErrors
  //     })
  //   }
  // }

  // const handleStatusChange = (checked: boolean) => {
  //   setFormData((prev) => ({ ...prev, status: checked }))
  // }

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
  //     setImages((prev) => [...prev, ...newImages])
  //   }
  // }

  // const removeImage = (index: number) => {
  //   setImages((prev) => prev.filter((_, i) => i !== index))
  // }

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {}

  //   if (!formData.name.trim()) newErrors.name = "Product name is required"
  //   if (!formData.description.trim()) newErrors.description = "Description is required"
  //   if (!formData.price) newErrors.price = "Price is required"
  //   else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0)
  //     newErrors.price = "Price must be a positive number"
  //   if (!formData.category) newErrors.category = "Category is required"
  //   if (!formData.sku.trim()) newErrors.sku = "SKU is required"
  //   if (!formData.stockQuantity) newErrors.stockQuantity = "Stock quantity is required"
  //   else if (
  //     isNaN(Number(formData.stockQuantity)) ||
  //     !Number.isInteger(Number(formData.stockQuantity)) ||
  //     Number(formData.stockQuantity) < 0
  //   )
  //     newErrors.stockQuantity = "Stock quantity must be a non-negative integer"

  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(!FuelCode||!FuelName){
      setError("fields are required...!");
      return;
    }
    //console.log(FuelCode,FuelName,UnitPrice,PreOrderLevel)

      try{
          const res=await fetch("/api/fuel",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            FuelCode,
            FuelName,
            UnitPrice:Number(UnitPrice),
            PreOrderLevel:Number(PreOrderLevel),
          }),
        });
        if(res.ok){
          console.log('fuel added')
          console.log(FuelCode,FuelName,UnitPrice,PreOrderLevel,'added')
          router.push('/dashboard');
        }

        
      }catch(error){
        console.log(error);
      }

    // if (!validateForm()) return

    // setIsSubmitting(true)

    // try {
    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000))

    //   console.log("Product submitted:", {
    //     ...formData,
    //     price: Number(formData.price),
    //     stockQuantity: Number(formData.stockQuantity),
    //     images,
    //   })

    //   // Success - Clear form or navigate away
    //   alert("Product added successfully!")
    //   setFormData({
    //     name: "",
    //     description: "",
    //     price: "",
    //     category: "",
    //     sku: "",
    //     stockQuantity: "",
    //     status: true,
    //   })
    //   setImages([])
    // } catch (error) {
    //   console.error("Error submitting product:", error)
    //   alert("There was an error submitting the product. Please try again.")
    // } finally {
    //   setIsSubmitting(false)
    // }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto content-center">
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
        <CardDescription>Fill in the  details to add a new product to your inventory</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        {/* <CardContent className="space-y-6"> */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Fuel Code
            </Label>
            <Input
              // id="name"
              // name="name"
              // value={formData.name}
              // onChange={handleChange}
              // className={errors.name ? "border-red-500" : ""}
              // placeholder="Enter product name"
              id="FuelCode"
              onChange={(e)=>setFuelCode(e.target.value)}
              type="text"
              placeholder="Fuel Code"
            />
            {/* {errors.name && <p className="text-sm text-red-500">{errors.name}</p>} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Fuel Name
            </Label>
            <Input
              // id="name"
              // name="name"
              // value={formData.name}
              // onChange={handleChange}
              // className={errors.name ? "border-red-500" : ""}
              // placeholder="Enter product name"
              id="FuelName"
              onChange={(e)=>setFuelName(e.target.value)}
              type="text"
              placeholder="Fuel Name"
            />
            {/* {errors.name && <p className="text-sm text-red-500">{errors.name}</p>} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Unit Price
            </Label>
            <Input
              // id="name"
              // name="name"
              // value={formData.name}
              // onChange={handleChange}
              // className={errors.name ? "border-red-500" : ""}
              // placeholder="Enter product name"
              id="UnitPrice"
              value={UnitPrice}
              onChange={(e)=>setUnitPrice(e.target.value)}
              type="number"
              placeholder="Unit Price"
            />
            {/* {errors.name && <p className="text-sm text-red-500">{errors.name}</p>} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Pre order Level
            </Label>
            <Input
              // id="name"
              // name="name"
              // value={formData.name}
              // onChange={handleChange}
              // className={errors.name ? "border-red-500" : ""}
              // placeholder="Enter product name"
              id="PreOrderLevel"
              value={PreOrderLevel}
              onChange={(e)=>setPreOrderLevel(e.target.value)}
              type="number"
              placeholder="Pre Order Level"
            />
            {/* {errors.name && <p className="text-sm text-red-500">{errors.name}</p>} */}
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description*
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
              placeholder="Enter product description"
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Unit Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? "border-red-500" : ""}
                placeholder="0.00"
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category*
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Kitchen</SelectItem>
                  <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="sku" className="text-sm font-medium">
                SKU/Product Code*
              </Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={errors.sku ? "border-red-500" : ""}
                placeholder="SKU-12345"
              />
              {errors.sku && <p className="text-sm text-red-500">{errors.sku}</p>}
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="stockQuantity" className="text-sm font-medium">
                Stock Quantity*
              </Label>
              <Input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                min="0"
                step="1"
                value={formData.stockQuantity}
                onChange={handleChange}
                className={errors.stockQuantity ? "border-red-500" : ""}
                placeholder="0"
              />
              {errors.stockQuantity && <p className="text-sm text-red-500">{errors.stockQuantity}</p>}
            </div>
          </div> */}

          {/* <div className="space-y-4">
            <Label className="text-sm font-medium">Product Images</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square border rounded-md overflow-hidden group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="aspect-square border border-dashed rounded-md flex items-center justify-center bg-muted/20">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-2">Add Image</span>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div> */}

          {/* <div className="flex items-center space-x-2">
            <Switch id="status" checked={formData.status} onCheckedChange={handleStatusChange} />
            <Label htmlFor="status" className="text-sm font-medium">
              {formData.status ? "Active" : "Draft"}
            </Label>
          </div> */}
        {/* </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </CardFooter> */}
        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
        <Button type="submit" className="bg-blue-500 text-white">Submit</Button>
      </form>
    </Card>
  )
}

