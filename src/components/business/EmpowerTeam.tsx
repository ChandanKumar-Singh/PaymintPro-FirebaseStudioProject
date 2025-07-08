'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const features = [
    "Order a card",
    "No hidden fees",
    "Virtual & physical cards"
];

export function EmpowerTeam() {
  return (
    <section className="py-20 sm:py-28 bg-[#052011] text-white">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2 lg:pl-12">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">Empower team with Paymint Business Cards</h2>
                    <p className="text-lg text-white/80 mb-8">
                        Enjoy the flexibility of a physical and virtual card to send and receive money from your multi-currency account.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                             <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-[#B2F35F]" />
                                <span className="text-lg">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 px-6 py-5 text-base font-bold">
                        <Link href="#">Order</Link>
                    </Button>
                </div>
                 <div className="lg:order-1 flex justify-center items-center">
                    <Image src="https://placehold.co/500x350.png" data-ai-hint="two credit cards" alt="Paymint Business Cards" width={500} height={350} className="rounded-xl" />
                </div>
            </div>
        </div>
    </section>
  )
}
