'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CirclePlay } from 'lucide-react';

export function Hero() {
  const partners = [
    { name: 'Wise', logo: 'https://placehold.co/100x30.png', dataAiHint: 'wise logo' },
    { name: 'Bloomberg', logo: 'https://placehold.co/100x30.png', dataAiHint: 'bloomberg logo' },
    { name: 'TC', logo: 'https://placehold.co/100x30.png', dataAiHint: 'techcrunch logo' },
    { name: 'Forbes', logo: 'https://placehold.co/100x30.png', dataAiHint: 'forbes logo' },
    { name: 'TechRadar', logo: 'https://placehold.co/100x30.png', dataAiHint: 'techradar logo' },
  ];

  return (
    <section className="bg-[#052011] text-white pt-32 pb-0">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#B2F35F] mb-4">
          For Individuals and Businesses
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Cross-border payment <br /> made easy.
        </h1>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Pay for individuals and businesses to securely send and receive money
          globally, with the best bank rate.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <Link href="#">
              <CirclePlay className="mr-2 w-5 h-5" />
              Contact sales
            </Link>
          </Button>
        </div>
        <div className="mt-16 flex justify-center">
          <Image
            src="https://placehold.co/1000x500.png"
            data-ai-hint="dashboard fintech screen"
            alt="Paymint Dashboard"
            width={1200}
            height={600}
            className="rounded-t-xl shadow-2xl"
            priority
          />
        </div>
      </div>
      <div className="bg-[#F9FAFB] py-16 mt-[-1px]">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg font-medium text-gray-600 mb-8">
            Join 100+ million users who trust Paymint for their financial needs
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {partners.map((partner) => (
              <Image
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                data-ai-hint={partner.dataAiHint}
                width={130}
                height={32}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
