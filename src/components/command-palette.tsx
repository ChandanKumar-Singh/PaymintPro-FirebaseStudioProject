'use client';

import * as React from 'react';
import {
  Command,
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
  Search,
  Landmark,
  Target,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';
import { globalSearch } from '@/ai/flows/global-search';
import { useDebounce } from '@/hooks/use-debounce';
import type { GlobalSearchOutput } from '@/ai/flows/global-search';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


export function CommandPalette() {
  const router = useRouter();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<GlobalSearchOutput['results']>([]);
  
  // Ref for the input to manage focus
  const inputRef = React.useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebounce(search, 300);

  // Keyboard shortcut to open the palette
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  
  // Focus input when popover opens
  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Perform search
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
    setOpen(false);
    setSearch('');
    command();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Transaction': return <DollarSign className="mr-3 h-5 w-5" />;
      case 'Invoice': return <FileText className="mr-3 h-5 w-5" />;
      case 'Support Ticket': return <Ticket className="mr-3 h-5 w-5" />;
      case 'Budget': return <Target className="mr-3 h-5 w-5" />;
      case 'Account': return <Landmark className="mr-3 h-5 w-5" />;
      default: return <User className="mr-3 h-5 w-5" />;
    }
  };

  const hasSearchResults = results.length > 0;
  const showSuggestions = !hasSearchResults && search.length < 2;

  const trigger = (
      <Button
        variant="outline"
        className={cn(
          'relative w-full justify-start rounded-lg bg-card pl-3 pr-2 text-muted-foreground md:w-[200px] lg:w-[320px]',
          'focus-visible:ring-primary'
        )}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search...
        </div>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {isMobile ? 
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setOpen(true)}><Search className="h-4 w-4" /></Button>
            : trigger}
        </PopoverTrigger>
        <PopoverContent className="w-[min(calc(100vw-2rem),40rem)] p-0" align="start">
            <Command shouldFilter={false}>
                <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <CommandInput
                        ref={inputRef}
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Type a command or search..."
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <CommandList>
                    <CommandEmpty>{loading ? "Searching..." : "No results found."}</CommandEmpty>
                    
                    {hasSearchResults && (
                    <CommandGroup heading="Search Results">
                        {results.map((result) => (
                        <CommandItem
                            key={result.id}
                            onSelect={() => runCommand(() => router.push(result.url))}
                            value={`result-${result.id}-${result.title}`}
                            className="flex-col items-start"
                        >
                            <div className="flex items-center">
                                {getIcon(result.type)}
                                <span className="font-medium">{result.title}</span>
                            </div>
                            <div className="ml-8 text-xs text-muted-foreground">{result.description}</div>
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    )}

                    {showSuggestions && (
                        <>
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
                                <CommandItem onSelect={() => {
                                    // This requires a more complex way to open the dialog
                                    // For now, navigate to the page where the dialog is
                                    runCommand(() => router.push('/support'))
                                }}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>Create New Ticket</span>
                                </CommandItem>
                            </CommandGroup>
                        </>
                    )}
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  );
}
