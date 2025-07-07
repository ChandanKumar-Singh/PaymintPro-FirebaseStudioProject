'use client';
import Image from 'next/image';

const rates = [
  { name: 'Paymint', logo: 'https://placehold.co/32x32.png', dataAiHint: 'paymint logo', transferFee: '0.45 EUR', ourRate: '0.8467', youGet: '842.23 GBP', isBest: true },
  { name: 'Wise', logo: 'https://placehold.co/32x32.png', dataAiHint: 'wise logo', transferFee: '0.73 EUR', ourRate: '0.8467', youGet: '840.40 GBP' },
  { name: 'Remitly', logo: 'https://placehold.co/32x32.png', dataAiHint: 'remitly logo', transferFee: '0.99 EUR', ourRate: '0.8458', youGet: '838.74 GBP' },
  { name: 'OFX', logo: 'https://placehold.co/32x32.png', dataAiHint: 'ofx logo', transferFee: '4.17 EUR', ourRate: '0.8407', youGet: '836.46 GBP' },
  { name: 'MoneyGram', logo: 'https://placehold.co/32x32.png', dataAiHint: 'moneygram logo', transferFee: '0.99 EUR', ourRate: '0.8359', youGet: '828.84 GBP' },
  { name: 'XE', logo: 'https://placehold.co/32x32.png', dataAiHint: 'xe logo', transferFee: '4.17 EUR', ourRate: '0.8291', youGet: '824.81 GBP' },
  { name: 'PayPal', logo: 'https://placehold.co/32x32.png', dataAiHint: 'paypal logo', transferFee: '1.77 EUR', ourRate: '0.8242', youGet: '817.43 GBP' },
  { name: 'Skrill', logo: 'https://placehold.co/32x32.png', dataAiHint: 'skrill logo', transferFee: '0 EUR', ourRate: '0.8035', youGet: '803.54 GBP' },
];

export function PricingComparison() {
  return (
    <section className="bg-[#F9FAFB] py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#052011] text-center mb-4">
          Compare our pricing
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          For transfers up to 1,000 euros. The price is based on an analysis of 12 providers.
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 font-bold text-gray-500 text-sm">
              <div>PROVIDER</div>
              <div className="text-center">TRANSFER FEE</div>
              <div className="text-center">OUR RATE</div>
              <div className="text-right">YOU GET</div>
            </div>
            <div className="space-y-2">
              {rates.map((rate) => (
                <div key={rate.name} className={`grid grid-cols-2 md:grid-cols-4 gap-4 items-center p-4 rounded-xl ${rate.isBest ? 'bg-[#052011] text-white' : ''}`}>
                  <div className="flex items-center gap-4">
                    <Image src={rate.logo} data-ai-hint={rate.dataAiHint} alt={rate.name} width={32} height={32} />
                    <span className="font-bold">{rate.name}</span>
                  </div>
                  <div className={`text-right md:text-center font-medium ${rate.isBest ? 'text-white' : 'text-gray-800'}`}>{rate.transferFee}</div>
                  <div className={`text-left md:text-center font-medium ${rate.isBest ? 'text-[#B2F35F]' : 'text-gray-800'}`}>{rate.ourRate}</div>
                  <div className={`text-right font-bold text-lg ${rate.isBest ? 'text-white' : 'text-red-500'}`}>{rate.youGet}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            Disclaimer: The prices shown are for informational purposes only and may not be the most current.
            Please visit the provider's official website for the latest pricing.
          </p>
        </div>
      </div>
    </section>
  );
}
