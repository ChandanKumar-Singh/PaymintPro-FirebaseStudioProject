'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Offer() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] text-center mb-12 tracking-tight">
          We offer fast and secure<br/>money transfers
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#0A2D1A] text-white p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-4">For Personal</h3>
                <p className="text-white/80 mb-6">
                    Send and receive money globally in 30+ currencies with our multi-currency account. Fast, secure, and low-cost transfers.
                </p>
                <Button asChild variant="ghost" className="text-[#B2F35F] hover:text-[#B2F35F] hover:bg-transparent p-0 font-bold">
                    <Link href="#">Request a demo</Link>
                </Button>
                <div className="mt-8">
                    <Image src="https://placehold.co/500x300.png" alt="Personal transfers" data-ai-hint="mobile app finance" width={500} height={300} className="rounded-lg" />
                </div>
            </div>
             <div className="bg-[#0A2D1A] text-white p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-4">For Businesses</h3>
                <p className="text-white/80 mb-6">
                   Receive international payments from clients, pay suppliers, and manage your business's global finances from one account.
                </p>
                <Button asChild variant="ghost" className="text-[#B2F35F] hover:text-[#B2F35F] hover:bg-transparent p-0 font-bold">
                    <Link href="#">Request a demo</Link>
                </Button>
                 <div className="mt-8">
                    <Image src="https://placehold.co/500x300.png" alt="Business transfers" data-ai-hint="world map finance" width={500} height={300} className="rounded-lg" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
