'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SparkleIcon } from 'lucide-react'



import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const Header = () => {
    return (

        <div className="hidden md:flex items-center gap-3">
            <div className="hidden md:flex items-center  w-full flex-col gap-3">
                <div className='bg-border flex justify-between items-center px-5 text-white w-full' >
                <SignedOut>
                    <SignInButton>
                        <Button variant="outline" size="sm">Sign In</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button size="sm">Sign Up</Button>
                    </SignUpButton>
                </SignedOut>
                    <ModeToggle />
                    <ul className='flex justify-center gap-4'>
                        <li className='imptext text-red-600'>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Industry</li>
                    </ul>

                <SignedIn>
                    
                        <UserButton />
                        </SignedIn>
                </div>
            </div>
        </div>

    )
}

export default Header