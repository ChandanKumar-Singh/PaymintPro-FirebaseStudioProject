import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Sign up for a free account",
    description: "It takes just a few minutes to create your Paymint account. We only ask for the essential information."
  },
  {
    number: "02",
    title: "Link your bank account or card",
    description: "Securely connect your bank or card to your Paymint account. Your information is encrypted and protected."
  },
  {
    number: "03",
    title: "Start sending money with us",
    description: "You're all set! Send money to friends, family, or businesses across the globe with just a few clicks."
  }
];

export function GettingStarted() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            It’s simple to start using Paymint
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="mb-4 text-5xl font-bold text-primary">{step.number}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
