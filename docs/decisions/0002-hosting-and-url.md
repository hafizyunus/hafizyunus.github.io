# ADR 0002 — Hosting & URL

- **Status:** Accepted (2026-09-26)
- **Date:** 2026-09-26

## Decision
- Host on **GitHub Pages**, deployed by a GitHub Actions workflow on every push to `main`.
- URL: **`https://hafizyunus.github.io`** (Option A, user site).
  - GitHub repo name: `hafizyunus.github.io` under the `hafizyunus` account.
  - `site.url: "https://hafizyunus.github.io"`, `site.basePath: ""`.
- A custom domain (Option C) can be added later without changing the repo.

## URL options considered

| Option | Example URL | GitHub repo name | Notes |
|---|---|---|---|
| A. User site | `https://<username>.github.io` | `<username>.github.io` | Free, no setup. One per account. |
| B. Project site | `https://<username>.github.io/<repo>` | anything | Needs a `base` path in config. Longer URL. |
| C. Custom domain | `https://hafizyunus.com` (e.g.) | usually `<username>.github.io` | ~$10–15/yr. Most professional; portable if you ever change host. Add a `CNAME` file + DNS records. |

Option C can be added on top of A at any time, so choosing A now doesn't lock anything in.

## Keeping the URL changeable
The URL must live in **one place only**: `site.url` (and `site.basePath`, empty for A/C)
in `content/site.yaml`. The build reads it for canonical links, sitemap, RSS and OG tags.
Switching options later = edit that value (+ `CNAME` for a custom domain) and rename the repo if needed.

## Consequences
- Static output only (no server code). Contact form / analytics must use third-party
  static-friendly services — see [features backlog](../features/README.md).
- Local folder name matches the repo name (`hafizyunus.github.io`).
- Every page is a real HTML file (e.g. `/resume/index.html`), so deep links work on Pages without SPA 404 workarounds.
