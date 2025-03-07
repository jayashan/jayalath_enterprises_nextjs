import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


//get Dunamic data

export async function GET(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){
    try{
        const id=(await params).id;
        const fuel=await prisma.fuel.findUnique(
            {where:{id}}
        );

        return NextResponse.json(fuel);


    }catch{
        //console.log(error);
        return NextResponse.json({message:'coudnt fetch data'})
    }

}


//update data


export async function PUT(
    req:Request,
    {params}:{params:Promise<{id:string}>}

){
    const {FuelCode,FuelName,UnitPrice,PreOrderLevel}=await req.json();
    const id=(await params).id;

    try{
        const fuel=await prisma.fuel.update({
            where:{id},
            data:{
                FuelCode,
                FuelName,
                UnitPrice,
                PreOrderLevel
            }
        });
        return NextResponse.json(fuel);
        console.log('updated fuel :',fuel);

    }catch{
        return NextResponse.json({message:'error occured while edditing'},{status:500});
    }
}


//delete data

export async function DELETE(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){
    const id=(await params).id;

    try{
        const fuel=await prisma.fuel.delete({
            where:{id},
        });
        return NextResponse.json(fuel);

    }catch{
        return NextResponse.json({message:'delete error'},{status:500});
    }
}