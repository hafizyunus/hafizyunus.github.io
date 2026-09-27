# Feature: Galleries (photo albums)

- **Status:** Implemented (2026-09-27). How to use it: [CONTENT-GUIDE.md → Galleries](../CONTENT-GUIDE.md#galleries-contentgalleriesalbum)
- **Phase:** 2
- **Why:** lots of engineering work is best shown as photos: competitions, builds, test days,
  projects that don't need a full write-up. A gallery is a titled album of photos with optional captions.

## What visitors see
| URL | Page |
|---|---|
| `/gallery/` | Grid of albums: cover photo, title, date, photo count, tags; **tag filter buttons** (`?tag=` links work too) |
| `/gallery/<album>/` | Title, date, short intro, then all photos in a grid. Click → full-screen viewer |

- **Grid layout:** masonry-style columns that show each photo **uncropped** (important for
  engineering photos where the edges matter). 2 columns on phones, 3 on desktop.
- **Viewer (lightbox):** full screen, captions, ← → keys, swipe on phones, **pinch/scroll zoom**,
  Esc to close; each photo has its own link (`#photo-3`) so a single photo can be shared.
  Uses [PhotoSwipe](https://photoswipe.com), a small, well-tested open-source viewer (~20 KB).
- **No automatic links to work pages.** The owner links albums by hand in the write-ups
  (`[photos](/gallery/robowars/)`), so the text and photos sit where they make sense.
- Menu gets a `gallery` item (editable in `site.yaml → nav`).

## Adding an album (no code)
```
content/galleries/
└─ techtatva-2023/
   ├─ index.md        ← title, date, captions (optional)
   ├─ 01-pit.jpg
   ├─ 02-arena.jpg
   └─ 03-podium.jpg
```
```markdown
---
title: TechTatva 2023
date: 2023-10
summary: Second place with our 15 kg vertical spinner at MIT Manipal.
tags: [combat robotics, competition]   # free-form; become filter buttons on /gallery/
cover: 03-podium.jpg       # optional: defaults to the first photo
captions:                  # optional: any photo can have one
  01-pit.jpg: Final checks in the pits
  03-podium.jpg: Second place
---
Optional short intro text in Markdown.
```
- **Photos are picked up automatically.** Every image in the folder is included, ordered by file
  name (so prefix `01-`, `02-` … to control order). No need to list them.
- Formats: JPG, PNG, WebP, AVIF. Phone photos in HEIC must be exported as JPG first.
- Hide an album: `draft: true`. Delete a photo: delete the file.

## How image resolution is handled
Nothing is served at full camera resolution. At build time each photo is converted into a few
**WebP** sizes, and the browser downloads only the size it needs:

| Where | Sizes generated | Loaded when | Typical weight |
|---|---|---|---|
| Album grid (thumbnail) | 400 px and 800 px wide | lazily, as you scroll to it | ~30–80 KB |
| Album cover on `/gallery/` | 600 and 1200 px wide | lazily | ~50–120 KB |
| Full-screen viewer | 1600 px and 2560 px on the long edge | **only when that photo is opened** (plus the next/previous one, preloaded) | ~200–600 KB |

- The browser picks between the two sizes in each row by screen size and pixel density
  (e.g. a retina laptop gets the 800 px thumbnail, a phone gets 400 px).
- 2560 px is sharp on a 4K screen when zoomed; beyond that, file size grows with no visible gain.
- Every photo has its width/height set, so the grid doesn't jump while loading.
- **Metadata is stripped** from every generated image (camera info and **GPS location**), and
  photos are rotated correctly based on how the phone was held.

### The original files
- The site **never links to the originals**; visitors only get the resized versions above.
- But the **repo is public**, so anyone browsing GitHub can download the files in `content/galleries/`,
  including any GPS location inside them. Phone photos usually contain it.
- So originals should be **cleaned before committing**. A helper does it:
  ```bash
  npm run prepare-photos -- content/galleries/techtatva-2023
  ```
  It shrinks anything larger than 3000 px on the long edge, re-saves as high-quality JPG,
  **removes all metadata (incl. GPS)**, and fixes rotation, in place. A 6 MB phone photo becomes ~1 MB.
- The build will **refuse** photos that still contain GPS data or are over 3000 px, with a message
  naming the file and the command to fix it, so nothing slips through.
- Implementation note: photo sizes are read with sharp, **not** from Astro's `image.width`.
  Touching any property of an imported image makes Astro publish the untouched original next to
  the resized copies (see `src/lib/galleries.ts`).

### Size limits to keep in mind
- GitHub Pages: site up to ~1 GB; repo recommended under ~1 GB.
- At ~1 MB per cleaned original, that's several hundred photos with plenty of headroom.
- Build time grows with photo count (each photo → ~5 sizes). ~200 photos adds roughly a minute
  to the first build; GitHub caches nothing between builds, so every deploy pays it.

## Build plan (done)
1. `galleries` content collection + schema (title, date, summary, tags, cover, captions, draft).
2. Auto-discover photos per album folder at build time.
3. `/gallery/` index and `/gallery/<album>/` pages; masonry grid with responsive thumbnails.
4. PhotoSwipe viewer: captions, zoom, deep links, keyboard/swipe, reduced-motion aware.
5. Tag filter on `/gallery/`; `gallery` in the menu.
6. `npm run prepare-photos` helper + build-time checks (GPS, oversize).
7. Docs: content guide section; sample album `robowars` to copy.
8. Verify: Lighthouse 98–100 on `/gallery/` and an album page; phone layout; build refuses GPS/oversize photos.

## Decisions (2026-09-27)
- **Tags instead of preset album types.** Any tags the owner writes; the filter is built from them.
- **No photo strip on work pages;** links are added by hand in the text.
- **Empty albums** are shown only in `npm run dev`, never on the live site.

