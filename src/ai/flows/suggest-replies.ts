'use server';
/**
 * @fileOverview An AI flow to suggest quick replies for a user in a support chat.
 * - getSuggestedReplies - A function that takes the last agent message and suggests user replies.
 * - SuggestRepliesInput - The input type for the getSuggestedReplies function.
 * - SuggestRepliesOutput - The return type for the getSuggestedReplies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRepliesInputSchema = z.object({
  lastMessage: z.string().describe("The last message sent by the support agent."),
});
export type SuggestRepliesInput = z.infer<typeof SuggestRepliesInputSchema>;

const SuggestRepliesOutputSchema = z.object({
  suggestions: z.array(z.string())
    .max(3)
    .describe('An array of up to 3 short, relevant reply suggestions for the user.'),
});
export type SuggestRepliesOutput = z.infer<typeof SuggestRepliesOutputSchema>;

export async function getSuggestedReplies(input: SuggestRepliesInput): Promise<SuggestRepliesOutput> {
  return suggestRepliesFlow(input);
}

const suggestRepliesPrompt = ai.definePrompt({
  name: 'suggestRepliesPrompt',
  input: {schema: SuggestRepliesInputSchema},
  output: {schema: SuggestRepliesOutputSchema},
  prompt: `You are an AI assistant in a customer support chat. Based on the last message from the support agent, generate up to 3 concise and relevant reply suggestions for the user.
  
  - The suggestions should be from the user's perspective.
  - They should be short and to the point (e.g., "Yes, that worked!", "I'm still having issues.", "Can you explain that again?").
  - Do not number the suggestions.

  SUPPORT AGENT'S MESSAGE:
  "{{{lastMessage}}}"
  
  Generate suggestions now.`,
});

const suggestRepliesFlow = ai.defineFlow(
  {
    name: 'suggestRepliesFlow',
    inputSchema: SuggestRepliesInputSchema,
    outputSchema: SuggestRepliesOutputSchema,
  },
  async (input) => {
    const {output} = await suggestRepliesPrompt(input);
    return output!;
  }
);
