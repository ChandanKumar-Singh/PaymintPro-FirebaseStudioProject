import Image from 'next/image';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Freelance Designer",
    quote: "Paymint has revolutionized how I handle international payments. It's fast, secure, and the fees are incredibly low. Highly recommended!",
    avatar: "https://placehold.co/64x64.png",
    hint: "man avatar"
  },
  {
    name: "Samantha Lee",
    role: "E-commerce Store Owner",
    quote: "The multi-currency account is a game-changer for my business. I can pay suppliers and receive payments from customers globally without any hassle.",
    avatar: "https://placehold.co/64x64.png",
    hint: "woman avatar"
  },
  {
    name: "David Chen",
    role: "Digital Nomad",
    quote: "As someone who travels constantly, Paymint's debit card is my best friend. I can spend in any currency without worrying about exorbitant fees. It's a must-have!",
    avatar: "https://placehold.co/64x64.png",
    hint: "man avatar"
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Customer success is our success
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background p-8 rounded-lg shadow-lg">
              <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  data-ai-hint={testimonial.hint}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
