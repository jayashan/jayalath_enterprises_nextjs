import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import slider from '@/assets/images/slider.jpg'

import { AspectRatio } from "@/components/ui/aspect-ratio"


import { TFuel } from "@/app/types";

const getFuel=async():Promise<TFuel[]|null>=>{
    try{
        const res=await fetch(`${process.env.NEXTAUTH_URL}/api/fuel`);

        if(res.ok){
            const fuel=await res.json();
            return fuel;
        }

    }catch(error){
        console.log(error);
        
    }
    return null;
};



export default async function ProductsServices() {
  const fuel=await getFuel();

  return (
    <div className="space-y-12 pt-10">
      <section id="products">
        <h2 className="text-3xl font-semibold mb-4">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fuel && fuel.map((fuel:TFuel)=>(
            <Card key={fuel.id}>
              <CardHeader>
                <CardTitle>{fuel.FuelCode}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{fuel.FuelName}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section id="products">
        <h2 className="text-3xl font-semibold mb-4">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="w-[200px]">
          <AspectRatio ratio={16 / 9}>
            <Image src={slider}alt="Image" className="rounded-md object-cover" />
          </AspectRatio>
        </div>

        </div>
      </section>
    </div>
  )
}

