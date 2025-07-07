'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const features = [
    "No subscription, monthly or hidden fees.",
    "Get paid in 9+ currencies.",
    "Transfer your own money."
];

const currencies = [
    { flag: 'https://placehold.co/24x24.png', dataAiHint: 'usa flag', code: 'USA', rate: '1.00000', amount: '$1000.00' },
    { flag: 'https://placehold.co/24x24.png', dataAiHint: 'eu flag', code: 'EUR', rate: '0.92000', amount: '€920.00' },
    { flag: 'https://placehold.co/24x24.png', dataAiHint: 'uk flag', code: 'GBP', rate: '0.78000', amount: '£780.00' },
    { flag: 'https://placehold.co/24x24.png', dataAiHint: 'australia flag', code: 'AUD', rate: '1.50000', amount: 'A$1500.00' },
];

export function MultiCurrency() {
  return (
    <section className="py-20 sm:py-28 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <p className="font-bold text-[#052011]/60 mb-2">Multi-currency Account</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">
              One account for 35+ currencies around the world
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Open a free multi-currency account to receive money in the currency you choose, with no cost and no hidden fees.
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
            <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full px-6 py-5 text-base font-bold">
              <Link href="/register">Create account</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 border w-full max-w-sm">
                <h3 className="font-bold text-lg mb-4 text-[#052011]">Currencies</h3>
                <div className="space-y-4">
                    {currencies.map((currency) => (
                        <div key={currency.code} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Image src={currency.flag} data-ai-hint={currency.dataAiHint} alt={currency.code} width={32} height={32} className="rounded-full" />
                                <div>
                                    <p className="font-bold text-[#052011]">{currency.code}</p>
                                    <p className="text-sm text-gray-500">{currency.rate}</p>
                                </div>
                            </div>
                            <p className="font-medium text-[#052011]">{currency.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
