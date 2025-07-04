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
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowRightLeft },
  { href: '/accounts', label: 'Accounts', icon: Landmark },
  { href: '/payments', label: 'Payments', icon: Receipt },
  { href: '/cards', label: 'Cards', icon: CreditCard },
  { href: '/invoicing', label: 'Invoicing', icon: FileText },
  { href: '/trading', label: 'Trading', icon: CandlestickChart },
  { href: '/reports', label: 'Reports', icon: PieChart },
  { href: '/advisor', label: 'AI Advisor', icon: Sparkles },
];

const settingsItem = { href: '/settings', label: 'Settings', icon: Settings };

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between p-2">
      <SidebarMenu>
        {menuItems.map((item) => (
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
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(settingsItem.href)}
            tooltip={settingsItem.label}
          >
            <Link href={settingsItem.href}>
              <settingsItem.icon />
              {settingsItem.label}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
