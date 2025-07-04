'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export function MyCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <div className="relative aspect-[1.586] rounded-xl bg-gradient-to-br from-primary to-blue-400 p-6 text-primary-foreground shadow-lg">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Paymint</span>
                    <Image
                      src="https://placehold.co/40x25.png"
                      alt="Visa"
                      width={40}
                      height={25}
                      data-ai-hint="visa logo"
                    />
                  </div>
                  <div className="mt-8">
                    <p className="text-sm tracking-widest">
                      **** **** **** 1234
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs">Brock Peters</p>
                      <p className="text-xs">08/28</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <div className="relative aspect-[1.586] rounded-xl bg-gradient-to-br from-accent to-gray-600 p-6 text-primary-foreground shadow-lg">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Paymint</span>
                    <Image
                      src="https://placehold.co/40x25.png"
                      alt="Mastercard"
                      width={40}
                      height={25}
                      data-ai-hint="mastercard logo"
                    />
                  </div>
                  <div className="mt-8">
                    <p className="text-sm tracking-widest">
                      **** **** **** 5678
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs">Brock Peters</p>
                      <p className="text-xs">11/27</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="ml-2" />
          <CarouselNext className="mr-2" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
