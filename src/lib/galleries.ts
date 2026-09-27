// Finds the photos in each content/galleries/<album>/ folder and checks them before publishing.
import { readdirSync } from 'node:fs';
import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import exifReader from 'exif-reader';
import sharp from 'sharp';

/** Longest edge allowed for an original photo (see docs/features/galleries.md). */
export const MAX_EDGE = 3000;
const FIX = (folder: string) => `Fix it with: npm run prepare-photos -- content/galleries/${folder}`;

// Every photo under content/galleries/*/, keyed by path, e.g. "/content/galleries/robowars/01.jpg"
const files = import.meta.glob<ImageMetadata>(
  '/content/galleries/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' },
);

export interface Photo {
  file: string; // "01-pit.jpg"
  image: ImageMetadata;
  // Size as displayed. Read from the file itself: touching image.width/height would make
  // Astro publish the untouched original next to the resized versions.
  width: number;
  height: number;
  caption?: string;
}

export interface Album {
  id: string; // folder name, used in the URL
  entry: CollectionEntry<'galleries'>;
  photos: Photo[];
  cover?: Photo;
}

const inspected = new Map<string, Promise<{ width: number; height: number }>>();

/** Reads a photo's displayed size, and stops the build if it still has GPS data or is too large. */
function inspectPhoto(folder: string, file: string): Promise<{ width: number; height: number }> {
  const path = `content/galleries/${folder}/${file}`;
  if (!inspected.has(path)) {
    inspected.set(
      path,
      (async () => {
        const meta = await sharp(path).metadata();
        const sideways = (meta.orientation ?? 1) >= 5; // phone photos stored rotated
        const width = sideways ? meta.height : meta.width;
        const height = sideways ? meta.width : meta.height;
        if (Math.max(width, height) > MAX_EDGE) {
          throw new Error(`${path} is ${width}×${height}px (max ${MAX_EDGE}px). ${FIX(folder)}`);
        }
        const { exif } = meta;
        if (exif) {
          let gps: Record<string, unknown> | undefined;
          try {
            gps = exifReader(exif).GPSInfo as Record<string, unknown> | undefined;
          } catch {
            // unreadable EXIF: treat as "no GPS"
          }
          if (gps && Object.keys(gps).length > 0) {
            throw new Error(`${path} contains GPS location data. ${FIX(folder)}`);
          }
        }
        return { width, height };
      })(),
    );
  }
  return inspected.get(path)!;
}

/** Tells the owner about phone formats the site can't use. */
function checkUnsupported(folder: string) {
  const heic = readdirSync(`content/galleries/${folder}`).filter((f) => /\.(heic|heif)$/i.test(f));
  if (heic.length) {
    throw new Error(
      `content/galleries/${folder}: ${heic.join(', ')} can't be used on the web. Export them as JPG first.`,
    );
  }
}

/** Published albums with their photos, newest first. Empty albums only show while developing. */
export async function getAlbums(): Promise<Album[]> {
  const entries = await getCollection('galleries', ({ data }) => !data.draft);
  const albums: Album[] = [];

  for (const entry of entries) {
    checkUnsupported(entry.id);
    const prefix = `/content/galleries/${entry.id}/`;
    const photos: Photo[] = (
      await Promise.all(
        Object.entries(files)
          .filter(([key]) => key.startsWith(prefix))
          .map(async ([key, image]) => {
            const file = key.slice(prefix.length);
            const size = await inspectPhoto(entry.id, file);
            return { file, image, ...size, caption: entry.data.captions[file] };
          }),
      )
    ).sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));

    for (const name of Object.keys(entry.data.captions)) {
      if (!photos.some((p) => p.file === name)) {
        throw new Error(`content/galleries/${entry.id}/index.md: caption for "${name}", but there's no photo with that name.`);
      }
    }
    if (entry.data.cover && !photos.some((p) => p.file === entry.data.cover)) {
      throw new Error(`content/galleries/${entry.id}/index.md: cover "${entry.data.cover}" isn't a photo in that folder.`);
    }

    if (photos.length === 0 && !import.meta.env.DEV) continue;
    const cover = photos.find((p) => p.file === entry.data.cover) ?? photos[0];
    albums.push({ id: entry.id, entry, photos, cover });
  }

  return albums.sort((a, b) => b.entry.data.date.localeCompare(a.entry.data.date));
}

/** All tags in use, most-used first. */
export function tagsOf(albums: Album[]): string[] {
  const counts = new Map<string, number>();
  for (const album of albums) for (const tag of album.entry.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([tag]) => tag);
}
