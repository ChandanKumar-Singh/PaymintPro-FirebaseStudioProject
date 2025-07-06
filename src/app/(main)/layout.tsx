'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Settings, Search, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { ChangePlanDialog } from '@/components/dialogs/change-plan-dialog';
import { useAuth } from '@/components/auth-provider';
import { CommandPalette } from '@/components/command-palette';

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
      <span className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
        Paymint
      </span>
    </div>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, userProfile, refetchUserProfile } = useAuth();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  const showUpgradeCard = userProfile?.subscription?.plan === 'Starter';

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
      <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader>
          <Link href="/dashboard">
            <Logo />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          {showUpgradeCard && (
            <Card className="m-2 border-none bg-sidebar-accent shadow-none">
              <CardHeader className="p-2 pt-2">
                <CardTitle className="flex items-center gap-2 text-sm text-sidebar-primary font-medium">
                  <Rocket className="h-4 w-4 text-sidebar-primary" />
                  <span>Upgrade to Pro</span>
                </CardTitle>
                <CardDescription className="text-xs">
                  Unlock all features and get priority support.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <ChangePlanDialog 
                  currentPlan={userProfile?.subscription?.plan} 
                  onSuccess={refetchUserProfile}
                  triggerButton={
                    <Button size="sm" className="w-full">
                      Upgrade Now
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden flex-1 md:grow-0 md:flex">
                <Button
                    variant="outline"
                    className="w-full justify-between rounded-lg bg-card pl-3 pr-2 text-muted-foreground md:w-[200px] lg:w-[320px]"
                    onClick={() => setCommandPaletteOpen(true)}
                >
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Search...
                    </div>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </div>
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </div>
  );
}
