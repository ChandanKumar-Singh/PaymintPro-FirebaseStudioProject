'use server';

/**
 * @fileOverview Spending insights AI agent.
 *
 * - generateSpendingInsights - A function that handles the generation of spending insights.
 * - SpendingInsightsInput - The input type for the generateSpendingInsights function.
 * - SpendingInsightsOutput - The return type for the generateSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpendingInsightsInputSchema = z.object({
  transactions: z
    .string()
    .describe(
      'A list of transactions as a JSON array, with each transaction including date, amount, and category.'
    ),
});
export type SpendingInsightsInput = z.infer<typeof SpendingInsightsInputSchema>;

const SpendingInsightsOutputSchema = z.object({
  report: z
    .string()
    .describe(
      'A detailed financial report categorizing the user spending, identifying trends, and providing actionable insights.'
    ),
});
export type SpendingInsightsOutput = z.infer<typeof SpendingInsightsOutputSchema>;

export async function generateSpendingInsights(
  input: SpendingInsightsInput
): Promise<SpendingInsightsOutput> {
  return generateSpendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'spendingInsightsPrompt',
  input: {schema: SpendingInsightsInputSchema},
  output: {schema: SpendingInsightsOutputSchema},
  prompt: `You are a financial advisor that analyzes spending habits.

  Analyze the user's transactions and generate a financial report that categorizes their spending, identifies trends, and provides actionable insights.

  Transactions: {{{transactions}}}
  `,
});

const generateSpendingInsightsFlow = ai.defineFlow(
  {
    name: 'generateSpendingInsightsFlow',
    inputSchema: SpendingInsightsInputSchema,
    outputSchema: SpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
