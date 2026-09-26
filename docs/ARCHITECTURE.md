# Architecture & content model

> Status: **Proposed**. The core rule: **content lives in `content/`, code lives in `src/`.**
> Editing the site should almost never require opening `src/`.

## Planned folder layout
```
/
├─ content/                  ← everything you edit
│  ├─ site.yaml              ← global settings (see below)
│  ├─ about.md               ← long-form bio
│  ├─ experience/            ← one file per role
│  │  └─ 2023-acme-senior-engineer.md
│  ├─ projects/              ← one file per project / case study
│  ├─ education.yaml
│  ├─ skills.yaml
│  ├─ certifications.yaml
│  ├─ testimonials.yaml
│  ├─ now.md                 ← /now page (Phase 2)
│  └─ posts/                 ← blog (Phase 3)
├─ public/                   ← files served as-is (resume.pdf, favicon, CNAME)
├─ src/
│  ├─ assets/images/         ← images referenced by content (auto-optimised)
│  ├─ components/            ← one component per section
│  ├─ layouts/
│  ├─ pages/
│  └─ content.config.ts      ← schemas that validate everything in content/
├─ docs/                     ← plans, decisions, guides (this folder)
└─ .github/workflows/        ← deploy pipeline
```

## `site.yaml` — the control panel
```yaml
site:
  url: "https://hafizyunus.github.io"   # see ADR 0002
  basePath: ""       # only needed for project-site URLs
  title: "Hafiz Yunus"
  description: "..."
  language: en

person:
  name: "Hafiz Yunus"
  headline: "..."
  location: "..."
  avatar: ./src/assets/images/avatar.jpg
  resume: /resume.pdf          # set to "" to hide the download button

socials:                       # add/remove freely; order = display order
  - { label: GitHub,   url: "https://github.com/...", icon: github }
  - { label: LinkedIn, url: "https://linkedin.com/in/...", icon: linkedin }
  - { label: Email,    url: "mailto:...", icon: mail }

sections:                      # reorder or set enabled:false to hide
  - { id: about,          enabled: true }
  - { id: experience,     enabled: true }
  - { id: projects,       enabled: true,  limit: 6 }
  - { id: skills,         enabled: true }
  - { id: education,      enabled: true }
  - { id: certifications, enabled: false }
  - { id: testimonials,   enabled: false }
  - { id: contact,        enabled: true }

theme:
  preset: default               # default | minimal | ...
  accent: "#4f46e5"
  defaultMode: system           # light | dark | system
```

## Example content entry — `content/experience/2023-acme-senior-engineer.md`
```markdown
---
company: Acme Corp
role: Senior Software Engineer
location: Remote
start: 2023-03
end: present             # or a date
logo: ../../src/assets/images/logos/acme.png
summary: One-line summary shown on the timeline card.
highlights:              # shown on the card
  - Cut API latency by 40% by ...
tags: [typescript, aws, leadership]
featured: true
draft: false             # true = hidden from the live site
---

Long-form write-up shown on the role's detail page: context, challenges,
what you built, impact, lessons learned. Plain Markdown.
```

## How editing works
| I want to… | Do this |
|---|---|
| Add a job/project | Copy an existing file in `content/experience/` or `content/projects/`, edit it |
| Remove one | Delete the file, or set `draft: true` to hide it |
| Reorder/hide a section | Edit `sections:` in `site.yaml` |
| Change links / name / theme | Edit `site.yaml` |
| Update resume | Replace `public/resume.pdf` |

Every file is checked against its schema at build time; mistakes produce a
readable error naming the file and field. A full `CONTENT-GUIDE.md` will be written in Phase 1.
