import { ShieldCheck, Zap, Globe } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: ShieldCheck,
    title: "Bank-level security",
    description: "Your money is safe with us. We use the same security measures as major banks to protect your funds and data."
  },
  {
    icon: Zap,
    title: "Faster transfers",
    description: "Send money to your loved ones in minutes. Our network is optimized for speed, so your funds arrive quickly."
  },
  {
    icon: Globe,
    title: "Global coverage",
    description: "Transfer money to over 150 countries. We're constantly expanding our network to serve you better."
  }
];

export function Features() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image 
              src="https://placehold.co/500x500.png"
              data-ai-hint="abstract secure"
              alt="Secure transfers"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              We offer fast and secure money transfers
            </h2>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
