
'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CirclePlay, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Label } from '../ui/label';

export function Hero() {
  const [fromCurrency] = useState({ code: 'USD', name: 'USA', flag: 'https://placehold.co/24x24.png', dataAiHint: 'usa flag' });
  const [toCurrency] = useState({ code: 'NGN', name: 'Nigeria', flag: 'https://placehold.co/24x24.png', dataAiHint: 'nigeria flag' });

  return (
    <section className="bg-[#052011] text-white pt-40 pb-20">
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
            <Card className="bg-white/10 text-white p-6 rounded-2xl w-full max-w-md backdrop-blur-sm border-white/20">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <Label htmlFor="send-amount" className="text-white/80 text-xs">You send</Label>
                            <Input id="send-amount" defaultValue="1000" className="bg-white/10 border-white/20 h-12 text-lg" />
                        </div>
                        <div className="space-y-2">
                             <Label className="text-white/80 text-xs">&nbsp;</Label>
                             <Button variant="outline" className="w-full justify-between bg-white/10 border-white/20 h-12 text-base hover:bg-white/20">
                                <div className="flex items-center gap-2">
                                    <Image src={fromCurrency.flag} data-ai-hint={fromCurrency.dataAiHint} alt={fromCurrency.name} width={24} height={24} />
                                    <span>{fromCurrency.code}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </div>
                    </div>
                    <ul className="text-xs space-y-2 text-white/70">
                        <li className="flex justify-between"><span>- 4.28 USD</span><span>Our fee</span></li>
                        <li className="flex justify-between"><span>= 995.72 USD</span><span>Amount we'll convert</span></li>
                         <li className="flex justify-between"><span>x 1,489.92</span><span className="font-bold text-[#B2F35F]">Guaranteed rate (24h)</span></li>
                    </ul>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="receive-amount" className="text-white/80 text-xs">They get</Label>
                            <Input id="receive-amount" defaultValue="1,483,434.62" className="bg-white/10 border-white/20 h-12 text-lg font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white/80 text-xs">&nbsp;</Label>
                             <Button variant="outline" className="w-full justify-between bg-white/10 border-white/20 h-12 text-base hover:bg-white/20">
                                <div className="flex items-center gap-2">
                                    <Image src={toCurrency.flag} data-ai-hint={toCurrency.dataAiHint} alt={toCurrency.name} width={24} height={24} />
                                    <span>{toCurrency.code}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </div>
                    </div>
                </div>
                 <div className="mt-6">
                    <Button className="w-full bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 h-12 text-base font-bold">
                        Compare price
                    </Button>
                </div>
                 <p className="text-center text-xs text-white/50 mt-4">By sending, you agree to the <Link href="/terms" className="underline">Terms of Use</Link>.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
