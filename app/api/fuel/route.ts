import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


//create fuel

export async function POST(req:Request){
    const{FuelCode,FuelName,UnitPrice,PreOrderLevel}=await req.json();

    if(!FuelCode || !FuelName){
        return NextResponse.json(
            {error:'FuelCode and Fuel Name are required..!'},
            {status:500}
        );
    }

    try{
        const fuel=await prisma.fuel.create({
            data:{
                FuelCode,
                FuelName,
                UnitPrice,
                PreOrderLevel

            },
        });
        console.log('New Fuel has been added');
        return NextResponse.json(fuel);

    }catch(error){
        console.log(error);
        return NextResponse.json({message:'could not create'})
    }
}

//View all Fuel

export async function GET(){
    try{
        const fuel=await prisma.fuel.findMany({
            orderBy:{
                createdAt:'desc',
            }
        });
        return NextResponse.json(fuel);

    }catch(error){
        console.log(error);
        return NextResponse.json({message:'error occured..!'},{status:500});
    }
}