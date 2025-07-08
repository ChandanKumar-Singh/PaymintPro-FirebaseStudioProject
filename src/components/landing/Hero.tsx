
'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CirclePlay } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-[#052011] text-white pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-white/10 text-white font-bold py-1 px-3 rounded-full inline-block mb-4 text-sm">
          Pay without borders
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight max-w-3xl mx-auto">
          Cross-border payment made easy.
        </h1>
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
          With our innovative fintech solutions, you can seamlessly handle all
          your financial needs. From international transfers to everyday
          payments, Paymint is your trusted partner.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 px-6 py-5 text-base font-bold"
          >
            <Link href="/register">Get Started</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 px-6 py-5 text-base font-bold"
          >
            <Link href="/contact">
              <CirclePlay className="mr-2 w-5 h-5" />
              Contact sales
            </Link>
          </Button>
        </div>
        <div className="mt-16 flex justify-center">
            <Image src="https://placehold.co/1088x544.png" data-ai-hint="payment app dashboard" alt="Paymint App Dashboard" width={1088} height={544} className="rounded-xl shadow-2xl" priority />
        </div>
      </div>
    </section>
  );
}
