import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-[#052011] rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center">
          <div className="relative z-10">
              <p className="font-bold text-[#B2F35F] mb-2">Promotion</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Get a Zero-fee on your first transfer
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.
              </p>
              <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full px-8 py-6 text-base font-bold">
                <Link href="/register">
                  Claim your free transfer
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
