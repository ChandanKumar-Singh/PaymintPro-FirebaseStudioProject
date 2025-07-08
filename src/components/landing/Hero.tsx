
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
              Cross-border payment made easy.
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
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
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
            <Image 
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Paymint Dashboard and Mobile App"
                data-ai-hint="dashboard mobile app"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
