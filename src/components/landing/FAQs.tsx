import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';
import { Mail } from 'lucide-react';

const faqItems = [
  {
    question: "How to send money with Paymint?",
    answer: "You can send money easily by linking your bank account or card. Just enter the recipient's details, the amount, and confirm the transaction. It's fast, secure, and simple.",
  },
  {
    question: "Can I use Paymint to receive money?",
    answer: "Yes, you can receive money from over 30 countries. Simply share your Paymint account details with the sender, and the funds will be credited to your account.",
  },
  {
    question: "Is my money safe with Paymint?",
    answer: "Absolutely. We use state-of-the-art security measures, including encryption and fraud detection systems, to ensure your money and personal information are always protected.",
  },
  {
    question: "How much does it cost to use Paymint?",
    answer: "We believe in transparent pricing. Our fees are low and shown upfront before you make a transaction. For detailed pricing, please visit our pricing page.",
  },
];

export function FAQs() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Common Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center bg-background border border-border rounded-lg p-8 max-w-3xl mx-auto">
          <Mail className="mx-auto h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold">Still have questions?</h3>
          <p className="text-muted-foreground mt-2 mb-4">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
