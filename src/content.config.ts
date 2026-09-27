// Schemas for everything in content/. If a content file has a typo or a missing
// field, the build stops and names the file and field.
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

// "2025-07" style dates, or "present"
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM, e.g. 2024-05');

// One file per resume item: jobs, teams/activities and projects.
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // headline on cards and the detail page
      org: z.string(), // company, team or context
      role: z.string(),
      category: z.string(), // must match an id in site.yaml → work.categories
      location: z.string().optional(),
      start: month,
      end: z.union([month, z.literal('present')]),
      summary: z.string(), // one or two sentences for cards
      highlights: z.array(z.string()).default([]), // resume-style bullets
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      tools: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      doodle: z.string().optional(), // file name in src/assets/doodles, without .svg
      cover: image().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(false), // show on the home page
      order: z.number().default(0), // higher = earlier within its category
      draft: z.boolean().default(false), // true = hidden from the built site
    }),
});

// Photo albums: one folder per album with an index.md; photos are found automatically.
const galleries = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './content/galleries',
    generateId: ({ entry }) => entry.split('/')[0], // folder name = URL
  }),
  schema: z.object({
    title: z.string(),
    date: month,
    summary: z.string().optional(), // one line for the album card
    tags: z.array(z.string()).default([]), // free-form; become filter buttons on /gallery/
    cover: z.string().optional(), // photo file name; defaults to the first photo
    captions: z.record(z.string(), z.string()).default({}), // { "01-pit.jpg": "Caption" }
    draft: z.boolean().default(false),
  }),
});

// Free-form pages such as About.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// YAML lists keep the order they're written in: each entry gets its position.
const ordered = (text: string) =>
  (parse(text) as Record<string, unknown>[]).map((entry, position) => ({ ...entry, position }));

const education = defineCollection({
  loader: file('./content/education.yaml', { parser: ordered }),
  schema: z.object({
    position: z.number(),
    school: z.string(),
    degree: z.string(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string(),
    grade: z.string().optional(),
    notes: z.array(z.string()).default([]),
  }),
});

const skills = defineCollection({
  loader: file('./content/skills.yaml', { parser: ordered }),
  schema: z.object({
    position: z.number(),
    label: z.string(),
    items: z.array(z.string()),
  }),
});

const awards = defineCollection({
  loader: file('./content/awards.yaml', { parser: ordered }),
  schema: z.object({
    position: z.number(),
    title: z.string(),
    org: z.string().optional(),
    date: z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Use "YYYY" or "YYYY-MM"'),
    note: z.string().optional(),
    work: z.string().optional(), // file name in content/work/, checked when the site is built
  }),
});

export const collections = { work, galleries, pages, education, skills, awards };
