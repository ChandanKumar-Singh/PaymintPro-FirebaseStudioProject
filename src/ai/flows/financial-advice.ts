'use server';

/**
 * @fileOverview Provides personalized financial advice based on user's financial data and goals.
 *
 * - getFinancialAdvice - A function that generates financial advice.
 * - FinancialAdviceInput - The input type for the getFinancialAdvice function.
 * - FinancialAdviceOutput - The return type for the getFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAdviceInputSchema = z.object({
  income: z.number().describe('Monthly income.'),
  expenses: z.number().describe('Monthly expenses.'),
  debts: z.string().describe('List of debts, including amounts and interest rates.'),
  goals: z.string().describe('Financial goals, such as retirement, buying a house, etc.'),
});

export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  summary: z.string().describe('A summary of your financial situation.'),
  recommendations: z.string().describe('Personalized financial recommendations.'),
});

export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: FinancialAdviceInput): Promise<FinancialAdviceOutput> {
  return financialAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: {schema: FinancialAdviceInputSchema},
  output: {schema: FinancialAdviceOutputSchema},
  prompt: `You are a financial advisor. Analyze the following financial data and provide personalized recommendations to achieve the user's financial goals.

Financial Data:
Income: {{{income}}}
Expenses: {{{expenses}}}
Debts: {{{debts}}}
Goals: {{{goals}}}

Provide a summary of the user's financial situation and specific, actionable recommendations.
`,
});

const financialAdviceFlow = ai.defineFlow(
  {
    name: 'financialAdviceFlow',
    inputSchema: FinancialAdviceInputSchema,
    outputSchema: FinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
