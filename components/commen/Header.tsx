'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React, { Suspense } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SparkleIcon } from 'lucide-react'

const Header = () => {
  return (

          <div className="hidden md:flex items-center gap-3">
              <Suspense fallback="loading ...">
                  <SignedOut>
                      <SignInButton>
                          <Button variant="outline" size="sm">Sign In</Button>
                      </SignInButton>
                      <SignUpButton>
                          <Button size="sm">Sign Up</Button>
                      </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                      <Button asChild size="sm">
                          <Link href={"/submit"}>
                              <SparkleIcon className="size-4" />
                              <span className="hidden lg:inline">Submit Project</span>
                              <span className="lg:hidden">Submit</span>
                          </Link>
                      </Button>
                      <UserButton />
                  </SignedIn>
              </Suspense>
          </div>

  )
}

export default Header
