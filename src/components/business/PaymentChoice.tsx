'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const features = [
    "No credit checks",
    "Offers a variety of methods",
    "Transact securely"
];

export function PaymentChoice() {
  return (
    <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:pr-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">Let customers choose how they want to pay</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                             <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-[#B2F35F]" />
                                <span className="text-lg text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90  px-6 py-5 text-base font-bold">
                        <Link href="#">Get started</Link>
                    </Button>
                </div>
                 <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-sm">
                        <div className="absolute inset-0 bg-gradient-to-t from-lime-300/30 to-transparent rounded-2xl -z-10 blur-2xl"></div>
                        <Image src="https://placehold.co/380x770.png" data-ai-hint="payment app mobile" alt="Payment app screenshot" width={380} height={770} className="rounded-2xl shadow-xl relative" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
