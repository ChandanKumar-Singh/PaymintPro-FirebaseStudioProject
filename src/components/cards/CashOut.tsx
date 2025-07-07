"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Globe } from "lucide-react";

export function CashOut() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <Image
              src="https://placehold.co/600x600.png"
              data-ai-hint="man using atm"
              alt="Man withdrawing cash from an ATM"
              width={600}
              height={600}
              className="rounded-2xl"
            />
          </div>
          <div className="lg:pl-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0C2B1B] mb-6 tracking-tight">
              Take out up to $200 in cash with no hidden fees
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You'll quickly find that we make a great travel companion on all your adventures. Use your card to withdraw money anywhere in the world, with no hidden fees or bad exchange rates for spending abroad. Spend and enjoy your money internationally with total peace of mind.
            </p>
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-lime-100 p-2 rounded-full mt-1">
                  <CheckCircle className="w-5 h-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0C2B1B]">No minimum balance</h3>
                  <p className="text-gray-600">You can use Paymint card everywhere without minimum balance.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-lime-100 p-2 rounded-full mt-1">
                  <Globe className="w-5 h-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0C2B1B]">Globally Accepted</h3>
                  <p className="text-gray-600">Paymint cards take the hassle-free of using ATMs abroad.</p>
                </div>
              </li>
            </ul>
            <Button
              asChild
              size="lg"
              className="bg-[#B5F567] text-[#0C2B1B] hover:bg-[#B5F567]/90 rounded-md px-8 py-6 text-base font-bold"
            >
              <Link href="#">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
