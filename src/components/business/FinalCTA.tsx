'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="bg-[#052011] text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="font-bold text-[#B2F35F] mb-2">Simple process</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Set up and Save money on your transfers with Paymint</h2>
        <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90  mt-6 px-8 py-6 text-base font-bold">
          <Link href="/register">
            Create your account <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
