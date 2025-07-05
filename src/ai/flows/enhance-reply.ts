'use server';
/**
 * @fileOverview An AI flow to enhance a user's drafted reply in a support conversation.
 * - enhanceReply - A function that takes a conversation context and a draft reply and returns a polished version.
 * - EnhanceReplyInput - The input type for the enhanceReply function.
 * - EnhanceReplyOutput - The return type for the enhanceReply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceReplyInputSchema = z.object({
  conversation: z.string().describe('The last few messages in the support conversation for context.'),
  draft: z.string().describe("The user's drafted reply to be enhanced."),
});
export type EnhanceReplyInput = z.infer<typeof EnhanceReplyInputSchema>;

const EnhanceReplyOutputSchema = z.object({
  enhancedReply: z.string().describe('The AI-enhanced, polished version of the user\'s reply.'),
});
export type EnhanceReplyOutput = z.infer<typeof EnhanceReplyOutputSchema>;

export async function enhanceReply(input: EnhanceReplyInput): Promise<EnhanceReplyOutput> {
  return enhanceReplyFlow(input);
}

const enhanceReplyPrompt = ai.definePrompt({
  name: 'enhanceReplyPrompt',
  input: {schema: EnhanceReplyInputSchema},
  output: {schema: EnhanceReplyOutputSchema},
  prompt: `You are a helpful writing assistant. Your task is to enhance a user's drafted reply within a customer support chat. 
  
  Based on the provided conversation context, refine the user's draft to be clearer, more professional, and more effective.
  - Maintain the original intent of the user's message.
  - Correct any grammar or spelling mistakes.
  - If the draft is very short or just contains keywords, expand it into a full sentence or question.
  - Do not add any extra pleasantries or signatures. Only provide the enhanced message body.

  CONVERSATION CONTEXT:
  ---
  {{{conversation}}}
  ---

  USER'S DRAFTED REPLY:
  "{{{draft}}}"
  
  Provide only the enhanced reply text.`,
});

const enhanceReplyFlow = ai.defineFlow(
  {
    name: 'enhanceReplyFlow',
    inputSchema: EnhanceReplyInputSchema,
    outputSchema: EnhanceReplyOutputSchema,
  },
  async (input) => {
    if (!input.draft.trim()) {
        return { enhancedReply: '' };
    }
    const {output} = await enhanceReplyPrompt(input);
    return output!;
  }
);
