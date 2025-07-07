import { Hero } from "@/components/business/Hero";
import { Partners } from "@/components/business/Partners";
import { PaymentChoice } from "@/components/business/PaymentChoice";
import { AcceptLocalPayments } from "@/components/business/AcceptLocalPayments";
import { BoostSales } from "@/components/business/BoostSales";
import { EmpowerTeam } from "@/components/business/EmpowerTeam";
import { GlobalSolutions } from "@/components/business/GlobalSolutions";
import { Testimonials } from "@/components/business/Testimonials";
import { SaveMoney } from "@/components/business/SaveMoney";
import { CountryCoverage } from "@/components/business/CountryCoverage";
import { FAQ } from "@/components/business/FAQ";
import { FinalCTA } from "@/components/business/FinalCTA";

export default function BusinessPage() {
  return (
    <>
      <Hero />
      <Partners />
      <PaymentChoice />
      <AcceptLocalPayments />
      <BoostSales />
      <EmpowerTeam />
      <GlobalSolutions />
      <Testimonials />
      <SaveMoney />
      <CountryCoverage />
      <FAQ />
      <FinalCTA />
    </>
  );
}
