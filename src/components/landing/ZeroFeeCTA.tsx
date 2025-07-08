
'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ZeroFeeCTA() {
    return (
        <section className="bg-white pb-20 sm:pb-28">
            <div className="container mx-auto px-4">
                 <div className="bg-[#052011] text-white rounded-2xl p-12 grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="font-bold text-[#B2F35F] mb-2">Promotion</p>
                        <h3 className="text-4xl font-bold mb-4">Get a Zero-fee on your first transfer</h3>
                        <p className="text-white/80">Take advantage of a great introductory rate on your first international money transfer. Supply and fees are applied.</p>
                        <Button asChild className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full mt-6 px-6 py-5 text-base font-bold">
                        <Link href="/register">
                            Register Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Image src="https://placehold.co/300x300.png" data-ai-hint="zero percent 3d" alt="0% Fee" width={250} height={250}/>
                    </div>
                </div>
            </div>
        </section>
    );
}
