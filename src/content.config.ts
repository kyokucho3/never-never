import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const dateString = z
    .union([z.string(), z.date()])
    .transform((v) => (typeof v === 'string' ? v.slice(0, 10) : v.toISOString().slice(0, 10)));

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        id: z.number(),
        title: z.string(),
        date: dateString,
        excerpt: z.string(),
        image: z.string().optional(),
    }),
});

const tanka = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tanka" }),
    schema: z.object({
        id: z.number(),
        title: z.string().optional(),
        date: dateString,
        text: z.string().optional(),
        body: z.string().optional(),
        note: z.string().optional(),
    }),
});

export const collections = { blog, tanka };
