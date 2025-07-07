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
