import { Hero } from "@/components/landing/Hero";
import { Partners } from "@/components/landing/Partners";
import { Features } from "@/components/landing/Features";
import { InternationalTransfers } from "@/components/landing/InternationalTransfers";
import { MultiCurrency } from "@/components/landing/MultiCurrency";
import { CardExperience } from "@/components/landing/CardExperience";
import { OverseasTransfers } from "@/components/landing/OverseasTransfers";
import { Testimonials } from "@/components/landing/Testimonials";
import { GettingStarted } from "@/components/landing/GettingStarted";
import { CTA } from "@/components/landing/CTA";
import { LandingHeader } from "@/components/landing/Header";
import { LandingFooter } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main>
        <Hero />
        <Partners />
        <Features />
        <InternationalTransfers />
        <MultiCurrency />
        <CardExperience />
        <OverseasTransfers />
        <Testimonials />
        <GettingStarted />
        <CTA />
      </main>
      <LandingFooter />
    </div>
  );
}
