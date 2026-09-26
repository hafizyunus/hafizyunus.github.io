# ADR 0001 — Tech stack

- **Status:** Proposed
- **Date:** 2026-09-26

## Context
- Personal portfolio going deeper than the resume.
- Must be **content-driven**: add/edit/remove content without touching components.
- Hosted on **GitHub Pages** → static output only (see [ADR 0002](0002-hosting-and-url.md)).
- Should be fast, accessible, SEO-friendly, cheap (free) to run.

## Decision (proposed)
| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro** | Built for content sites; ships ~zero JS by default; first-class static output for GitHub Pages. |
| Content | **Astro Content Collections** (Markdown/MDX + YAML) | Content is plain files; **Zod schemas** validate every field, so a typo fails the build with a clear message instead of silently breaking a page. |
| Language | TypeScript | Type-safe access to content in templates. |
| Styling | Tailwind CSS + CSS variables for theme tokens | Theme colours/fonts switchable from config. |
| Interactivity | Astro islands (small, only where needed) | Keeps pages fast. |
| Deploy | GitHub Actions → GitHub Pages | Official `withastro/action`. |
| Package manager | npm | Simplest; already on most machines. |

## Alternatives considered
- **Next.js (static export)** — heavier, more app-oriented; overkill for a content site on Pages.
- **Hugo / Jekyll** — very fast/simple, but templating is less flexible and less pleasant for custom UI.
- **Plain HTML/CSS** — no content/code separation; editing means editing markup.

## Consequences
- Requires Node.js (LTS) locally.
- A git-based CMS (Keystatic/Decap) can be layered on later without changing the content files.
