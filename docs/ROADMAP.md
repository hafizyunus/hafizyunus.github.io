# Roadmap

> Status: **Phase 0 wrapping up · Phase 1 in progress** (2026-09-27). Tick boxes as work lands.
> Guiding rule: every phase keeps content in data files, never in components.

## Phase 0 — Foundations & decisions
- [x] Local git repo + `docs/`
- [x] Hosting: GitHub Pages → [ADR 0002](decisions/0002-hosting-and-url.md)
- [x] Choose URL → `https://hafizyunus.github.io` ([ADR 0002](decisions/0002-hosting-and-url.md))
- [x] Create GitHub repo [`hafizyunus/hafizyunus.github.io`](https://github.com/hafizyunus/hafizyunus.github.io) & push; Pages set to "GitHub Actions"; live 2026-09-27
- [x] Confirm stack → Astro ([ADR 0001](decisions/0001-tech-stack.md))
- [x] Audience, tone, primary action → [BRIEF.md](BRIEF.md)
- [x] Content model → [ARCHITECTURE.md](ARCHITECTURE.md) (one `work` collection for jobs/teams/projects)
- [ ] Answer remaining [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) (on hold until content is ready)
- [x] Resume placed in `_inbox/`
- [x] Claude drafts content files from resume (`content/work/*.md`, hidden `TODO` prompts)
- [ ] Owner reviews drafts and fills in the TODOs
- [ ] Gather project visuals (CAD renders, photos, drawings, plots)
- [x] Visual direction → [design/DIRECTIVE.md](design/DIRECTIVE.md) (forest green, Newsreader, white)
- [ ] Doodles #1–3 drawn → [design/DOODLES.md](design/DOODLES.md) (placeholders until then; non-blocking)

## Phase 1 — MVP
- [x] Scaffold Astro 7 + TypeScript + Tailwind 4 (`npm run check` for type checks)
- [x] `content/site.yaml` + schemas for all collections
- [x] Pages: Home, Work index, Work detail ×7, About, Resume, Contact, 404
- [x] Menu, socials, work categories and their order driven by `site.yaml`
- [x] `/resume` page built from the same content, print-friendly (PDF button appears once `resumePdf` is set)
- [x] Public resume PDF (no phone number) at `/resume.pdf`, downloadable from `/resume/`
- [x] Responsive: sidebar on desktop, top bar on phones
- [x] Dark mode toggle (light by default, remembered per browser)
- [x] SEO: meta tags, Open Graph, canonical, sitemap, robots.txt
- [x] Open Graph share image, generated from `site.yaml`
- [x] Accessibility pass: Lighthouse 100; dark palette contrast ≥ 5.4:1; visible skip link
- [x] Email obfuscated (`[at]`/`[dot]`, decoded in the browser)
- [x] GitHub Actions deploy workflow (activates once the repo exists)
- [x] [CONTENT-GUIDE.md](CONTENT-GUIDE.md) for non-code editing
- [x] Page doodles #1–6 generated (`npm run doodles`), animated inside the SVGs → [design/DOODLES.md](design/DOODLES.md)
- [x] Gallery page doodle
- [ ] Work-item icons #7–13 (on hold)

**Exit:** Lighthouse ≥ 95 everywhere; all sections driven by content files.
✅ Met 2026-09-27: performance 99, accessibility 100, best practices 100, SEO 100 on Home, Work, a work page, Resume, Contact. Phase 1 is complete apart from the owner's doodles.

## Phase 2 — More than the resume
- [x] Detail page per role: template built in Phase 1; content still to be written
- [ ] Project case studies with images/diagrams, repo/demo links
- [x] Galleries: photo albums with tags, thumbnails + full-screen viewer → [features/galleries.md](features/galleries.md)
- [x] First real album (`robowars`): 4 photos, live
- [x] Skill pages: skills, tools and tags link to every work item and album that uses them (`/skills/`)
- [ ] `/now` page: optional, deferred (the home page's auto "Currently" line covers most of it)
- ~~`/uses` page~~: dropped 2026-09-27 (tools already on resume and work pages)
- [x] Awards & achievements (`content/awards.yaml`, shown on the resume)
- ~~Testimonials~~: dropped 2026-09-27
- [ ] Certifications / talks (only if there are any to list)
- [x] Optimised images (auto-resize to WebP, lazy-load)

## Phase 3 — Writing & engagement
- [ ] Blog (Markdown/MDX), tags, reading time, RSS
- [ ] Contact form via static-friendly service (Formspree / Web3Forms)
- [ ] Privacy-friendly analytics (GoatCounter / Umami / Cloudflare)
- [ ] Auto-generated OG images per page

## Phase 4 — Polish & delight
- [ ] Subtle motion & view transitions (respect reduced-motion)
- [ ] ⌘K command palette
- [ ] Interactive career timeline / skills map
- [x] Print stylesheet (resume page prints cleanly, always in light colours)
- [ ] Theme presets selectable in `site.yaml`

## Phase 5 — Advanced / optional
- [ ] Git-based CMS UI (Keystatic / Decap) for browser editing
- [ ] Generate `resume.pdf` from the same content (single source of truth)
- [ ] Tailored resume views by tag (e.g. backend-focused)
- [ ] "Ask me" AI chat grounded in site content (needs an external API — not pure Pages)
- [ ] i18n
- [ ] CI checks: link checker, Lighthouse CI, schema validation on PRs

See [features backlog](features/README.md) for the full idea list.

## Change log
| Date | Change |
|---|---|
| 2026-09-26 | Initial roadmap; GitHub Pages chosen, URL pending |
| 2026-09-26 | Astro accepted; URL set to hafizyunus.github.io; `/resume` page added to Phase 1 |
| 2026-09-27 | Design directive accepted; Astro project scaffolded; 7 work pages drafted from resume |
| 2026-09-27 | GitHub repo created; first deploy live at https://hafizyunus.github.io (TODOs/doodles deferred) |
| 2026-09-27 | Phase 1 exit met: resume PDF, dark mode toggle, email obfuscation, share image, Lighthouse 99–100 |
