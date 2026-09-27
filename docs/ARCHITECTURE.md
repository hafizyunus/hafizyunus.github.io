# Architecture & content model

- **Status:** Implemented (2026-09-27)
- **Core rule:** content lives in `content/`, code lives in `src/`. Editing the site should
  almost never require opening `src/`. How-to: [CONTENT-GUIDE.md](CONTENT-GUIDE.md).

## Folder layout
```
/
├─ content/                    ← everything you edit
│  ├─ site.yaml                ← name, intro, email, menu, socials, work categories, URL
│  ├─ work/                    ← one Markdown file per resume item → /work/<file-name>/
│  │  └─ images/<item>/        ← images for write-ups (auto-optimised)
│  ├─ pages/about.md           ← About page
│  ├─ education.yaml
│  └─ skills.yaml
├─ public/                     ← served as-is (favicon, robots.txt, resume PDF, CNAME later)
├─ src/
│  ├─ assets/doodles/          ← hand-drawn SVG doodles
│  ├─ components/              ← Doodle, WorkCard, Email, SocialLink, ThemeToggle
│  ├─ layouts/Base.astro       ← page shell: sidebar/top bar, SEO tags
│  ├─ lib/site.ts              ← loads + validates site.yaml
│  ├─ lib/utils.ts             ← dates, URLs, sorted/grouped work
│  ├─ pages/                   ← routes (see below)
│  ├─ styles/global.css        ← design tokens + prose styles (see design/DIRECTIVE.md)
│  └─ content.config.ts        ← schemas that validate content/
├─ .github/workflows/deploy.yml← build + publish to GitHub Pages on push to main
└─ docs/
```

## Routes
| URL | Source | Built from |
|---|---|---|
| `/` | `pages/index.astro` | `site.yaml` intro + `featured: true` work items |
| `/work/` | `pages/work/index.astro` | all work items grouped by `site.yaml → work.categories` |
| `/work/<slug>/` | `pages/work/[slug].astro` | one work file: header, "at a glance" box, write-up, prev/next |
| `/about/` | `pages/about.astro` | `content/pages/about.md` |
| `/resume/` | `pages/resume.astro` | education + skills + all work highlights; print-friendly |
| `/contact/` | `pages/contact.astro` | `site.yaml` email, socials, contact message |
| `/og.png` | `pages/og.png.ts` | share image rendered at build time (satori + resvg) from `site.yaml` |
| `/resume.pdf` | `public/resume.pdf` | copied as-is |
| 404 | `pages/404.astro` | — |

## Design decisions in the model
- **One `work` collection** for jobs, teams and projects (instead of separate experience/projects):
  they share the same shape, and `category` groups them. Categories are defined in `site.yaml`,
  and an unknown category fails the build.
- **Resume and site share one source.** The `/resume/` page reads the same `highlights` as the
  detail pages, so updating a work file updates both.
- **Validation everywhere.** `site.yaml` is checked by `src/lib/site.ts`; collections by
  `src/content.config.ts`. Errors name the file and field.
- **YAML list order is preserved** (education, skills) via a `position` added at load time.
- **URL in one place:** `site.url` / `site.basePath` in `site.yaml` feed `astro.config.mjs`
  (canonical links, sitemap).
- **Email obfuscation:** the address is stored encoded (reversed + base64) in `site.yaml` (`npm run encode-email`) and written that way into pages; a tiny script builds the `mailto:` link in the browser. Visible text uses `[at]`/`[dot]`.
- **Dark mode:** `<html data-theme="dark">` overrides the colour tokens in `global.css`; an inline script in `<head>` applies the saved choice before paint. Light is the default and printing is always light.
- **Doodles are optional.** Missing doodles show a dashed placeholder in `npm run dev` and
  nothing on the live site.
