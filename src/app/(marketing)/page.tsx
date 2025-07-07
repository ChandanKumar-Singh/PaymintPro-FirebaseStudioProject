import { Hero } from "@/components/landing/Hero";
import { PricingComparison } from "@/components/landing/PricingComparison";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BestWays } from "@/components/landing/BestWays";
import { Security } from "@/components/landing/Security";
import { CountryCoverage } from "@/components/landing/CountryCoverage";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PricingComparison />
      <Features />
      <HowItWorks />
      <BestWays />
      <Security />
      <CountryCoverage />
      <FAQ />
      <FinalCTA />
    </>
  );
}
