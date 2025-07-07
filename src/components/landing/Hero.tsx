import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="bg-[#052011] text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#B2F35F] mb-4">For Individuals and Businesses</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Cross-border payment <br/> made easy.
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Pay for individuals and businesses to securely send and receive money globally, with the best bank rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full px-8 py-6 text-base font-bold">
              <Link href="/register">
                Create account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-bold">
              <Link href="#">
                <PlayCircle className="mr-2 w-5 h-5" />
                Contact sales
              </Link>
            </Button>
          </div>
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
    </section>
  );
}
