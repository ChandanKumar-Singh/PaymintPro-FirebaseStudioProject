"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Lock, SlidersHorizontal } from "lucide-react";

export function Control() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
                <div className="bg-[#0C2B1B] p-8 sm:p-12 rounded-2xl">
                <Image
                    src="https://placehold.co/500x380.png"
                    data-ai-hint="card settings mobile app"
                    alt="Card control interface on a mobile app"
                    width={500}
                    height={380}
                    className="rounded-xl shadow-xl"
                />
                </div>
            </div>
          <div className="lg:pr-8 lg:order-1">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0C2B1B] mb-6 tracking-tight">
              Stay in control of your card's
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              It's all in the app at your fingertips. From card freezing, to spending limits, turn them on or off with a tap.
            </p>
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-lime-100 p-2 rounded-full mt-1">
                  <Lock className="w-5 h-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0C2B1B]">Keep your card protected</h3>
                  <p className="text-gray-600">Protect your cards with a PIN / Passcode OR Biometrics E.e. fingerprint or facial recognition AND an SMS one-time passcode.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-lime-100 p-2 rounded-full mt-1">
                  <SlidersHorizontal className="w-5 h-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0C2B1B]">Track Expenses</h3>
                  <p className="text-gray-600">On a budget? Set a daily and monthly limit on your card to avoid overspending.</p>
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
