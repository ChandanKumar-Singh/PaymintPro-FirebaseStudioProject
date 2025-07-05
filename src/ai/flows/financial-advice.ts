'use server';

/**
 * @fileOverview A financial advice AI agent that can use tools to access user data.
 * - askFinancialAdvisor - A function that handles generating financial advice.
 * - FinancialAdviceInput - The input type for the askFinancialAdvisor function.
 * - FinancialAdviceOutput - The return type for the askFinancialAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getTransactions, type Transaction } from '@/lib/data';

const FinancialAdviceInputSchema = z.object({
  query: z.string().describe('The user\'s financial question.'),
});
export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized financial advice for the user.'),
});
export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function askFinancialAdvisor(query: string, userId: string): Promise<FinancialAdviceOutput> {
  return financialAdviceFlow({ query, userId });
}

const financialAdviceFlow = ai.defineFlow(
  {
    name: 'financialAdviceFlow',
    inputSchema: FinancialAdviceInputSchema.extend({ userId: z.string() }),
    outputSchema: FinancialAdviceOutputSchema,
  },
  async ({ query, userId }) => {
    // Define a tool that the AI can use to fetch the user's transaction data.
    // The tool is defined inside the flow so it can access the `userId`.
    const getUserTransactions = ai.defineTool(
      {
        name: 'getUserTransactions',
        description:
          "Get a list of the user's recent financial transactions to analyze their spending patterns.",
        inputSchema: z.object({}), // No input needed from the LLM for this tool
        outputSchema: z.array(
          z.object({
            customer: z.string(),
            type: z.string(),
            status: z.string(),
            date: z.string(),
            amount: z.number(),
          })
        ),
      },
      async () => {
        // This function has access to the `userId` from the flow's input
        const transactions: Transaction[] = await getTransactions(userId);
        // Return a clean version of the data for the AI model, removing unnecessary fields.
        return transactions.map(({ id, email, ...rest }) => rest);
      }
    );

    // Call the AI model, providing the dynamic tool
    const { output } = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: `You are an expert financial advisor. A user has a question about their finances. 
  
        Provide clear, actionable, and personalized advice based on their query.
        
        If the user's question can be answered by analyzing their spending history (e.g., "where can I save money?", "analyze my spending"), use the available tool to get their recent transactions. Use this data to provide specific examples and insights. Do not just list the transactions; analyze them.
        
        If the tool is not relevant to the question, answer directly. Do not ask for financial data.

        User's question: "${query}"`,
        tools: [getUserTransactions],
        output: {
            schema: FinancialAdviceOutputSchema,
        },
    });

    return output!;
  }
);
