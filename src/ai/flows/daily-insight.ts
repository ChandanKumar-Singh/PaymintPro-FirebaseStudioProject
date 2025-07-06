'use server';
/**
 * @fileOverview An AI flow to generate a daily financial insight based on recent transactions.
 * - getDailyInsight - A function that generates a personalized financial tip.
 * - DailyInsightInput - The input type for the getDailyInsight function.
 * - DailyInsightOutput - The return type for the getDailyInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Transaction } from '@/lib/data';

// Prepare a subset of transaction data for the prompt
const TransactionInputSchema = z.object({
  type: z.string(),
  category: z.string(),
  amount: z.number(),
  date: z.string(),
});

const DailyInsightInputSchema = z.object({
  transactions: z.array(TransactionInputSchema).describe("A list of recent financial transactions from the past week."),
});
export type DailyInsightInput = z.infer<typeof DailyInsightInputSchema>;

const DailyInsightOutputSchema = z.object({
  insight: z.string().describe('A short, actionable financial insight or observation for the user. Should be one sentence.'),
});
export type DailyInsightOutput = z.infer<typeof DailyInsightOutputSchema>;


export async function getDailyInsight(input: {transactions: Transaction[]}): Promise<DailyInsightOutput> {
    const preparedTransactions = input.transactions.map(({ type, category, amount, date }) => ({
        type,
        category,
        amount,
        date
    }));
    return dailyInsightFlow({ transactions: preparedTransactions });
}

const dailyInsightPrompt = ai.definePrompt({
  name: 'dailyInsightPrompt',
  input: {schema: DailyInsightInputSchema},
  output: {schema: DailyInsightOutputSchema},
  prompt: `You are a helpful and concise financial assistant. Your task is to analyze a user's recent transactions and provide a single, short, encouraging, and actionable insight. 
  
  - Keep the insight to a single sentence.
  - Focus on a positive observation or a gentle suggestion for improvement.
  - Do not be generic. Base the insight on the specific transaction data provided.
  - Example outputs: "Your consistent subscription payments show great financial discipline!" or "You've spent a bit on dining out this week; maybe try a home-cooked meal tonight?"

  RECENT TRANSACTIONS:
  ---
  {{#each transactions}}
  - {{date}}: {{type}} in {{category}} for \${{amount}}
  {{/each}}
  ---
  
  Provide your single-sentence insight now.`,
});

const dailyInsightFlow = ai.defineFlow(
  {
    name: 'dailyInsightFlow',
    inputSchema: DailyInsightInputSchema,
    outputSchema: DailyInsightOutputSchema,
  },
  async (input) => {
    if (input.transactions.length === 0) {
        return { insight: "No recent transaction data to analyze. Keep up the good work!" };
    }
    const {output} = await dailyInsightPrompt(input);
    return output!;
  }
);
