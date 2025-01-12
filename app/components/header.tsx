'use client'
import Link from "next/link";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button";



export default function Header(){
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return(
        <header className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href='/' className="text-2xl font-bold">Jayalath Enterprises</Link>
                <nav>
                    <Button variant='ghost' asChild>
                        <Link href={'/'}>Home</Link>
                    </Button>
                    <Button variant='ghost' asChild>
                        <Link href={'/'}>Products</Link>
                    </Button>
                    <Button variant='ghost' asChild>
                        <Link href={'/'}>Services</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    >
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </nav>
            </div> 
        </header>
    )
}