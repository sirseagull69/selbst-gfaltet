import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artikel = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/artikel' }),
  schema: z.object({
    titel: z.string(),
    beschreibung: z.string(),
    // Kurzfassung für Google und Vorschaubilder, max. 160 Zeichen
    kurz: z.string().max(160).optional(),
    datum: z.coerce.date(),
    kategorie: z.enum(['lokal', 'sicherheit', 'messung', 'code', 'panne']),
    lesezeit: z.number(),
    lernweg: z.string().optional(),
    teil: z.number().optional(),
    ori: z.string().default('liest'),
    oriSpruch: z.string().optional(),
  }),
});

export const collections = { artikel };
