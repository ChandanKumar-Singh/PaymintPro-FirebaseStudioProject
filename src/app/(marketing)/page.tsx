
'use client';

import { BestWays } from "@/components/landing/BestWays";
import { CountryCoverage } from "@/components/landing/CountryCoverage";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingComparison } from "@/components/landing/PricingComparison";
import { Security } from "@/components/landing/Security";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <PricingComparison />
      <BestWays />
      <Security />
      <CountryCoverage />
      <FAQ />
      <FinalCTA />
    </>
  );
}
