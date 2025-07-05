'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { type CardData } from '@/lib/data';
import { useState } from 'react';

function CreditCard({ className, brand, number, holder, expiry }: { className?: string } & Omit<CardData, 'id' | 'status' | 'type'>) {
  const gradients = {
    visa: 'from-blue-600 to-blue-400',
    mastercard: 'from-gray-800 to-gray-600',
  }
  const logo = {
      visa: 'https://placehold.co/40x25.png',
      mastercard: 'https://placehold.co/40x25.png'
  }
  const dataAiHint = {
      visa: 'visa logo',
      mastercard: 'mastercard logo'
  }
  return (
    <div
      className={`relative aspect-[1.586] w-full max-w-sm rounded-xl bg-gradient-to-br p-6 text-primary-foreground shadow-lg ${gradients[brand]} ${className}`}
    >
      <div className="flex justify-between">
        <span className="text-lg font-semibold">Paymint</span>
        <Image
          src={logo[brand]}
          alt={brand}
          width={40}
          height={25}
          data-ai-hint={dataAiHint[brand]}
        />
      </div>
      <div className="mt-8">
        <p className="text-xl tracking-widest">
          {number}
        </p>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-xs text-white/80">Card Holder</p>
            <p className="text-sm">{holder}</p>
          </div>
          <div>
            <p className="text-xs text-white/80">Expires</p>
            <p className="text-sm">{expiry}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export function MyCards({ cards }: { cards: CardData[] }) {
  const [selectedCardId, setSelectedCardId] = useState(cards.length > 0 ? cards[0].id : '');
  const selectedCard = cards.find(c => c.id === selectedCardId);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>My Cards</CardTitle>
            <CardDescription>Manage your cards and settings.</CardDescription>
          </div>
          <Select value={selectedCardId} onValueChange={setSelectedCardId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select card" />
            </SelectTrigger>
            <SelectContent>
              {cards.map(card => (
                <SelectItem key={card.id} value={card.id}>{card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} **** {card.number.slice(-4)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {selectedCard ? 
            <CreditCard {...selectedCard} /> 
            : <p>No card selected.</p>
        }
      </CardContent>
    </Card>
  );
}
