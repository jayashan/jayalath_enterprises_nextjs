'use client'
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";

// function SlowComponent(){
//   const startTime=Date.now();
//   while(Date.now()-startTime<3000){
//     //Wait For 3 second
//   }
//   return <h1 className="text-4xl font-bold text-gray-800">Welcome to our awesome website!</h1>
// }

export default function Home() {
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },5000)
  },[]);

  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        {loading?<Loading/> :
          <>  
            <h1>Jayalath Enterprises Lanka Filling Station</h1>
          </>
        }
      </main>
  );
}
