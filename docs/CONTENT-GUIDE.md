# Content guide

How to change what's on the site **without touching code**. Everything you edit lives in
[`content/`](../content).

## Preview while you edit
```bash
npm install      # first time only
npm run dev      # then open http://localhost:4321; the page refreshes as you save
```
Before committing, run `npm run build`. If a content file has a mistake, the build stops and
names the file and field.

## Where everything lives
| I want to change… | Edit |
|---|---|
| Name, intro, menu, social links (email: see below) | [`content/site.yaml`](../content/site.yaml) |
| A job, team or project | a file in [`content/work/`](../content/work) |
| A photo album | a folder in [`content/galleries/`](../content/galleries) (see [Galleries](#galleries-contentgalleriesalbum)) |
| About page | [`content/pages/about.md`](../content/pages/about.md) |
| Education | [`content/education.yaml`](../content/education.yaml) |
| Skills | [`content/skills.yaml`](../content/skills.yaml) (see [Skills & tags](#skills--tags)) |
| Awards & achievements | [`content/awards.yaml`](../content/awards.yaml) (see [Awards](#awards-contentawardsyaml)) |
| Resume PDF | **replace `public/resume.pdf`** with the new file, keeping the same name (the URL stays the same). Visitors download it as `Hafiz_Yunus_Kalathil_Resume.pdf`. Keep versions with your phone number in `_inbox/`, never in `public/` |
| Doodles | `src/assets/doodles/<name>.svg` (see [design/DOODLES.md](design/DOODLES.md)) |

## Things that happen automatically
- **Email address** is never written plainly in this repo or the site's HTML. `site.yaml` stores
  it encoded (`person.emailEncoded`); the site shows `name [at] gmail [dot] com`, which becomes a
  clickable link in the visitor's browser. To change it:
  ```bash
  npm run encode-email -- new.address@example.com
  ```
  and paste the printed value into `site.yaml`. In `socials`, `url: email` links to it.
- **Share image** (`/og.png`, shown when the link is posted on LinkedIn/WhatsApp) is generated
  from `person.name` and `site.description` in `site.yaml`.
- **Dark mode**: visitors can switch with the small moon/sun button; light is the default.

## Work items (`content/work/*.md`)
Each file = one card on the Work page + one detail page at `/work/<file-name>/`.

- **Add:** copy an existing file, rename it (the file name becomes the URL; use lowercase-with-dashes), edit it.
- **Hide:** set `draft: true`.
- **Remove:** delete the file.
- **Show on the home page:** `featured: true`.
- **Reorder within a group:** higher `order` comes first.

The part between the `---` lines is the card/summary data:

| Field | Required | Notes |
|---|---|---|
| `title` | ✓ | Headline, e.g. "15 kg vertical-spinner combat robot" |
| `org` | ✓ | Company / team |
| `role` | ✓ | Your role |
| `category` | ✓ | `professional`, `activity` or `project` (set in `site.yaml → work.categories`) |
| `start` / `end` | ✓ | `YYYY-MM`; `end` can be `present` |
| `summary` | ✓ | 1–2 sentences for cards |
| `location` | | |
| `highlights` | | Resume bullets, also shown in the "at a glance" box |
| `metrics` | | `- { value: "15 kg", label: robot mass }`: big numbers in the "at a glance" box |
| `tools` | | Software and methods, e.g. `[Ansys Mechanical, MATLAB]` |
| `tags` | | Skills and topics, e.g. `[Structural FEA, Motorsport]` |

`tools` and `tags` become links to [skill pages](#skills--tags).
| `doodle` | | Doodle file name without `.svg` |
| `cover`, `coverAlt` | | Top image, e.g. `cover: ./images/combat-robot/hero.jpg` |

Below the second `---` is the in-depth write-up in Markdown:

```markdown
## A heading

A paragraph with **bold** and a [link](https://example.com).

![Alt text describing the image](./images/combat-robot/cad.png)
*A caption goes on the line right after the image, in italics.*

- a bullet
- another bullet
```

`<!-- TODO ... -->` notes are hidden comments: they never appear on the site. Delete them as you fill each section in.

### Images
Put images in `content/work/images/<item-name>/` and link them relatively as above. They're
resized and compressed automatically. JPG for photos, PNG for screenshots/plots. Keep originals under ~5 MB.

## Skills & tags
Every skill, tool and tag gets a page at `/skills/<name>/` listing the work and photo albums
that use it. All skills are listed at `/skills/` (linked from the resume's Skills heading).

**They link up by name.** The same words in any of these places count as one skill:
- `content/skills.yaml` (your resume's skill list)
- a work file's `tools` or `tags`
- a photo album's `tags`

Matching ignores capitals and punctuation, so `Ansys Mechanical`, `ANSYS mechanical` and
`ansys-mechanical` are the same. But different words are different skills: `FEA` and
`Structural FEA` are two separate pages, so **copy the exact wording from `skills.yaml`** when
you tag a work item.

- A skill in `skills.yaml` that no work uses yet is shown faded on `/skills/` (not a link).
  Add it to the `tools`/`tags` of the work where you used it, and it becomes a link.
- The name shown is the `skills.yaml` wording if the skill is there, otherwise the first spelling found.
- To put **Skills** in the menu, add `- { label: skills, href: /skills/ }` to `nav` in `site.yaml`.

## Awards (`content/awards.yaml`)
Shown at the end of the resume page, in the order written.

```yaml
- id: pi-ev-2024                 # unique, lowercase-with-dashes
  title: Second place, Pi-EV 2024
  org: Formula Student concept challenge   # optional
  date: "2024"                   # "YYYY" or "YYYY-MM", in quotes
  note: EV powertrain design, with NITKRacing.   # optional, one line
  work: nitkracing               # optional: links to content/work/nitkracing.md
```
If `work` doesn't match a file in `content/work/`, the build stops and says so.

## Galleries (`content/galleries/<album>/`)
Photo albums for competitions, builds and projects without a write-up. Each **folder** is one
album at `/gallery/<folder-name>/`, listed on `/gallery/`.

```
content/galleries/
└─ robowars/                 ← folder name = URL (lowercase-with-dashes)
   ├─ index.md               ← album settings
   ├─ 01-pits.jpg            ← photos: added automatically, in file-name order
   ├─ 02-arena.jpg
   └─ 03-podium.jpg
```

### Add an album
1. Copy the `robowars` folder, rename it, and edit its `index.md`.
2. Put your photos in the folder. Name them `01-…`, `02-…` to control the order.
3. **Clean the photos** (required, see below):
   ```bash
   npm run prepare-photos -- content/galleries/<album>
   ```
4. Preview with `npm run dev`, then commit and push.

### `index.md` fields
| Field | Required | Notes |
|---|---|---|
| `title` | ✓ | Album name |
| `date` | ✓ | `YYYY-MM`; albums are listed newest first |
| `summary` | | One line shown on the album card and under the title |
| `tags` | | Any words you like, e.g. `[combat robotics, competition]`. Each tag becomes a filter button on `/gallery/` |
| `cover` | | File name of the cover photo; defaults to the first photo |
| `captions` | | Per-photo captions by file name (shown in the full-screen viewer) |
| `draft` | | `true` hides the album |

```yaml
captions:
  01-pits.jpg: Final checks in the pits
  03-podium.jpg: "Second place: TechTatva 2023"   # quotes because of the ": "
```

Anything below the second `---` is optional intro text (Markdown), shown above the photos.

### Photos
- **Formats:** JPG, PNG, WebP, AVIF. iPhone **HEIC** photos must be exported as JPG first (the build tells you if one sneaks in).
- **Why `prepare-photos`:** this repo is public, so the original files can be downloaded from GitHub.
  Phone photos usually contain the **GPS location** where they were taken. The command, run in place:
  - removes all metadata (GPS, camera details),
  - turns sideways phone photos upright,
  - shrinks anything over 3000 px on the long edge (a 6 MB phone photo → ~1 MB).

  Photos that are already clean are left untouched, so it's safe to run again after adding more.
- **Safety net:** the build **stops** if a photo still has GPS data or is over 3000 px, and prints the command to fix it.
- **What visitors download:** never your originals. The site serves resized WebP copies: small
  thumbnails (400/800 px) in the grid, and a sharp full-screen version (1600/2560 px) only when a photo is opened.
- An album with no photos yet shows a placeholder while you preview locally, and is left off the live site until it has photos.

### Link to an album from a work page
Write a normal Markdown link in the work file's text:
```markdown
[See the photos from the competition](/gallery/robowars/)
```
A single photo can be linked too: `/gallery/robowars/#photo-3` opens straight to the third photo.
To link to a filtered view of all albums with a tag, use `/gallery/?tag=competition`.

## YAML gotchas
- If a value contains a colon followed by a space (`: `), wrap it in quotes:
  `description: "Engineer: vibration and FEA"`
- Indentation is spaces, never tabs.
- Lists use `- ` at the start of each line.
