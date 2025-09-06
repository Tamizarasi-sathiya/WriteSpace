'use server';

/**
 * @fileOverview A flow for suggesting relevant blog post topics based on current trends or user interests.
 *
 * - suggestRelevantTopics - A function that suggests relevant blog post topics.
 * - SuggestRelevantTopicsInput - The input type for the suggestRelevantTopics function.
 * - SuggestRelevantTopicsOutput - The return type for the suggestRelevantTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantTopicsInputSchema = z.object({
  interests: z
    .string()
    .describe("The user's interests, which can be used to tailor the suggestions.")
    .optional(),
  currentTrends: z
    .string()
    .describe('A description of current trends to generate suggestions from.')
    .optional(),
  keywords: z
    .string()
    .describe('Keywords to use to generate suggestions.')
    .optional(),
});
export type SuggestRelevantTopicsInput = z.infer<
  typeof SuggestRelevantTopicsInputSchema
>;

const SuggestRelevantTopicsOutputSchema = z.object({
  topics: z
    .array(z.string())
    .describe('An array of suggested blog post topics.'),
});
export type SuggestRelevantTopicsOutput = z.infer<
  typeof SuggestRelevantTopicsOutputSchema
>;

export async function suggestRelevantTopics(
  input: SuggestRelevantTopicsInput
): Promise<SuggestRelevantTopicsOutput> {
  return suggestRelevantTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantTopicsPrompt',
  input: {schema: SuggestRelevantTopicsInputSchema},
  output: {schema: SuggestRelevantTopicsOutputSchema},
  prompt: `You are a blog post topic suggester. Given the following information, suggest 5 relevant blog post topics. Make the blog post topics creative and engaging.

  {% if interests %}User Interests: {{{interests}}}{% endif %}
  {% if currentTrends %}Current Trends: {{{currentTrends}}}{% endif %}
  {% if keywords %}Keywords: {{{keywords}}}{% endif %}

  Return the topics as a JSON array of strings.
  `,
});

const suggestRelevantTopicsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantTopicsFlow',
    inputSchema: SuggestRelevantTopicsInputSchema,
    outputSchema: SuggestRelevantTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
