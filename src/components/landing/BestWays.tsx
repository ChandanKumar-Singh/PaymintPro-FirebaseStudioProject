
'use client';
import { Banknote, CreditCard, Landmark, Smartphone } from 'lucide-react';

const ways = [
  {
    icon: Banknote,
    title: 'Bank account',
    description: 'Send money directly from your bank account to another bank account.',
  },
  {
    icon: CreditCard,
    title: 'Debit or credit card',
    description: 'Send money using your debit or credit card, and the recipient will receive it in their bank account.',
  },
  {
    icon: Landmark,
    title: 'Wire transfer',
    description: 'Send money using a wire transfer from your bank account to another bank account.',
  },
  {
    icon: Smartphone,
    title: 'Pay with mobile',
    description: 'Send money with our mobile app, and the recipient will receive it in their bank account.',
  },
];

export function BestWays() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <p className="text-center font-bold text-[#052011]/60 mb-2">Send Money</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] text-center mb-12 tracking-tight">
          Best ways to send money abroad
        </h2>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {ways.map((way, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-[#E7FAD1] p-3 rounded-full">
                <way.icon className="w-6 h-6 text-[#052011]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#052011] mb-1">{way.title}</h3>
                <p className="text-gray-600">{way.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
