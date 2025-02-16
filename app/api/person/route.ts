import {NextResponse} from 'next/server'
import { prisma } from '@/lib/prisma';


//create person
export async function POST(req:Request){
    const {FirstName,LastName,Email,Address,TpNo}=await req.json();

    if(!FirstName || !LastName){
        return NextResponse.json(
            {error:'FirstName and LastName are required'},
            {status:500}
        );
    }

    try{
        const Person=await prisma.person.create({
            data:{
                FirstName,
                LastName,
                Email,
                Address,
                TpNo,
            },
        });
        console.log('Post Created');
        return NextResponse.json(Person);
    }catch(error){
        console.log(error);
        return NextResponse.json({message:'Could not create post.'})
    }
}

//view all persons

export async function GET(){
    try{
        const person=await prisma.person.findMany({
            orderBy:{
                createdAt:'desc',
            },
        });
        return NextResponse.json(person);

    }catch(error){
        console.log(error);
        return NextResponse.json({message:'Some error occured'},{status:500});
    }
}