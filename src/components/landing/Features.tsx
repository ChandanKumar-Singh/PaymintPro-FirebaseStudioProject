'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function Features() {
  return (
    <>
      <section className="bg-[#052011] text-white py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-bold text-white/60 mb-2">FULL TRANSPARENCY</p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">What you see is what you pay</h2>
              <p className="text-lg text-white/80 mb-8">
                With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#B2F35F]" />
                  <span className="text-lg">No subscription, monthly, or hidden fees.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#B2F35F]" />
                  <span className="text-lg">Get paid in 9+ currencies.</span>
                </li>
              </ul>
              <Button asChild variant="ghost" className="text-[#B2F35F] hover:text-[#B2F35F] p-0 text-lg font-bold">
                <Link href="#">
                  Learn more <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <Image src="https://placehold.co/450x500.png" data-ai-hint="mobile app payments" alt="Paymint App Screenshot" width={450} height={500} className="rounded-xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#052011] text-white py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:order-2">
              <Image src="https://placehold.co/450x500.png" data-ai-hint="mobile notifications" alt="Paymint Notifications" width={450} height={500} className="rounded-xl shadow-2xl" />
            </div>
            <div className="lg:order-1">
              <p className="font-bold text-white/60 mb-2">PAYMENT TRACKING</p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">Get real-time updates on any transfer you send</h2>
              <p className="text-lg text-white/80 mb-8">
                With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#B2F35F]" />
                  <span className="text-lg">No subscription, monthly or hidden fees.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#B2F35F]" />
                  <span className="text-lg">Get paid in 9+ currencies.</span>
                </li>
              </ul>
              <Button asChild className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full px-8 py-6 text-base font-bold">
                <Link href="/register">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
