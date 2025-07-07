import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const features = [
    "No hidden fees, no bad exchange rates",
    "Pay with your debit or credit card",
    "Bank-level data security on the app",
    "Fastest transfer services in the world"
];

export function OverseasTransfers() {
  return (
    <section className="py-20 sm:py-28 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <p className="font-bold text-[#052011]/60 mb-2">Paymint App</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] mb-6 tracking-tight">
              One app for all your overseas transfers
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the money you’re sending to where it’s going, without taking a big bite out of the amount. Fast, reliable and secure international money transfers across the world.
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
            <div className="flex gap-4">
                <Link href="#"><Image src="https://placehold.co/135x40.png" data-ai-hint="app store button" alt="App Store" width={135} height={40}/></Link>
                <Link href="#"><Image src="https://placehold.co/135x40.png" data-ai-hint="google play button" alt="Google Play" width={135} height={40}/></Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/400x700.png"
              data-ai-hint="mobile app phone"
              alt="Paymint App Screenshot"
              width={350}
              height={700}
              className="rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
