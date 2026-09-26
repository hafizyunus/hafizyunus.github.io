# Roadmap

> Status: **Proposed** — tick boxes and update status as work lands.
> Guiding rule: every phase keeps content in data files, never in components.

## Phase 0 — Foundations & decisions
- [x] Local git repo + `docs/`
- [x] Hosting: GitHub Pages → [ADR 0002](decisions/0002-hosting-and-url.md)
- [ ] **Choose URL** (user site / project site / custom domain) → then create GitHub repo & push
- [ ] Confirm stack → [ADR 0001](decisions/0001-tech-stack.md)
- [ ] Confirm content model → [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Answer [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md)
- [ ] Gather content: resume, role write-ups, projects, photo, links
- [ ] Visual direction: 2–3 reference sites, colour/typography mood

## Phase 1 — MVP (runs locally, deployable once URL is chosen)
- [ ] Scaffold Astro + TypeScript + Tailwind, lint/format
- [ ] `content/site.yaml` + schemas for all collections
- [ ] Sections: Hero, About, Experience timeline, Projects, Skills, Education, Contact
- [ ] Section order/visibility driven by `site.yaml`
- [ ] Resume download
- [ ] Responsive, light/dark mode
- [ ] SEO: meta tags, Open Graph, sitemap, robots.txt
- [ ] Accessibility pass (semantics, keyboard, contrast)
- [ ] GitHub Actions deploy workflow (ready, activates when repo exists)
- [ ] `docs/CONTENT-GUIDE.md` for non-code editing

**Exit:** Lighthouse ≥ 95 everywhere; all sections driven by content files.

## Phase 2 — More than the resume
- [ ] Detail page per role (context → work → impact → lessons)
- [ ] Project case studies with images/diagrams, repo/demo links
- [ ] Tags linking skills ↔ roles ↔ projects
- [ ] `/now` and `/uses` pages
- [ ] Testimonials, certifications, awards, talks
- [ ] Optimised images (auto-resize, lazy-load)

## Phase 3 — Writing & engagement
- [ ] Blog (Markdown/MDX), tags, reading time, RSS
- [ ] Contact form via static-friendly service (Formspree / Web3Forms)
- [ ] Privacy-friendly analytics (GoatCounter / Umami / Cloudflare)
- [ ] Auto-generated OG images per page

## Phase 4 — Polish & delight
- [ ] Subtle motion & view transitions (respect reduced-motion)
- [ ] ⌘K command palette
- [ ] Interactive career timeline / skills map
- [ ] Print stylesheet — site doubles as a printable resume
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
