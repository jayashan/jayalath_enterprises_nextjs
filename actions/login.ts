'use server'


import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";




export const login=async(data:z.infer<typeof LoginSchema>)=>{
    const validateData=LoginSchema.parse(data);


    if(!validateData){
        return{error:'Invalid Input data'};

    }
    const{email,password}=validateData;

    const userExists=await prisma.user.findFirst({
        where:{
            email:email,
        },
    });
    if(!userExists || !userExists.password||!userExists.email){
        return{error:'User not found'};
    }
    try{
        await signIn('credentials',{
            email:userExists.email,
            password:password,
            redirectTo:'/dashboard',
        })

    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return{error:'Invalid Credentials'};
                default:
                    return{error:'Please confirm your email address and password'}
            }
        }
        throw error;
    }
    return {success:'User logged in successsfully..!'}
}