'use client';

import * as React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  ArrowRightLeft,
  FileText,
  Settings,
  User,
  Ticket,
  DollarSign,
  FilePlus2,
  PlusCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';
import { globalSearch } from '@/ai/flows/global-search';
import { useDebounce } from '@/hooks/use-debounce';
import type { GlobalSearchOutput } from '@/ai/flows/global-search';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<GlobalSearchOutput['results']>([]);

  const debouncedSearch = useDebounce(search, 300);

  React.useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearch && user) {
        setLoading(true);
        const response = await globalSearch({ query: debouncedSearch, userId: user.uid });
        setResults(response.results);
        setLoading(false);
      } else {
        setResults([]);
      }
    };
    performSearch();
  }, [debouncedSearch, user]);

  const runCommand = React.useCallback((command: () => unknown) => {
    onOpenChange(false);
    command();
  }, [onOpenChange]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Transaction': return <DollarSign className="mr-2 h-4 w-4" />;
      case 'Invoice': return <FileText className="mr-2 h-4 w-4" />;
      case 'Support Ticket': return <Ticket className="mr-2 h-4 w-4" />;
      default: return <User className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
      <CommandList>
        <CommandEmpty>{loading ? "Searching..." : "No results found."}</CommandEmpty>
        
        {results.length > 0 && (
          <CommandGroup heading="Search Results">
            {results.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => runCommand(() => router.push(result.url))}
                value={`result-${result.id}-${result.title}`}
              >
                {getIcon(result.type)}
                <span>{result.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/transactions'))}>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            <span>Transactions</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/invoicing'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Invoicing</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push('/invoicing/new'))}>
            <FilePlus2 className="mr-2 h-4 w-4" />
            <span>Create New Invoice</span>
          </CommandItem>
           <CommandItem onSelect={() => runCommand(() => router.push('/support'))}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Create New Ticket</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
