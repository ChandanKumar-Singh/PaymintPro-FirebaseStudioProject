import { Hero } from "@/components/cards/Hero";
import { Spend } from "@/components/cards/Spend";
import { CashOut } from "@/components/cards/CashOut";
import { Control } from "@/components/cards/Control";
import { BusinessCTA } from "@/components/cards/BusinessCTA";

export default function CardsPage() {
  return (
    <>
      <Hero />
      <Spend />
      <CashOut />
      <Control />
      <BusinessCTA />
    </>
  );
}
