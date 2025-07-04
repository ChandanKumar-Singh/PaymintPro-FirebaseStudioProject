'use server';

/**
 * @fileOverview A financial advice AI agent.
 * - askFinancialAdvisor - A function that handles generating financial advice.
 * - FinancialAdviceInput - The input type for the askFinancialAdvisor function.
 * - FinancialAdviceOutput - The return type for the askFinancialAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAdviceInputSchema = z.object({
  query: z.string().describe('The user\'s financial question.'),
});
export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized financial advice for the user.'),
});
export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function askFinancialAdvisor(query: string): Promise<FinancialAdviceOutput> {
  return financialAdviceFlow({ query });
}

const prompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: {schema: FinancialAdviceInputSchema},
  output: {schema: FinancialAdviceOutputSchema},
  prompt: `You are an expert financial advisor. A user has a question about their finances. 
  
Provide clear, actionable, and personalized advice based on their query. Do not provide generic advice.
Assume you have access to their financial data if needed to answer the question, but do not ask for it.
Keep the response concise and easy to understand.

User's question: {{{query}}}`,
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
