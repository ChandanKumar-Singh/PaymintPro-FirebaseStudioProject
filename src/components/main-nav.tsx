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
];

const settingsItem = { href: '/settings', label: 'Settings', icon: Settings };

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between p-2">
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <a>
                  <item.icon />
                  {item.label}
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href={settingsItem.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(settingsItem.href)}
              tooltip={settingsItem.label}
            >
              <a>
                <settingsItem.icon />
                {settingsItem.label}
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
