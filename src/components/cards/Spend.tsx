"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Lock, Smartphone } from "lucide-react";

export function Spend() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0C2B1B] mb-6 tracking-tight">
              Spend with Apple or Google Pay
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect your card to tap and pay with your phone. No need to wait for your physical card to arrive.
            </p>
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-lime-100 p-2 rounded-full mt-1">
                  <Lock className="w-5 h-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0C2B1B]">Secure, private, simple</h3>
                  <p className="text-gray-600">Your payments are now safer with Touch ID or Face ID biometric recognition.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-lime-100 p-2 rounded-full mt-1">
                  <Smartphone className="w-5 h-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0C2B1B]">Pay without a card</h3>
                  <p className="text-gray-600">Pay quickly without the hassle of using a card -- and completely avoid the contactless limit.</p>
                </div>
              </li>
            </ul>
            <Button
              asChild
              size="lg"
              className="bg-[#B5F567] text-[#0C2B1B] hover:bg-[#B5F567]/90 px-8 py-6 text-base font-bold"
            >
              <Link href="#">Get started</Link>
            </Button>
          </div>
          <div className="lg:pl-12">
            <Image
              src="https://placehold.co/500x550.png"
              data-ai-hint="hand holding phone payment"
              alt="Person making a contactless payment with their phone"
              width={500}
              height={550}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
