// 'use server';

/**
 * @fileOverview AI-powered tag suggestion for clothing items.
 *
 * - suggestTags - A function that suggests relevant tags for a clothing item based on its description and images.
 * - SuggestTagsInput - The input type for the suggestTags function.
 * - SuggestTagsOutput - The return type for the suggestTags function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTagsInputSchema = z.object({
  description: z.string().describe('The description of the clothing item.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the clothing item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestTagsInput = z.infer<typeof SuggestTagsInputSchema>;

const SuggestTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the clothing item.'),
  category: z.string().describe('The suggested category for the clothing item.'),
});
export type SuggestTagsOutput = z.infer<typeof SuggestTagsOutputSchema>;

export async function suggestTags(input: SuggestTagsInput): Promise<SuggestTagsOutput> {
  return suggestTagsFlow(input);
}

const suggestTagsPrompt = ai.definePrompt({
  name: 'suggestTagsPrompt',
  input: {schema: SuggestTagsInputSchema},
  output: {schema: SuggestTagsOutputSchema},
  prompt: `You are a fashion expert specializing in tagging and categorizing clothing items.

  Based on the description and image of the clothing item, suggest relevant tags and a category for the item.

  Description: {{{description}}}
  Photo: {{media url=photoDataUri}}
  
  Please provide the tags and category in the following JSON format:
  {
    "tags": ["tag1", "tag2", "tag3"],
    "category": "category"
  }`,
});

const suggestTagsFlow = ai.defineFlow(
  {
    name: 'suggestTagsFlow',
    inputSchema: SuggestTagsInputSchema,
    outputSchema: SuggestTagsOutputSchema,
  },
  async input => {
    const {output} = await suggestTagsPrompt(input);
    return output!;
  }
);
