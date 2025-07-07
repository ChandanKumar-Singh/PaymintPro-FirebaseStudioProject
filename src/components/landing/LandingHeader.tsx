
'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronDown, Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Logo } from './Logo';

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#052011]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 focus:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-[#0A2D1A] text-white border-gray-700">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Paymint for Business
                            </div>
                            <p className="text-sm leading-tight text-white/80">
                              Global payments and financial solutions for
                              growing businesses.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="#" title="Payments">
                        Accept payments from customers worldwide.
                      </ListItem>
                      <ListItem href="#" title="Transfers">
                        Send money globally with low fees.
                      </ListItem>
                      <ListItem href="#" title="Multi-currency Account">
                        Hold and manage money in 35+ currencies.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#" passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent text-white hover:bg-white/10 focus:bg-white/10'
                      )}
                    >
                      Solutions
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#" passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent text-white hover:bg-white/10 focus:bg-white/10'
                      )}
                    >
                      Resources
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#" passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent text-white hover:bg-white/10 focus:bg-white/10'
                      )}
                    >
                      Company
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="hidden lg:flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              asChild
              className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full"
            >
              <Link href="/register">Create account</Link>
            </Button>
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#052011] text-white border-l-gray-800"
              >
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-white/20">
                    <Logo />
                  </div>
                  <nav className="flex flex-col gap-4 p-4 text-lg">
                    <Link
                      href="#"
                      className="hover:text-[#B2F35F] transition-colors"
                    >
                      <SheetClose>Products</SheetClose>
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-[#B2F35F] transition-colors"
                    >
                       <SheetClose>Solutions</SheetClose>
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-[#B2F35F] transition-colors"
                    >
                       <SheetClose>Resources</SheetClose>
                    </Link>
                     <Link
                      href="#"
                      className="hover:text-[#B2F35F] transition-colors"
                    >
                       <SheetClose>Company</SheetClose>
                    </Link>
                  </nav>
                  <div className="mt-auto p-4 space-y-4 border-t border-white/20">
                     <Button asChild variant="ghost" className="w-full text-lg hover:bg-white/10 hover:text-white">
                        <Link href="/login">Log in</Link>
                     </Button>
                     <Button asChild className="w-full bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 text-lg rounded-full">
                        <Link href="/register">Create account</Link>
                     </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white/80">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
