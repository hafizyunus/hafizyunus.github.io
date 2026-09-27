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
| Name, intro, email, menu, social links | [`content/site.yaml`](../content/site.yaml) |
| A job, team or project | a file in [`content/work/`](../content/work) |
| About page | [`content/pages/about.md`](../content/pages/about.md) |
| Education | [`content/education.yaml`](../content/education.yaml) |
| Skills | [`content/skills.yaml`](../content/skills.yaml) |
| Resume PDF | put the file in `public/` (e.g. `public/resume.pdf`) and set `person.resumePdf: /resume.pdf` |
| Doodles | `src/assets/doodles/<name>.svg` (see [design/DOODLES.md](design/DOODLES.md)) |

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
| `tools` | | Software and methods |
| `tags` | | Keywords (used for filtering later) |
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

## YAML gotchas
- If a value contains a colon followed by a space (`: `), wrap it in quotes:
  `description: "Engineer: vibration and FEA"`
- Indentation is spaces, never tabs.
- Lists use `- ` at the start of each line.
