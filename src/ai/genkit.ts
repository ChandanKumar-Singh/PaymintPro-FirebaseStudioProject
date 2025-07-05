import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize the googleAI plugin with the API key from environment variables.
// The key is stored in .env and loaded automatically by Next.js.
export const ai = genkit({
  plugins: [googleAI({apiKey: process.env.GOOGLE_API_KEY})],
  model: 'googleai/gemini-2.0-flash',
});
