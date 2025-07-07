import { Hero } from "@/components/landing/Hero";
import { Partners } from "@/components/landing/Partners";
import { Features } from "@/components/landing/Features";
import { InternationalTransfers } from "@/components/landing/InternationalTransfers";
import { AppShowcase } from "@/components/landing/AppShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { Security } from "@/components/landing/Security";
import { GettingStarted } from "@/components/landing/GettingStarted";
import { CTA } from "@/components/landing/CTA";
import { FAQs } from "@/components/landing/FAQs";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Partners />
      <Features />
      <InternationalTransfers />
      <AppShowcase />
      <Testimonials />
      <Security />
      <GettingStarted />
      <FAQs />
      <CTA />
    </>
  );
}
