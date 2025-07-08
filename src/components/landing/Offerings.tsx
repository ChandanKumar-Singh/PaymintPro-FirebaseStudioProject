
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Offerings() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">We offer fast and secure money transfers</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
                    <div className="bg-[#0A2D1A] text-white p-8 rounded-2xl text-left">
                        <h3 className="text-3xl font-bold mb-4">For Individuals</h3>
                        <p className="text-white/80 mb-6">With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments.</p>
                        
                        <Button asChild variant="secondary" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 font-bold">
                            <Link href="/features">Learn more</Link>
                        </Button>
                         <Image src="https://placehold.co/400x300.png" data-ai-hint="mobile money transfer" alt="Individual use" width={400} height={300} className="ml-auto mt-8" />
                    </div>
                    <div className="bg-[#0A2D1A] text-white p-8 rounded-2xl text-left">
                        <h3 className="text-3xl font-bold mb-4">For Business</h3>
                        <p className="text-white/80 mb-6">With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments.</p>
                        <Button asChild variant="secondary" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 font-bold">
                           <Link href="/business">Learn more</Link>
                        </Button>
                         <Image src="https://placehold.co/400x300.png" data-ai-hint="business payment solution" alt="Business use" width={400} height={300} className="ml-auto mt-8" />
                    </div>
                </div>
            </div>
        </section>
    );
}
