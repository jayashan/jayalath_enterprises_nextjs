//import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';


export const GET=async (request,{params})=>{
    const prisma= new PrismaClient();

    try{
        const{id}=await params;

        const post=await prisma.post.findUnique({
            where:{
                id
            }
        });
        if(!post){
            return NextResponse.json(
                {message:'Post not found',err},
                {status:404}
            )
        }
        return NextResponse.json(post);
    }catch(err){
        return NextResponse.json({message:'Get Error',err},{status:500});
    }
}

export const PATCH=async(request,{params})=>{
    const prisma= new PrismaClient();

    try{
        const body=await request.json();
        const{title,description}=body;

        const{id}=await params;


        const UpdatePost=await prisma.post.update({
            where:{
                id
            },
            data:{
                title,
                description
            }
        })
        if(!UpdatePost){
            return NextResponse.json(
                {message:'Post not found',err},
                {status:404}
            )
        }
        return NextResponse.json(UpdatePost);

    }catch(err){
        return NextResponse.json({message:'Update Error',err},{status:500})
    }
}

export const DELETE=async (request,{params})=>{
    const prisma= new PrismaClient();

    try{
        const{id}=await params;

        const post=await prisma.post.delete({
            where:{
                id
            }
        });
        
        return NextResponse.json(post,'Post Has been deleted..!');
    }catch(err){
        return NextResponse.json({message:'Delete Error',err},{status:500});
    }
}