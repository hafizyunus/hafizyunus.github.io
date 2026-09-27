// Connects skills to where they were used. A skill, tool or tag with the same name
// (ignoring case and punctuation) in skills.yaml, a work file's `tools`/`tags`, or an album's
// `tags` is treated as one thing, with a page at /skills/<slug>/.
import { getCollection } from 'astro:content';
import { getAlbums, type Album } from './galleries';
import { byPosition, getWork, url, type Work } from './utils';

/** "Vibration data processing & analysis" → "vibration-data-processing-and-analysis" */
export function skillSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface Skill {
  slug: string;
  name: string; // wording from skills.yaml if listed there, otherwise as first written
  group?: string; // skills.yaml group label, e.g. "Tools"
  work: Work[];
  albums: Album[];
}

export const usageCount = (s: Skill) => s.work.length + s.albums.length;

let cache: Promise<Map<string, Skill>> | undefined;

/** Every skill/tool/tag in use, keyed by slug. */
export function getSkills(): Promise<Map<string, Skill>> {
  if (import.meta.env.DEV) cache = undefined; // always fresh while previewing edits
  cache ??= (async () => {
    const skills = new Map<string, Skill>();
    const add = (name: string, group?: string): Skill | undefined => {
      const slug = skillSlug(name);
      if (!slug) return undefined;
      let skill = skills.get(slug);
      if (!skill) {
        skill = { slug, name, group, work: [], albums: [] };
        skills.set(slug, skill);
      }
      return skill;
    };

    for (const group of (await getCollection('skills')).sort(byPosition)) {
      for (const item of group.data.items) add(item, group.data.label);
    }
    for (const item of await getWork()) {
      for (const name of [...item.data.tools, ...item.data.tags]) {
        const skill = add(name);
        if (skill && !skill.work.includes(item)) skill.work.push(item);
      }
    }
    for (const album of await getAlbums()) {
      for (const tag of album.entry.data.tags) {
        const skill = add(tag);
        if (skill && !skill.albums.includes(album)) skill.albums.push(album);
      }
    }
    return skills;
  })();
  return cache;
}

/** Link to a skill's page, or undefined if nothing uses it (so it's shown as plain text). */
export function skillHref(skills: Map<string, Skill>, name: string): string | undefined {
  const skill = skills.get(skillSlug(name));
  return skill && usageCount(skill) > 0 ? url(`/skills/${skill.slug}/`) : undefined;
}
