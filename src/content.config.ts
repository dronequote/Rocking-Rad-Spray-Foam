import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['money-page', 'symptom-based', 'local-oklahoma']),
    author: z.string().default('Rocking Rad Spray Foam'),
    readTime: z.string(),
    image: z.string().optional(),
    seoTitle: z.string().optional(),
    primaryKeyword: z.string().optional(),
    relatedServices: z.array(z.string()).optional(),
    relatedCities: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
