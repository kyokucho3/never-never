import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";
import { text } from "itty-router";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        id: z.number(),
        title: z.string(),
        date: z.string(),
        excerpt: z.string(),
        image: z.string().optional(),
    }),
});

const tanka = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tanka" }),
    schema: z.object({
        id: z.number(),
        title: z.string().optional(),
        date: z.coerce.string(),
        text: z.string().optional,
        body: z.string().optional,
        note: z.string().optional(),
    }),
});

export const collections = { blog, tanka };
