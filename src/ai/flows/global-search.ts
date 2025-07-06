'use server';
/**
 * @fileOverview A global search flow to find items across the application.
 * - globalSearch - A function that searches across various collections.
 * - GlobalSearchInput - The input type for the globalSearch function.
 * - GlobalSearchOutput - The return type for the globalSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { getTransactions, getInvoices, getTickets, getBudgets, getAccounts } from '@/lib/data';
import type { Transaction, Invoice, Ticket, Budget, Account } from '@/lib/data';

const GlobalSearchInputSchema = z.object({
  query: z.string().describe('The search query.'),
  userId: z.string().describe('The ID of the user performing the search.'),
});
export type GlobalSearchInput = z.infer<typeof GlobalSearchInputSchema>;

const SearchResultSchema = z.object({
    type: z.string().describe("The type of the result (e.g., 'Transaction', 'Invoice', 'Ticket')."),
    id: z.string().describe("The unique ID of the item."),
    title: z.string().describe("The main title or identifier for the search result."),
    description: z.string().describe("A brief description of the result."),
    url: z.string().describe("The URL to navigate to for this result."),
});

const GlobalSearchOutputSchema = z.object({
  results: z.array(SearchResultSchema),
});
export type GlobalSearchOutput = z.infer<typeof GlobalSearchOutputSchema>;

export async function globalSearch(input: GlobalSearchInput): Promise<GlobalSearchOutput> {
  const { query, userId } = input;
  const lowerCaseQuery = query.toLowerCase();

  if (!query) {
    return { results: [] };
  }

  // Fetch all data types in parallel
  const [transactions, invoices, tickets, budgets, accounts] = await Promise.all([
    getTransactions(userId),
    getInvoices(userId),
    getTickets(userId),
    getBudgets(userId),
    getAccounts(userId),
  ]);

  // Filter and map transactions
  const transactionResults = transactions
    .filter(tx => tx.customer.toLowerCase().includes(lowerCaseQuery) || tx.email.toLowerCase().includes(lowerCaseQuery))
    .map(tx => ({
        type: 'Transaction',
        id: tx.id!,
        title: `${tx.customer}`,
        description: `Transaction: ${tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} on ${new Date(tx.date).toLocaleDateString()}`,
        url: `/transactions`
    }));

  // Filter and map invoices
  const invoiceResults = invoices
    .filter(inv => inv.customer.toLowerCase().includes(lowerCaseQuery) || inv.invoiceNumber.toLowerCase().includes(lowerCaseQuery))
    .map(inv => ({
        type: 'Invoice',
        id: inv.id!,
        title: `Invoice #${inv.invoiceNumber}`,
        description: `To ${inv.customer} for ${inv.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
        url: `/invoicing`
    }));

    // Filter and map tickets
    const ticketResults = tickets
        .filter(t => t.subject.toLowerCase().includes(lowerCaseQuery))
        .map(t => ({
            type: 'Support Ticket',
            id: t.id!,
            title: `Ticket: ${t.subject}`,
            description: `Department: ${t.department} | Priority: ${t.priority}`,
            url: `/support/${t.id}`
        }));
    
    // Filter and map budgets
    const budgetResults = budgets
        .filter(b => b.name.toLowerCase().includes(lowerCaseQuery))
        .map(b => ({
            type: 'Budget',
            id: b.id!,
            title: `Budget: ${b.name}`,
            description: `Spent ${b.spent.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} of ${b.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
            url: '/budgets',
        }));
    
    // Filter and map accounts
    const accountResults = accounts
        .filter(a => a.name.toLowerCase().includes(lowerCaseQuery) || a.bank.toLowerCase().includes(lowerCaseQuery))
        .map(a => ({
            type: 'Account',
            id: a.id!,
            title: `Account: ${a.name}`,
            description: `${a.bank} - Balance: ${a.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
            url: '/accounts',
        }));

  const allResults = [...transactionResults, ...invoiceResults, ...ticketResults, ...budgetResults, ...accountResults];

  return { results: allResults.slice(0, 10) }; // Limit to 10 results
}
