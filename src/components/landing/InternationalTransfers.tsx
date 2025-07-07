import Image from 'next/image';

const benefits = [
  {
    icon: 'https://placehold.co/48x48.png',
    hint: 'wallet icon',
    title: 'One Account for 20+ currencies',
    description: 'Manage your money across the world without the fuss. Hold, receive, and send money in multiple currencies.'
  },
  {
    icon: 'https://placehold.co/48x48.png',
    hint: 'plane icon',
    title: 'Receive money from 30+ countries',
    description: 'Get local bank details for the UK, Eurozone, US, and more. Let people pay you like a local.'
  },
  {
    icon: 'https://placehold.co/48x48.png',
    hint: 'transfer icon',
    title: 'The best international money transfer',
    description: 'We use the real exchange rate and a tiny, transparent fee. That means more money for you.'
  }
];

export function InternationalTransfers() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              We are the best international money transfer provider
            </h2>
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Image 
                    src={benefit.icon}
                    data-ai-hint={benefit.hint}
                    alt={benefit.title}
                    width={48}
                    height={48}
                    className="flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Image 
              src="https://placehold.co/500x500.png"
              data-ai-hint="world map graphic"
              alt="International Transfers"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
