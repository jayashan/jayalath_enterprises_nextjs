'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod";


import { z } from "zod";
import { useState } from "react";
import { login } from "@/actions/login";
import { Separator } from "@/components/ui/separator"

import { FormError } from "./form-error";

import { LoginSchema } from "@/schemas"
import Link from "next/link";




const LoginForm=()=>{
    const [loading,setLoading]=useState(false);
    const[error,setError]=useState('');


    const form=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:'',
            password:'',
        }

    });

    const onSubmit=async(data:z.infer<typeof LoginSchema>)=>{
        setLoading(true);
        login(data).then((res)=>{
            if(res?.error){
                setError(res?.error);
                setLoading(false);
            }else{
                setError('');
                setLoading(false);
            }
        });
    };


  return (
    <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="m@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder=""
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Link href="#" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                        {/* <Button size='sm' variant='link' asChild className="px-0 font-normal">
                            <Link href='/auth/reset'>Forgot Password</Link>
                        </Button> */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator className="w-full" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* <Button variant="outline" className="w-full">
                                    <Mail className="mr-2 h-4 w-4" />
                                        Google
                                    </Button> */}
                                </div>
                            </div>
                    <FormError message={error}/>
                    <Button type="submit" className="w-full bg-black text-white hover:bg-black">
                        {loading?'Loading.....':'Login'}
                    </Button>
                </form>

            </Form>
            {/* <GoogleLogin/>                      */}

        </CardContent>
        
    </Card>
  )
}

export default LoginForm;