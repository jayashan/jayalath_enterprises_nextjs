import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


//Get dynamic data

export async function GET(
    req:Request,
    {params}:{params:Promise<{id:string}>}
    
){
    try{
        const id=(await params).id;
        //console.log('id :' , id);
        const person=await prisma.person.findUnique(
            {where:{id}}
        );
        return NextResponse.json(person);
    
    }catch(error){
        console.log(error);
        return NextResponse.json({message:'Could not fetch person details'});
    }
}

//update data

export async function PUT(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){
    const{FirstName,LastName,Email,Address,TpNo}=await req.json();
    const id=(await params).id;

    try{
        const person=await prisma.person.update({
            where:{id},
            data:{
                FirstName,
                LastName,
                Email,
                Address,
                TpNo
            },
        });
        return NextResponse.json(person);

    }catch(error){
        console.log(error)
        return NextResponse.json({message:'Error occured while editing'});

    }
}

//Delete data

export async function DELETE(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){
    const id=(await params).id;

    try{
        const person=await prisma.person.delete({
            where:{id}
        });
        return NextResponse.json(person);

    }catch(error){
        console.log(error);
        return NextResponse.json({message:'Error occured while deleting'})
    }

}