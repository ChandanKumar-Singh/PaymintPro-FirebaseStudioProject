import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Cross-border payment made easy.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              The secure and easy way to exchange and transfer money. Send money to friends, family, and businesses abroad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/register">
                  Open a free account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#">
                  <PlayCircle className="mr-2 w-5 h-5" />
                  See how it works
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x450.png"
              data-ai-hint="dashboard fintech"
              alt="Paymint Dashboard"
              width={600}
              height={450}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
