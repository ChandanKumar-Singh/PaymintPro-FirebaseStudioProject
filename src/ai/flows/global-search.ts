'use server';
/**
 * @fileOverview A global search flow to find items across the application.
 * - globalSearch - A function that searches across various collections.
 * - GlobalSearchInput - The input type for the globalSearch function.
 * - GlobalSearchOutput - The return type for the globalSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getTransactions, getInvoices, getTickets } from '@/lib/data';
import type { Transaction, Invoice, Ticket } from '@/lib/data';

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

  const [transactions, invoices, tickets] = await Promise.all([
    getTransactions(userId),
    getInvoices(userId),
    getTickets(userId),
  ]);

  const transactionResults = transactions
    .filter(tx => tx.customer.toLowerCase().includes(lowerCaseQuery))
    .map(tx => ({
        type: 'Transaction',
        id: tx.id!,
        title: `Transaction: ${tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
        description: `From ${tx.customer}`,
        url: `/transactions`
    }));

  const invoiceResults = invoices
    .filter(inv => inv.customer.toLowerCase().includes(lowerCaseQuery))
    .map(inv => ({
        type: 'Invoice',
        id: inv.id!,
        title: `Invoice #${inv.invoiceNumber}`,
        description: `To ${inv.customer} for ${inv.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
        url: `/invoicing`
    }));

    const ticketResults = tickets
        .filter(t => t.subject.toLowerCase().includes(lowerCaseQuery))
        .map(t => ({
            type: 'Support Ticket',
            id: t.id!,
            title: `Ticket: ${t.subject}`,
            description: `Department: ${t.department} | Priority: ${t.priority}`,
            url: `/support/${t.id}`
        }));

  const allResults = [...transactionResults, ...invoiceResults, ...ticketResults];

  return { results: allResults.slice(0, 10) }; // Limit to 10 results
}
