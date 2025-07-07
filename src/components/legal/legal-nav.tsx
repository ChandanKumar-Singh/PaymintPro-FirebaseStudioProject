'use client';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const personalTermsNav = [
    { name: "General", href: "/terms#general" },
    { name: "Paymint Services", href: "/terms#services" },
    { name: "Customer Data", href: "/terms#data" },
    { name: "Security", href: "/terms#security" },
    { name: "Support", href: "/terms#support" },
    { name: "Communications", href: "/terms#communications" },
    { name: "Indemnification", href: "/terms#indemnification" },
    { name: "How to contact us", href: "/terms#contact" },
];

const mainLinks = [
    { name: "Personal Terms", href: "/terms", count: 8 },
    { name: "Business Terms", href: "/terms#", count: 10 },
    { name: "Privacy Policy", href: "/privacy", count: 9 },
    { name: "Cookie Policy", href: "/terms#", count: 7 },
];

export function LegalNav() {
    const pathname = usePathname();

    // A simple way to check for active hash links can be done client-side if needed,
    // but for this implementation, we focus on the page-level active state.
    
    return (
        <nav className="sticky top-24 space-y-8">
            <div>
                <ul className="space-y-1">
                     {mainLinks.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href} className={cn("flex justify-between items-center p-2 rounded-md font-semibold", pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100/50")}>
                                <span>{item.name}</span>
                                <Badge variant="secondary" className="bg-gray-200 text-gray-600 font-medium">{item.count}</Badge>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            {pathname === '/terms' && (
                 <div>
                    <ul className="space-y-1 border-l-2 border-gray-200 ml-3">
                        {personalTermsNav.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="block pl-4 py-1.5 border-l-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-400 -ml-px">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
