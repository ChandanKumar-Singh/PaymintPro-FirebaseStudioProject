
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export function MobileApp() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:pr-12">
                         <p className="font-bold text-[#052011]/60 mb-2">MOBILE APP</p>
                         <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">One app for all your overseas transfers</h2>
                         <p className="text-lg text-gray-600 mb-8">
                            With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.
                         </p>
                         <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-lime-500" /> Send money and make payments</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-lime-500" /> Get real-time notifications</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-lime-500" /> Transfer money overseas</li>
                         </ul>
                         <div className="flex items-center gap-4">
                            <Link href="#"><Image src="https://placehold.co/150x50.png" data-ai-hint="app store badge" alt="App Store" width={150} height={50} /></Link>
                            <Link href="#"><Image src="https://placehold.co/150x50.png" data-ai-hint="google play badge" alt="Google Play" width={150} height={50} /></Link>
                         </div>
                    </div>
                    <div>
                        <Image src="https://placehold.co/500x500.png" data-ai-hint="mobile app interface" alt="Paymint Mobile App" width={500} height={500} />
                    </div>
                </div>
            </div>
        </section>
    );
}
