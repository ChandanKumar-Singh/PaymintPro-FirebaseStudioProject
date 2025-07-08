
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export function BestProvider() {
  const features = [
    { icon: CheckCircle, title: 'Fast & Secure', description: 'With our innovative fintech solutions, you can seamlessly handle all your financial needs.' },
    { icon: CheckCircle, title: 'Low transfer fees', description: 'From international transfers to everyday payments, Paymint is your trusted partner.' },
    { icon: CheckCircle, title: 'No subscription', description: 'We believe in transparent pricing and fair rates for everyone.' },
    { icon: CheckCircle, title: '24/7 Support', description: 'Our dedicated support team is here to help you around the clock.' },
  ];
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="container mx-auto px-4">
        <p className="text-center font-bold text-[#052011]/60 mb-2">Why Paymint</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] text-center mb-6 tracking-tight">
          We are the best international money transfer provider
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Millions of happy customers and a 4.5 star rating on Trustpilot.
        </p>
        <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 font-bold mx-auto block w-fit">
            <Link href="/pricing">Check prices</Link>
        </Button>
        <div className="mt-16 grid sm:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-[#E7FAD1] p-3 rounded-full">
                <feature.icon className="w-6 h-6 text-[#052011]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#052011] mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
