'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="bg-[#052011] text-white pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-[#B2F35F]/10 text-[#B2F35F] font-bold py-1 px-3 rounded-full inline-block mb-4 text-sm">
          PAYMENTS
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
          Global business payments.
        </h1>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Pay for individuals and businesses to securely send and receive money globally, with the best bank rate.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 px-6 py-5 text-base font-bold"
          >
            <Link href="/register">Create account</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-white/40 hover:text-white hover:bg-white/10 px-6 py-5 text-base font-bold"
          >
            <Link href="/contact">Contact sales</Link>
          </Button>
        </div>
        <div className="mt-16 flex justify-center">
          <Image
            src="https://placehold.co/1088x544.png"
            data-ai-hint="payment terminal transaction"
            alt="Paymint payment terminal"
            width={1088}
            height={544}
            className="rounded-xl shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
