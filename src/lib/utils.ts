import { getCollection, type CollectionEntry } from 'astro:content';
import { config } from './site';

/** Prefix a site path with the base path (empty for hafizyunus.github.io). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2024-05" → "May 2024"; "present" → "Present" */
export function formatMonth(value: string): string {
  if (value === 'present') return 'Present';
  const [year, month] = value.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function formatRange(start: string, end: string): string {
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

export type Work = CollectionEntry<'work'>;

/** Published work items, sorted by `order` (high first) then most recent. */
export async function getWork(): Promise<Work[]> {
  const items = await getCollection('work', ({ data }) => !data.draft);
  const ids = new Set(config.work.categories.map((c) => c.id));
  for (const item of items) {
    if (!ids.has(item.data.category)) {
      throw new Error(
        `content/work/${item.id}.md: category "${item.data.category}" is not listed in ` +
          `site.yaml → work.categories (${[...ids].join(', ')})`,
      );
    }
  }
  const endKey = (w: Work) => (w.data.end === 'present' ? '9999-99' : w.data.end);
  return items.sort(
    (a, b) =>
      b.data.order - a.data.order ||
      endKey(b).localeCompare(endKey(a)) ||
      b.data.start.localeCompare(a.data.start),
  );
}

/** Work grouped by category, in the order set in site.yaml. */
export async function getWorkByCategory() {
  const items = await getWork();
  return config.work.categories
    .map((category) => ({
      ...category,
      items: items.filter((w) => w.data.category === category.id),
    }))
    .filter((group) => group.items.length > 0);
}
