import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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