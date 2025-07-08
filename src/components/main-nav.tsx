'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ArrowRightLeft,
  Landmark,
  CreditCard,
  PieChart,
  Settings,
  Receipt,
  FileText,
  CandlestickChart,
  Sparkles,
  Target,
  LifeBuoy,
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/transactions', label: 'Transactions', icon: ArrowRightLeft },
  { href: '/dashboard/accounts', label: 'Accounts', icon: Landmark },
  { href: '/dashboard/user-cards', label: 'Cards', icon: CreditCard },
  { href: '/dashboard/payments', label: 'Payments', icon: Receipt },
  { href: '/dashboard/budgets', label: 'Budgets', icon: Target },
  { href: '/dashboard/invoicing', label: 'Invoicing', icon: FileText },
  { href: '/dashboard/trading', label: 'Trading', icon: CandlestickChart },
  { href: '/dashboard/reports', label: 'Reports', icon: PieChart },
  { href: '/dashboard/advisor', label: 'AI Advisor', icon: Sparkles },
];

const secondaryMenuItems = [
  { href: '/dashboard/support', label: 'Support', icon: LifeBuoy },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings }
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between p-2">
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={
                isActive(item)}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                {item.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarMenu>
        {secondaryMenuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                {item.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );

  function isActive(item: any): boolean | undefined {
    console.log(`Checking active state for ${item.href} against ${pathname}`);
    return item.href == '/dashboard' ? pathname == '/dashboard' :
      pathname.startsWith(item.href);
  }
}
