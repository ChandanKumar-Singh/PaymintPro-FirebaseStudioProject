'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const features = [
    "Order a physical card",
    "No subscription fee",
    "Free ATM withdrawals"
]

export function CardExperience() {
  return (
    <section className="py-20 sm:py-28 bg-[#052011] text-white">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center lg:order-2">
                    <Image src="https://placehold.co/450x300.png" data-ai-hint="credit card modern" alt="Paymint Card" width={450} height={300} className="rounded-xl shadow-2xl -rotate-6" />
                </div>
                <div className="lg:pr-12 lg:order-1">
                    <p className="font-bold text-white/60 mb-2">Paymint Card</p>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">The Ultimate Card Experience Across Borders</h2>
                    <p className="text-lg text-white/80 mb-8">
                        Enjoy the flexibility of a physical and virtual card to send and receive money from your multi-currency account.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                             <li key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#B2F35F] flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-[#052011]" />
                                </div>
                                <span className="text-lg">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full px-6 py-5 text-base font-bold">
                        <Link href="#">Create a card</Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
  )
}
