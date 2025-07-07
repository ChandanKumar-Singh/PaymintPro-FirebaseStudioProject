"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, CheckCircle, Globe } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Keep your money safe",
    description: "Our cards are equipped with the latest security features.",
  },
  {
    icon: CheckCircle,
    title: "Optimise company costs and limits",
    description: "Set spending limits and track expenses in real-time.",
  },
  {
    icon: Globe,
    title: "Enjoy worldwide coverage",
    description: "Use your card in over 150 countries with no hidden fees.",
  },
];

export function BusinessCTA() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block bg-lime-100 text-lime-700 font-bold py-1 px-3 rounded-full text-sm mb-4">
          Paymint card for business
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0C2B1B] max-w-3xl mx-auto tracking-tight">
          Multi-currency cards for your global business
        </h2>

        <div className="mt-12 bg-[#0C2B1B] text-white rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                Empower your team with business debit cards
              </h3>
              <p className="text-white/80 mb-8 max-w-md">
                Big or small, your team is covered. Paymint cards take got you covered. Spend securely with physical and virtual debit cards that you control.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#B5F567] text-[#0C2B1B] hover:bg-[#B5F567]/90 rounded-md font-bold"
              >
                <Link href="/business">
                  Learn more <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative h-64 lg:h-auto flex items-center justify-center">
                <Image
                    src="https://placehold.co/350x220.png"
                    data-ai-hint="credit card floating"
                    alt="Green Paymint Card"
                    width={350}
                    height={220}
                    className="relative z-10 rotate-[15deg] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/4"
                />
                 <Image
                    src="https://placehold.co/350x220.png"
                    data-ai-hint="credit card dark"
                    alt="Dark Paymint Card"
                    width={350}
                    height={220}
                    className="absolute z-0 rotate-[-10deg] lg:right-20 lg:top-1/2 lg:-translate-y-1/4"
                />
            </div>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-8 rounded-2xl text-left hover:shadow-xl transition-shadow"
            >
              <feature.icon className="w-8 h-8 text-[#0C2B1B] mb-4" />
              <h4 className="font-bold text-xl text-[#0C2B1B] mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
