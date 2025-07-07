import Image from "next/image";
import { Check } from "lucide-react";

const features = [
  "One account for 20+ currencies",
  "Receive money from 30+ countries",
  "The best international money transfer",
  "Fast and secure money transfer",
];

export function AppShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              The ultimate Card Experience with our App
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Open a free account in minutes, right from your phone, and start spending with your new card in stores, online, or on your phone.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/500x700.png"
              data-ai-hint="app mobile screen"
              alt="App Screenshot"
              width={450}
              height={900}
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
