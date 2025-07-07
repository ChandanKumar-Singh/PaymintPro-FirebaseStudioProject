import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const features = [
  "No subscription, monthly or hidden fees.",
  "Get paid in 9+ currencies.",
  "Transfer your own money."
];

export function MultiCurrency() {
  return (
    <section className="py-20 sm:py-28 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <p className="font-bold text-[#052011]/60 mb-2">Multi-currency Account</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">
              One account for 35+ currencies around the world
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Open a free multi-currency account to receive money in the currency you choose, with no cost and no hidden fees.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B2F35F] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#052011]" />
                  </div>
                  <span className="text-lg text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full px-6 py-5 text-base font-bold">
              <Link href="/register">
                Create account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/500x400.png"
              data-ai-hint="currency exchange ui"
              alt="Multi-currency account interface"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
