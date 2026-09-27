// Loads and validates content/site.yaml. Typos or missing fields fail the build
// with a message naming the field.
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), url: z.string() });

const siteSchema = z.object({
  site: z.object({
    url: z.url(),
    basePath: z.string().default(''),
    title: z.string(),
    description: z.string(),
    language: z.string().default('en'),
  }),
  person: z.object({
    name: z.string(),
    fullName: z.string(),
    headline: z.string(),
    location: z.string(),
    intro: z.string(),
    emailEncoded: z.string().refine((v) => z.email().safeParse(decodeEmail(v)).success, {
      message: 'Not a valid encoded email. Run: npm run encode-email -- you@example.com',
    }),
    resumePdf: z.string().default(''),
  }),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
  socials: z.array(link).default([]),
  work: z.object({
    categories: z.array(z.object({ id: z.string(), label: z.string() })).min(1),
  }),
  contact: z.object({ message: z.string() }),
});

/** Reverses `npm run encode-email`: base64 → reversed address → address. */
export function decodeEmail(encoded: string): string {
  return [...Buffer.from(encoded, 'base64').toString('utf8')].reverse().join('');
}

export type SiteConfig = z.infer<typeof siteSchema>;

export function loadSiteConfig(path = 'content/site.yaml'): SiteConfig {
  const raw = parse(readFileSync(path, 'utf8'));
  const result = siteSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid ${path}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const config = loadSiteConfig();
