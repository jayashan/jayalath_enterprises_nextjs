'use client'
import { useEffect, useState } from "react";
import Loading from "./loading";
import ProductsServices from "@/components/product-services";
import Hero from "@/components/hero";



export default function Home() {
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },5000)
  },[]);

  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-50">
        {loading?<Loading/> :
          <>  
            <div className="min-h-screen flex flex-col">
              <Hero/>
              <ProductsServices/>
            </div>
          </>
        }
      </main>
  );
}
