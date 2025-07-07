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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="hsl(var(--primary))"/>
        <path d="M19.3173 10.6667H14.6667V26.6667H19.3173V20.752H22.4427C25.5733 20.752 27.3333 18.464 27.3333 15.712C27.3333 12.96 25.5733 10.6667 22.4427 10.6667H19.3173ZM19.3173 17.2533V14.1707H22.2667C23.5733 14.1707 24.2773 14.752 24.2773 15.712C24.2773 16.672 23.5733 17.2533 22.2667 17.2533H19.3173Z" fill="white"/>
       </svg>
      <span className="text-2xl font-bold">Paymint</span>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Personal</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <ListItem href="#" title="International Transfers">
                    Send money to over 150 countries with low fees.
                  </ListItem>
                  <ListItem href="#" title="Multi-currency Account">
                    Hold and manage 20+ currencies in one account.
                  </ListItem>
                  <ListItem href="#" title="Paymint Card">
                    Spend globally with your debit card.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Business</NavigationMenuTrigger>
                <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <ListItem href="#" title="Business Accounts">
                    Local account details in multiple currencies.
                  </ListItem>
                  <ListItem href="#" title="Mass Payouts">
                    Pay your team and suppliers around the world.
                  </ListItem>
                  <ListItem href="#" title="API Integration">
                    Automate your workflows with our powerful API.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Open an account</Link>
            </Button>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu /></Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle><Logo /></SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 py-8">
                <Link href="#" className="text-lg font-medium">Personal</Link>
                <Link href="#" className="text-lg font-medium">Business</Link>
                <Link href="/blog" className="text-lg font-medium">Blog</Link>
                <Link href="/contact" className="text-lg font-medium">Contact Us</Link>
              </div>
              <div className="absolute bottom-8 left-4 right-4 flex flex-col space-y-2">
                <Button variant="ghost" asChild><Link href="/login">Log in</Link></Button>
                <Button asChild><Link href="/register">Open an account</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
