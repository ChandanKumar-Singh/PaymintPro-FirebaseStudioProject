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
        <path d="M19.3828 31.0625C18.5391 31.0625 17.8047 30.75 17.1797 30.125C16.5547 29.5 16.2422 28.7656 16.2422 27.9219V14.3438H10.1172C9.27344 14.3438 8.53906 14.0312 7.91406 13.4062C7.28906 12.7812 6.97656 12.0469 6.97656 11.2031V5.07812C6.97656 4.23438 7.28906 3.5 7.91406 2.875C8.53906 2.25 9.27344 1.9375 10.1172 1.9375H21.8828C22.7266 1.9375 23.4609 2.25 24.0859 2.875C24.7109 3.5 25.0234 4.23438 25.0234 5.07812V10.75C25.0234 11.4375 24.8516 12.0547 24.5078 12.6016C24.1641 13.1484 23.6953 13.5703 23.1016 13.8672C22.5078 14.1641 21.8438 14.3125 21.1094 14.3125H19.3828V27.9219C19.3828 28.7656 19.0703 29.5 18.4453 30.125C17.8203 30.75 17.0859 31.0625 16.2422 31.0625H15.9297C16.8047 31.0625 17.5703 30.75 18.2266 30.125C18.8828 29.5 19.2109 28.7656 19.2109 27.9219V17.5H21.1094C21.9844 17.5 22.75 17.1875 23.4062 16.5625C24.0625 15.9375 24.3906 15.1875 24.3906 14.3125V5.07812C24.3906 4.46875 24.2109 3.92969 23.8516 3.46094C23.4922 2.99219 23.0312 2.64844 22.4688 2.42969C21.9062 2.21094 21.3281 2.0625 20.7344 2.0625H10.1172C9.52344 2.0625 8.94531 2.21094 8.38281 2.42969C7.82031 2.64844 7.35938 2.99219 7 3.46094C6.64062 3.92969 6.46094 4.46875 6.46094 5.07812V11.2031C6.46094 11.8125 6.64062 12.3516 7 12.8203C7.35938 13.2891 7.82031 13.6328 8.38281 13.8516C8.94531 14.0703 9.52344 14.1875 10.1172 14.1875H16.4141V5.07812C16.4141 4.23438 16.7266 3.5 17.3516 2.875C17.9766 2.25 18.7109 1.9375 19.5547 1.9375H19.3828V31.0625Z" fill="hsl(var(--primary))"/>
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
