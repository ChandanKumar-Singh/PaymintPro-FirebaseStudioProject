import Image from "next/image";
import Link from 'next/link';
import { Button } from "../ui/button";

export function Security() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:order-2">
            <Image
              src="https://placehold.co/500x500.png"
              data-ai-hint="security shield"
              alt="Bank level security"
              width={450}
              height={450}
              className="rounded-lg"
            />
          </div>
          <div className="lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Bank-level security
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Paymint is a licensed money transfer service, which means we're regulated by financial authorities around the world. We use the same encryption and security standards as major banks. Your money is always safe with us.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="#">Learn more about security</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
