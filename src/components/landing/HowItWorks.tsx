
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function HowItWorks() {
    return (
        <section className="bg-white pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div>
                        <Image src="https://placehold.co/500x400.png" data-ai-hint="payment form ui" alt="Payment form" width={500} height={400} className="rounded-xl shadow-lg" />
                    </div>
                    <div className="lg:pl-12">
                        <p className="font-bold text-[#052011]/60 mb-2">How it works</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">It's simple to start using Paymint</h2>
                        <ol className="space-y-6">
                            <li className="flex items-start gap-4">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#B2F35F] text-[#052011] font-bold text-lg flex-shrink-0">1</span>
                                <div>
                                    <h4 className="font-bold text-xl">Create an account</h4>
                                    <p className="text-gray-600">Register for free online or in the app. All you need is an email address.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#B2F35F] text-[#052011] font-bold text-lg flex-shrink-0">2</span>
                                <div>
                                    <h4 className="font-bold text-xl">Set up a transfer</h4>
                                    <p className="text-gray-600">Tell us the amount, where you're sending to, and the recipient's details.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#B2F35F] text-[#052011] font-bold text-lg flex-shrink-0">3</span>
                                <div>
                                    <h4 className="font-bold text-xl">Pay for transfer</h4>
                                    <p className="text-gray-600">Send your money with a bank transfer, or a debit or credit card.</p>
                                </div>
                            </li>
                        </ol>
                         <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-md font-bold mt-8">
                            <Link href="/features">Learn more</Link>
                         </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
