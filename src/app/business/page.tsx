import { Hero } from "@/components/business/Hero";
import { Offer } from "@/components/business/Offer";
import { WhyChooseUs } from "@/components/business/WhyChooseUs";
import { MultiCurrency } from "@/components/business/MultiCurrency";
import { CardExperience } from "@/components/business/CardExperience";
import { OneApp } from "@/components/business/OneApp";
import { Testimonials } from "@/components/business/Testimonials";
import { GettingStarted } from "@/components/business/GettingStarted";
import { ZeroFeeCTA } from "@/components/business/ZeroFeeCTA";
import { CountryCoverage } from "@/components/business/CountryCoverage";
import { FAQ } from "@/components/business/FAQ";
import { FinalCTA } from "@/components/business/FinalCTA";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function BusinessPage() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main>
        <Hero />
        <Offer />
        <WhyChooseUs />
        <MultiCurrency />
        <CardExperience />
        <OneApp />
        <Testimonials />
        <GettingStarted />
        <ZeroFeeCTA />
        <CountryCoverage />
        <FAQ />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
