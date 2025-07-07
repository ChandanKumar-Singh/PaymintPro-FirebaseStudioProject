'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const features = [
    "Fast, reliable and secure transfers",
    "No subscription or hidden fees",
    "Available on the App Store and Google Play"
]

export function OneApp() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div className="flex justify-center">
                        <Image src="https://placehold.co/400x500.png" data-ai-hint="mobile app hand" alt="Paymint App" width={400} height={500} className="rounded-xl shadow-lg" />
                    </div>
                    <div className="lg:pl-12">
                        <p className="font-bold text-[#052011]/60 mb-2">Paymint App</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">One app for all your overseas transfers</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Download our app for free to send money online in minutes to over 130 countries. Track your payments and view your transfer history from anywhere.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#B2F35F] flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-[#052011]" />
                                    </div>
                                    <span className="text-lg text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                         <div className="flex items-center gap-4">
                            <Link href="#" aria-label="Download on the App Store">
                                <Image src="https://placehold.co/120x40.png" data-ai-hint="app store button" alt="App Store" width={120} height={40} />
                            </Link>
                             <Link href="#" aria-label="Get it on Google Play">
                                <Image src="https://placehold.co/120x40.png" data-ai-hint="google play button" alt="Google Play" width={120} height={40} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
