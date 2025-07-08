
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export function MultiCurrency() {
    return (
        <section className="bg-white pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:pr-12">
                         <p className="font-bold text-muted-foreground mb-2">FEATURES</p>
                         <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">One account for 35+ currencies around the world</h2>
                         <p className="text-lg text-muted-foreground mb-8">
                            With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.
                         </p>
                         <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Bank-level security</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Millions of happy customers</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> No hidden fees</li>
                         </ul>
                         <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold">
                            <Link href="/multicurrency-coverage">Get started</Link>
                         </Button>
                    </div>
                    <div>
                        <Image src="https://placehold.co/500x400.png" data-ai-hint="currency exchange rates" alt="Currency exchange" width={500} height={400} className="rounded-xl shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}
