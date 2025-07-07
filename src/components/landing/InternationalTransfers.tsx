import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Globe, Zap, Banknote } from "lucide-react";
import { Button } from '../ui/button';

const benefits = [
  {
    icon: Zap,
    title: 'Fast reliable transfers',
    description: 'Get your money where it needs to go, quickly and reliably.'
  },
  {
    icon: Globe,
    title: 'Global coverage',
    description: 'Send money to over 170 countries and in 30+ currencies.'
  },
  {
    icon: Banknote,
    title: 'Bank-beating rates',
    description: 'We use the real exchange rate, so you save on every transfer.'
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Trusted',
    description: 'Your money is protected with bank-level security.'
  }
];

export function InternationalTransfers() {
  return (
    <section className="bg-[#F9FAFB] py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <p className="font-bold text-[#052011]/60 mb-2">Why Paymint</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] tracking-tight">
            We are the best international money transfer provider
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fast, reliable and secure international money transfers across the world.
          </p>
           <Button asChild size="lg" className="bg-[#B2F35F] text-[#052011] hover:bg-[#B2F35F]/90 rounded-full mt-6 px-6 py-5 text-base font-bold">
              <Link href="/register">
                Create account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-start gap-4">
              <div className="bg-[#E7FAD1] p-3 rounded-full">
                  <benefit.icon className="w-8 h-8 text-[#052011]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#052011] mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
