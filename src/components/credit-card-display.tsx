'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ConfirmDialog } from './dialogs/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

interface CreditCardDisplayProps {
  id: string;
  brand: 'visa' | 'mastercard';
  number: string;
  holder: string;
  expiry: string;
  status: 'Active' | 'Inactive';
  type: 'Physical' | 'Virtual';
}

export function CreditCardDisplay({ id, brand, number, holder, expiry, status, type }: CreditCardDisplayProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { toast } = useToast();

  const gradients = {
    visa: 'from-blue-600 to-blue-400',
    mastercard: 'from-gray-800 to-gray-600',
  };
  const logo = {
    visa: 'https://placehold.co/40x25.png',
    mastercard: 'https://placehold.co/40x25.png',
  };
   const dataAiHint = {
      visa: 'visa logo',
      mastercard: 'mastercard logo'
  }

  const handleDelete = () => {
    // In a real app, you would call an API to delete the card
    toast({
        title: "Card Removed",
        description: "The card has been successfully removed.",
    });
    setConfirmOpen(false);
    // You would also need to update the state in the parent component
  }

  const handleSettings = () => {
      toast({
          title: "Coming Soon",
          description: "Card settings will be available in a future update.",
      })
  }

  return (
    <>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDelete}
        title="Are you sure you want to remove this card?"
        description="This action cannot be undone and will permanently delete the card from your account."
      />
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className={`relative aspect-[1.586] w-full max-w-sm rounded-xl bg-gradient-to-br p-6 text-primary-foreground shadow-lg ${gradients[brand]}`}>
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
                <p className="text-xl tracking-widest">{number}</p>
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
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-medium">
                  {brand.charAt(0).toUpperCase() + brand.slice(1)} {type} Card
                </p>
                <Badge variant={status === 'Active' ? 'default' : 'secondary'} className={cn(status === 'Active' && 'bg-green-100 text-green-800')}>{status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{number}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="ghost" size="icon" onClick={handleSettings}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setConfirmOpen(true)}>
                  <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
