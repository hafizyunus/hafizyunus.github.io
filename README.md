# Hafiz Yunus: Personal Website

Portfolio of a mechanical engineer: experience, projects, and more depth than fits on a resume.
Will be live at **https://hafizyunus.github.io** (GitHub Pages). Built with [Astro](https://astro.build).

## Editing content
Everything you normally change is in [`content/`](content/). No code needed.
See the **[content guide](docs/CONTENT-GUIDE.md)**.

## Running locally
Requires Node.js 22+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/ (also validates all content)
npm run check      # type-check templates
```

## Deploying
Pushing to `main` builds and publishes via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
One-time: in the GitHub repo, **Settings → Pages → Source: GitHub Actions**.

## Docs
Plans, decisions and design: [`docs/`](docs/README.md). Roadmap: [`docs/ROADMAP.md`](docs/ROADMAP.md).
