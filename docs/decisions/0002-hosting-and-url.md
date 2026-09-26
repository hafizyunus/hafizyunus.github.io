# ADR 0002 — Hosting & URL

- **Status:** Hosting accepted · URL **undecided**
- **Date:** 2026-09-26

## Decision
- Host on **GitHub Pages**, deployed by a GitHub Actions workflow on every push to `main`.
- Work **locally only** until the URL is chosen; the GitHub repo is created afterwards.

## URL options (pick one)

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
- Local folder is currently named `hafizyunus.github.io`; rename freely if the choice differs — git doesn't depend on it.
