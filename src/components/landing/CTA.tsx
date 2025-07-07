import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="bg-muted rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Set up and Send money on your transfers with Paymint
              </h2>
              <p className="text-muted-foreground mb-8">
                With our innovative fintech solutions, you can seamlessly handle all your financial needs. From international transfers to everyday payments, Paymint is your trusted partner.
              </p>
              <Button asChild size="lg">
                <Link href="/register">
                  Open a free account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="hidden md:flex justify-center">
              <Image 
                src="https://placehold.co/400x300.png"
                data-ai-hint="credit cards abstract"
                alt="Paymint Cards"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
