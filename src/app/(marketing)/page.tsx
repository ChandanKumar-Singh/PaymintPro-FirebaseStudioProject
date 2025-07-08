
import { Hero } from "@/components/landing/Hero";
import { TrustSignals } from "@/components/landing/TrustSignals";
import { Offerings } from "@/components/landing/Offerings";
import { BestProvider } from "@/components/landing/BestProvider";
import { MultiCurrency } from "@/components/landing/MultiCurrency";
import { CardExperience } from "@/components/landing/CardExperience";
import { MobileApp } from "@/components/landing/MobileApp";
import { Testimonials } from "@/components/landing/Testimonials";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ZeroFeeCTA } from "@/components/landing/ZeroFeeCTA";
import { CountryCoverage } from "@/components/landing/CountryCoverage";
import { PricingComparison } from "@/components/landing/PricingComparison";
import { Security } from "@/components/landing/Security";
import { BestWays } from "@/components/landing/BestWays";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <Offerings />
      <BestProvider />
      <MultiCurrency />
      <CardExperience />
      <MobileApp />
      <Testimonials />
      <HowItWorks />
      <ZeroFeeCTA />
      <CountryCoverage />
      <PricingComparison />
      <Security />
      <BestWays />
      <FAQ />
      <FinalCTA />
    </>
  );
}
