"use client"

import React from 'react'
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constants'


const MobileNav = () => {
  const pathname = usePathname()


  return (
    <header className='header'>
        <Link href="/" className='flex items-center gap-2 md:py-2'>
            <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28}></Image>
        </Link>
        <nav className='flex gap-2'>
            <SignedIn>
                <UserButton ></UserButton>
                  <Sheet>
                      <SheetTrigger>
                          <Image src="/assets/icons/menu.svg" alt="menu" width={32} height={32} className='cursor-pointer'></Image>
                      </SheetTrigger>
                      <SheetContent className='sheet-content sm:w-64'>
                          <>
                            <Image src="/assets/images/logo-text.svg" alt="logo" width={152} height={23}></Image>

                              <ul className='header-nav_elements'>
                                  {navLinks.map((link) => {
                                      const isActive = link.route === pathname

                                      return (
                                          <li key={link.route} className={`${isActive && "gradient-text"} p-18 flex whitespace-nowrap text-dark-700`}>
                                              <Link href={link.route} className='sidebar-link cursor-pointer' >
                                                  <Image src={link.icon} alt="logo" width={24} height={24}></Image>
                                                  {link.label}
                                              </Link>
                                          </li>
                                        )
                                    })}
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>

            </SignedIn>
        </nav>
    </header>
  )
}

export default MobileNav
