import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Features() {
  return (
    <section className="bg-[#052011] text-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            We offer fast and secure money transfers
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          <div className="bg-[#0A2D1A] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-4">For Personal</h3>
              <p className="text-white/80 mb-6">
                Send and receive money globally in 30+ currencies with our multi-currency account. Fast, secure, and low-cost transfers.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild variant="ghost" className="text-[#B2F35F] hover:text-[#B2F35F] hover:bg-transparent p-0 font-bold">
                <Link href="#">
                  Request a demo <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
             <div className="mt-8">
                <Image src="https://placehold.co/500x300.png" alt="Personal transfers" data-ai-hint="mobile app finance" width={500} height={300} className="rounded-lg"/>
            </div>
          </div>
          
          <div className="bg-[#0A2D1A] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-4">For Businesses</h3>
              <p className="text-white/80 mb-6">
                Receive international payments from clients, pay suppliers, and manage your business's global finances from one account.
              </p>
            </div>
            <div className="mt-8">
               <Button asChild variant="ghost" className="text-[#B2F35F] hover:text-[#B2F35F] hover:bg-transparent p-0 font-bold">
                <Link href="#">
                  Request a demo <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8">
                 <Image src="https://placehold.co/500x300.png" alt="Business transfers" data-ai-hint="world map finance" width={500} height={300} className="rounded-lg"/>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
