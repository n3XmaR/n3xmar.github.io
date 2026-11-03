
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const rabbitHoles = defineCollection({
    loader: glob({
        base: './src/content/rabbit-holes',
        pattern: '**/*.md'
    }),

    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        date: z.coerce.date()
    })
});



const projects = defineCollection({
    loader: glob({
        base: './src/content/projects',
        pattern: '**/*.md'
    }),

    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        github: z.string().url().optional()
    })
});



const certificates = defineCollection({
    loader: glob({
        base: './src/content/certificates',
        pattern: '**/*.md'
    }),

    schema: z.object({
        title: z.string(),
        issuer: z.string(),
        image: z.string(),
        date: z.coerce.date().optional(),
        credentialUrl: z.string().url().optional()
    })
});



export const collections = {
    'rabbit-holes': rabbitHoles,
    projects,
    certificates
};
