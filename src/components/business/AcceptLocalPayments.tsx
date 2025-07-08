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

export function AcceptLocalPayments() {
  return (
    <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2 lg:pl-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">Accept payments like a local</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Increase customer conversion and save on fees with local acquiring in all major markets.
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
                        <Link href="#">Discover</Link>
                    </Button>
                </div>
                 <div className="lg:order-1 flex justify-center items-center">
                    <div className="bg-[#052011] p-8 rounded-2xl">
                      <Image src="https://placehold.co/400x300.png" data-ai-hint="currency exchange ui" alt="Local payments interface" width={400} height={300} className="rounded-xl shadow-xl" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
