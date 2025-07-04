'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="hsl(var(--primary))" />
        <path
          d="M14.488 8H11V20H14.488V15.564H17.332C19.932 15.564 21.5 13.848 21.5 11.784C21.5 9.72 19.932 8 17.332 8H14.488ZM14.488 12.94V10.628H17.2C18.3 10.628 18.928 11.064 18.928 11.784C18.928 12.504 18.3 12.94 17.2 12.94H14.488Z"
          fill="hsl(var(--primary-foreground))"
          transform="translate(-2, -2)"
        />
      </svg>
      <span className="text-xl font-semibold">
        Paymint
      </span>
    </div>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle Navigation">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="grid gap-4 p-4">
          <Link href="/" className="mb-4" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <nav className="grid gap-2 text-base font-medium">
            <Link href="#features" onClick={() => setOpen(false)} className="block p-2 hover:bg-muted rounded-md">Features</Link>
            <Link href="#pricing" onClick={() => setOpen(false)} className="block p-2 hover:bg-muted rounded-md">Pricing</Link>
            <Link href="#contact" onClick={() => setOpen(false)} className="block p-2 hover:bg-muted rounded-md">Contact</Link>
          </nav>
          <div className="grid gap-2 mt-4">
            <Button asChild variant="outline"><Link href="/login">Sign In</Link></Button>
            <Button asChild><Link href="/register">Sign Up</Link></Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
