// This is a server-side file!
'use server';

/**
 * @fileOverview Provides AI-powered shoe recommendations based on user preferences.
 *
 * - recommendShoes - A function that generates shoe recommendations.
 * - ShoeRecommendationInput - The input type for the recommendShoes function.
 * - ShoeRecommendationOutput - The return type for the recommendShoes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShoeRecommendationInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user preferences for shoes (e.g., brand, size, color, material, price range).'),
  purchaseHistory: z
    .string()
    .optional()
    .describe('The user purchase history, if available.'),
});
export type ShoeRecommendationInput = z.infer<typeof ShoeRecommendationInputSchema>;

const ShoeRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      shoeName: z.string().describe('The name of the recommended shoe.'),
      description: z.string().describe('A brief description of the shoe.'),
      imageUrl: z.string().describe('URL of the shoe image.'),
      reason: z.string().describe('Reason why the shoe was recommended.'),
    })
  ).describe('An array of recommended shoes based on user preferences.'),
});
export type ShoeRecommendationOutput = z.infer<typeof ShoeRecommendationOutputSchema>;

export async function recommendShoes(input: ShoeRecommendationInput): Promise<ShoeRecommendationOutput> {
  return recommendShoesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'shoeRecommendationPrompt',
  input: {schema: ShoeRecommendationInputSchema},
  output: {schema: ShoeRecommendationOutputSchema},
  prompt: `You are a personal shopping assistant specializing in recommending shoes to users.

  Based on the user's preferences and purchase history, recommend shoes that they are likely to be interested in.  Ensure the recommendations are relevant to the user's stated preferences. If a purchase history is available, prioritize shoes that align with past purchases.

  User Preferences: {{{userPreferences}}}
  Purchase History: {{{purchaseHistory}}}

  Provide a diverse range of recommendations, including different styles, brands, and price points.
  For each recommended shoe, briefly explain why it was selected based on the provided information.
  Make sure to include real URLs for each shoe image.
  Do not return more than 5 shoes.
  Follow the schema exactly.
  `,
});

const recommendShoesFlow = ai.defineFlow(
  {
    name: 'recommendShoesFlow',
    inputSchema: ShoeRecommendationInputSchema,
    outputSchema: ShoeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
