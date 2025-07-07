"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-[#0C2B1B] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-block bg-lime-500/10 text-[#B5F567] font-bold py-1 px-3 rounded-full text-sm mb-4">
          Paymint card
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
          The most modern multi-currency card.
        </h1>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Get physical & virtual card. Virtual card live on your account as digital debit card. Simply order online now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#B5F567] text-[#0C2B1B] hover:bg-[#B5F567]/90 rounded-md px-6 py-5 text-base font-bold"
          >
            <Link href="#">
              Order your card <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-white/40 hover:text-white hover:bg-white/10 rounded-md px-6 py-5 text-base font-bold"
          >
            <Link href="#">Contact sales</Link>
          </Button>
        </div>
         <p className="text-sm text-white/60 mt-8">
            Talk to an account specialist to get started, <a href="tel:1-123-456-7890" className="font-medium hover:underline">1-123-456-7890</a>
        </p>
      </div>
      
      {/* Floating Cards */}
      <div className="absolute inset-0 z-0">
         <Image
            src="https://placehold.co/400x250.png"
            data-ai-hint="credit card floating"
            alt="Paymint Card"
            width={400}
            height={250}
            className="absolute top-10 left-10 opacity-50 lg:opacity-100 transform -rotate-12"
        />
        <Image
            src="https://placehold.co/400x250.png"
            data-ai-hint="credit card dark"
            alt="Paymint Card Dark"
            width={400}
            height={250}
            className="absolute top-1/2 left-20 transform -translate-y-1/2 rotate-6 hidden lg:block"
        />
        <Image
            src="https://placehold.co/400x250.png"
            data-ai-hint="credit card floating"
            alt="Paymint Card"
            width={400}
            height={250}
            className="absolute top-20 right-10 opacity-50 lg:opacity-100 transform rotate-12"
        />
        <Image
            src="https://placehold.co/400x250.png"
            data-ai-hint="credit card floating"
            alt="Paymint Card Green"
            width={400}
            height={250}
            className="absolute bottom-10 right-20 transform -rotate-6 hidden lg:block"
        />
      </div>
    </section>
  );
}
