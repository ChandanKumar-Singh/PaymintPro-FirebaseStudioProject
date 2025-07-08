
'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CirclePlay, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

export function Hero() {
  const [fromCurrency] = useState({ code: 'USD', name: 'USA', flag: 'https://placehold.co/24x24.png', dataAiHint: 'usa flag' });
  const [toCurrency] = useState({ code: 'NGN', name: 'Nigeria', flag: 'https://placehold.co/24x24.png', dataAiHint: 'nigeria flag' });

  return (
    <section className="bg-[#052011] text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              The fast and secure way to send money.
            </h1>
            <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto lg:mx-0">
              With our innovative fintech solutions, you can seamlessly handle
              all your financial needs. From international transfers to everyday
              payments, Paymint is your trusted partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full px-8 py-6 text-base font-bold"
              >
                <Link href="/register">
                  Create account <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-bold"
              >
                <Link href="/contact">
                  <CirclePlay className="mr-2 w-5 h-5" />
                  Contact sales
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white text-black p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-[#052011]">Amount</span>
                <button className="flex items-center gap-2 font-medium text-[#052011]">
                  <Image src={fromCurrency.flag} data-ai-hint={fromCurrency.dataAiHint} alt={fromCurrency.name} width={24} height={24} className="rounded-full" />
                  {fromCurrency.code}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <Input
                type="text"
                defaultValue="2,000"
                className="text-4xl font-bold h-auto p-0 border-none focus-visible:ring-0 text-[#052011] bg-transparent"
              />
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-[#052011]">They'll get</span>
                 <button className="flex items-center gap-2 font-medium text-[#052011]">
                  <Image src={toCurrency.flag} data-ai-hint={toCurrency.dataAiHint} alt={toCurrency.name} width={24} height={24} className="rounded-full" />
                  {toCurrency.code}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <p className="text-4xl font-bold text-[#052011]">2,997,298.58</p>
              <div className="text-sm text-gray-500 mt-4 space-y-1">
                <div className="flex justify-between">
                  <span>Fee</span>
                  <span>$1.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate</span>
                  <span className="font-medium text-primary">1 USD = 1,498.45 NGN</span>
                </div>
              </div>
               <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-lg font-bold">
                 Get Started
               </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
