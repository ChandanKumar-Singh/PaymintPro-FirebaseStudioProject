'use client';

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronDown, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.3828 31.0625C18.5391 31.0625 17.8047 30.75 17.1797 30.125C16.5547 29.5 16.2422 28.7656 16.2422 27.9219V14.3438H10.1172C9.27344 14.3438 8.53906 14.0312 7.91406 13.4062C7.28906 12.7812 6.97656 12.0469 6.97656 11.2031V5.07812C6.97656 4.23438 7.28906 3.5 7.91406 2.875C8.53906 2.25 9.27344 1.9375 10.1172 1.9375H21.8828C22.7266 1.9375 23.4609 2.25 24.0859 2.875C24.7109 3.5 25.0234 4.23438 25.0234 5.07812V10.75C25.0234 11.4375 24.8516 12.0547 24.5078 12.6016C24.1641 13.1484 23.6953 13.5703 23.1016 13.8672C22.5078 14.1641 21.8438 14.3125 21.1094 14.3125H19.3828V27.9219C19.3828 28.7656 19.0703 29.5 18.4453 30.125C17.8203 30.75 17.0859 31.0625 16.2422 31.0625H15.9297C16.8047 31.0625 17.5703 30.75 18.2266 30.125C18.8828 29.5 19.2109 28.7656 19.2109 27.9219V17.5H21.1094C21.9844 17.5 22.75 17.1875 23.4062 16.5625C24.0625 15.9375 24.3906 15.1875 24.3906 14.3125V5.07812C24.3906 4.46875 24.2109 3.92969 23.8516 3.46094C23.4922 2.99219 23.0312 2.64844 22.4688 2.42969C21.9062 2.21094 21.3281 2.0625 20.7344 2.0625H10.1172C9.52344 2.0625 8.94531 2.21094 8.38281 2.42969C7.82031 2.64844 7.35938 2.99219 7 3.46094C6.64062 3.92969 6.46094 4.46875 6.46094 5.07812V11.2031C6.46094 11.8125 6.64062 12.3516 7 12.8203C7.35938 13.2891 7.82031 13.6328 8.38281 13.8516C8.94531 14.0703 9.52344 14.1875 10.1172 14.1875H16.4141V5.07812C16.4141 4.23438 16.7266 3.5 17.3516 2.875C17.9766 2.25 18.7109 1.9375 19.5547 1.9375H19.3828V31.0625Z" fill="#B2F35F"/>
       </svg>
      <span className="text-2xl font-bold text-white">Paymint</span>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white/80">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function LandingHeader() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10 hover:text-white")}>
                  Transfer
                </NavigationMenuLink>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10 hover:text-white")}>
                  Pricing
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10">Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#052011]/95 backdrop-blur-sm border border-white/20">
                  <ListItem href="#" title="About Us">
                    Learn more about our mission and team.
                  </ListItem>
                  <ListItem href="#" title="Careers">
                    Join us in revolutionizing finance.
                  </ListItem>
                  <ListItem href="#" title="Blog">
                    Read our latest articles and insights.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#052011]/95 backdrop-blur-sm border border-white/20">
                  <ListItem href="#" title="Help Center">
                    Find answers to your questions.
                  </ListItem>
                  <ListItem href="#" title="API Documentation">
                    Integrate with our powerful platform.
                  </ListItem>
                  <ListItem href="#" title="Contact Us">
                    Get in touch with our support team.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full">
                <Link href="/register">Create account</Link>
            </Button>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#052011] text-white border-l-white/20">
              <div className="flex flex-col space-y-4 py-8">
                <Link href="#" className="text-lg font-medium">Transfer</Link>
                <Link href="#" className="text-lg font-medium">Pricing</Link>
                <Link href="#" className="text-lg font-medium">Company</Link>
                <Link href="#" className="text-lg font-medium">Resources</Link>
              </div>
              <div className="absolute bottom-8 left-4 right-4 flex flex-col space-y-2">
                <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white"><Link href="/login">Login</Link></Button>
                <Button asChild className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full"><Link href="/register">Create account</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
