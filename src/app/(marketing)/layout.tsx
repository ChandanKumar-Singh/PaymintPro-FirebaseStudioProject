import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white mx-auto w-full">
      <LandingHeader />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}
