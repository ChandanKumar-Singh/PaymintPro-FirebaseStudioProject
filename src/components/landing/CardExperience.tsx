
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export function CardExperience() {
    return (
        <section className="bg-[#052011] text-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div className="lg:order-2 lg:pl-12">
                         <p className="font-bold text-white/60 mb-2">DEBIT CARD</p>
                         <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">The Ultimate Card Experience Across Borders</h2>
                         <p className="text-lg text-white/80 mb-8">
                           Enjoy the flexibility of a physical and virtual card to send and receive money from your multi-currency account.
                         </p>
                         <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#B2F35F]" /> Physical & virtual card</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#B2F35F]" /> No hidden fees</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#B2F35F]" /> Real exchange rate</li>
                         </ul>
                         <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-md font-bold">
                            <Link href="/cards">Learn more</Link>
                         </Button>
                    </div>
                    <div className="lg:order-1">
                        <Image src="https://placehold.co/500x350.png" data-ai-hint="green credit card" alt="Paymint Debit Card" width={500} height={350} className="rounded-xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
