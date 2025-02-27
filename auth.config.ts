import Google from "next-auth/providers/google";
import GitHub from 'next-auth/providers/github';
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";


export default { providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
        async authorize(credentials){
            const validateData=LoginSchema.safeParse(credentials);
            if(!validateData.success)return null;
            const{email,password}=validateData.data;
            const user=await prisma.user.findFirst({
                where:{
                    email:email,
                },
            });
            if(!user ||!user.password||!user.email){
                return null;
            }
            const passwordMatch=await bcrypt.compare(password,user.password);

            if(passwordMatch){
                return user;
            }
            return null;

        }
    }),
] } satisfies NextAuthConfig;