'use client';
import React from 'react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/components/auth-provider';
import { CommandPalette } from '@/components/command-palette';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChangePlanDialog } from '@/components/dialogs/change-plan-dialog';

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
       <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="hsl(var(--primary))"/>
        <path d="M19.3173 10.6667H14.6667V26.6667H19.3173V20.752H22.4427C25.5733 20.752 27.3333 18.464 27.3333 15.712C27.3333 12.96 25.5733 10.6667 22.4427 10.6667H19.3173ZM19.3173 17.2533V14.1707H22.2667C23.5733 14.1707 24.2773 14.752 24.2773 15.712C24.2773 16.672 23.5733 17.2533 22.2667 17.2533H19.3173Z" fill="hsl(var(--sidebar-primary-foreground))"/>
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
  const { userProfile, refetchUserProfile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const showUpgradeCard = userProfile?.subscription?.plan === 'Starter';

  const action = searchParams.get('action');
  const isChangePlanOpen = action === 'change-plan';

  const handleOpen = (newAction: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('action', newAction);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('action');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
       <ChangePlanDialog 
          open={isChangePlanOpen}
          onOpenChange={(open) => !open && handleClose()}
          currentPlan={userProfile?.subscription?.plan} 
          onSuccess={() => {
              refetchUserProfile();
              handleClose();
          }}
          triggerButton={
            <Button size="sm" className="w-full">
              Upgrade Now
            </Button>
          }
        />

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
                <Button size="sm" className="w-full" onClick={() => handleOpen('change-plan')}>
                  Upgrade Now
                </Button>
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
            <CommandPalette />
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </div>
  );
}
