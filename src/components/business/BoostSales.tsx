'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const features = [
    "Fast and secure",
    "Low transaction fees",
    "Track your earnings"
];

export function BoostSales() {
  return (
    <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:pr-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">Boost sales rate with Paymint</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Our intelligent payments routing engine, proprietary data network, and extensive direct connections to card schemes all help you get more of your revenue.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                             <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-[#B2F35F]" />
                                <span className="text-lg text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 px-6 py-5 text-base font-bold">
                        <Link href="#">Get started</Link>
                    </Button>
                </div>
                 <div className="flex justify-center items-center">
                    <div className="bg-gray-100 p-8 rounded-2xl">
                      <Image src="https://placehold.co/400x500.png" data-ai-hint="sales dashboard" alt="Sales dashboard on tablet" width={400} height={500} className="rounded-xl shadow-xl" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
