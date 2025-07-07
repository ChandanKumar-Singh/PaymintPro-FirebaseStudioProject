'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    image: 'https://placehold.co/300x200.png',
    dataAiHint: 'mobile money transfer',
    title: 'Choose the amount to send and the recipient',
  },
  {
    image: 'https://placehold.co/300x200.png',
    dataAiHint: 'online payment secure',
    title: 'Select a payment method and send your money',
  },
  {
    image: 'https://placehold.co/300x200.png',
    dataAiHint: 'transaction success',
    title: 'Remit is paid out to your recipient',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#F9FAFB] py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <p className="text-center font-bold text-[#052011]/60 mb-2">How It Works</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] text-center mb-12 tracking-tight">
          Send money abroad in 3 simple steps
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 text-center">
              <Image src={step.image} data-ai-hint={step.dataAiHint} alt={step.title} width={300} height={200} className="mx-auto mb-6 rounded-lg"/>
              <h3 className="text-xl font-bold text-[#052011]">{step.title}</h3>
            </div>
          ))}
        </div>
        <div className="mt-20 bg-[#052011] text-white rounded-2xl p-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="font-bold text-[#B2F35F] mb-2">Promotion</p>
            <h3 className="text-4xl font-bold mb-4">Get a Zero-fee on your first transfer</h3>
            <p className="text-white/80">With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.</p>
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
