import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const contacts = [
  { name: 'Livia Bator', image: 'https://placehold.co/40x40.png', dataAiHint: 'woman avatar' },
  { name: 'Randy Press', image: 'https://placehold.co/40x40.png', dataAiHint: 'man avatar' },
  { name: 'Workman', image: 'https://placehold.co/40x40.png', dataAiHint: 'person avatar' },
];

export function QuickTransfer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Transfer</CardTitle>
        <CardDescription>Send money to your contacts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex -space-x-2 overflow-hidden">
            {contacts.map((contact) => (
              <Avatar
                key={contact.name}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-background"
              >
                <AvatarImage src={contact.image} alt={contact.name} data-ai-hint={contact.dataAiHint} />
                <AvatarFallback>
                  {contact.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              $
            </span>
            <Input
              type="number"
              placeholder="0.00"
              className="pl-7 pr-12 text-lg"
            />
          </div>
          <Button className="w-full" size="lg">
            Send Money
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
