
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export function Offerings() {
    return (
        <section className="bg-white pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl">
                        <h3 className="text-3xl font-bold mb-4">For Individuals</h3>
                        <p className="text-secondary-foreground/80 mb-6">Send, spend, and receive money from a single account.</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> No subscription, monthly, or hidden fees.</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Hold 35+ currencies</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Get your Paymint card</li>
                        </ul>
                        <Button asChild variant="outline" className="bg-transparent text-foreground border-foreground/40 hover:bg-accent hover:text-accent-foreground">
                            <Link href="/features">Learn more</Link>
                        </Button>
                         <Image src="https://placehold.co/350x300.png" data-ai-hint="mobile money transfer" alt="Individual use" width={350} height={300} className="ml-auto mt-8" />
                    </div>
                    <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl">
                        <h3 className="text-3xl font-bold mb-4">For Business</h3>
                        <p className="text-secondary-foreground/80 mb-6">Tools for your business to grow globally.</p>
                         <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> No subscription, monthly, or hidden fees.</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Mass Payouts</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> API Integrations</li>
                        </ul>
                        <Button asChild variant="outline" className="bg-transparent text-foreground border-foreground/40 hover:bg-accent hover:text-accent-foreground">
                           <Link href="/business">Learn more</Link>
                        </Button>
                         <Image src="https://placehold.co/350x300.png" data-ai-hint="business payment solution" alt="Business use" width={350} height={300} className="ml-auto mt-8" />
                    </div>
                </div>
            </div>
        </section>
    );
}
