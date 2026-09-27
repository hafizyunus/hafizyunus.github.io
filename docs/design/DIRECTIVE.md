# Design directive

- **Status:** Accepted (2026-09-27)
- **One-liner:** *A quiet white notebook with a left-hand index: serif headings, clean text-and-image pages, and dense only where you're browsing work.*

## Where each reference applies
The three references mostly control **different layers**, so they combine rather than conflict.

| Layer | Borrow from | What exactly |
|---|---|---|
| **Shell** (every page) | [tanqinghua.asia](https://www.tanqinghua.asia/) | White page, fixed left sidebar nav, generous whitespace, playful active-link indicator, near-monochrome. |
| **Typography** | [maggieappleton.com](https://maggieappleton.com) | Elegant serif display headings + clean humanist sans body; muted warm-grey text. |
| **Index pages** (Work, Experience) | [maggieappleton.com](https://maggieappleton.com) | Denser grid of cards: title, one-line summary, small thumbnail, tags, varied but aligned. |
| **Detail pages** (each resume item) | [macwright.com](https://macwright.com/2018/01/05/breathing-box) | Single narrow column (~680px), text + full-column images, simple captions, nothing else. |

Nice coincidence: macwright.com *also* uses a left sidebar + one narrow column, so the shell and
the detail pages already agree.

### The one real tension, and how it's resolved
Maggie's **density** vs tanqinghua's **sparseness**.
→ **Sparse by default** (home, about, contact, detail pages). **Dense only on index pages**
where people browse many items. Density comes from tighter card grids, not from more colour or decoration.

## Rules
1. **White first.** Background white; colour is used only for the accent and images.
2. **One accent colour**, used for links, active nav and key-metric highlights. Nothing else is coloured.
3. **Images carry the colour.** CAD renders, photos and plots are the visual interest; UI stays neutral.
4. **Two typefaces max** (+ monospace for numbers/units in metric callouts).
5. **One reading column** on detail pages; images may break out wider, never text.
6. **No decoration without meaning.** No gradients, shadows, or animation unless it communicates something.
7. **Personality through small touches**: the active-link squiggle, optional hand-drawn mechanical doodles per section, caption voice.
8. **Mobile**: sidebar collapses to a top bar with a menu; everything is single column.

## Draft tokens
| Token | Value (draft) | Notes |
|---|---|---|
| Background | `#FFFFFF` ✅ | Same as tanqinghua.asia (it's pure white; the softness comes from `#1A1A1A` text + light doodles) |
| Text | `#1A1A1A` ✅ | Same as tanqinghua.asia |
| Muted text | `#6F6C68` | Dates, captions, meta |
| Rule/border | `#E8E6E1` | Hairlines only |
| Accent | **Forest green `#2F5D50`** ✅ | Links, active nav, key metrics |
| Heading font | **Newsreader** ✅ (Google Fonts, free) | Closest free match to Maggie's *Canela Deck* |
| Body font | **Inter** (default) | Same as tanqinghua.asia; crisp at small sizes. Lato (Maggie) is the alternative |
| Mono | **JetBrains Mono** / **IBM Plex Mono** | Metrics, units, specs (e.g. `15 kg`, `FoS 2.5`) |
| Body size | 17–18px, line-height 1.6 | |
| Reading width | ~680px | |
| Sidebar width | ~200px, fixed on ≥1024px screens | |

Accent options considered: ink blue `#1F4E79`, oxide red `#B4432F`, **forest green `#2F5D50` (chosen)**, signal orange `#D9731A`.

## Page map
| Page | Pattern |
|---|---|
| Home | Short intro (2–3 lines, serif) + featured work grid + current role line |
| Work (index) | Dense card grid: professional, activities, projects; filter by tag |
| Work detail (×7) | macwright-style column: summary box (role, dates, tools, key metrics) → story with images → outcome |
| About | Sparse long-form text, maybe one doodle |
| Resume | Clean web resume + PDF download, print-friendly |
| Contact | Email + LinkedIn, one sentence |

## Decisions (2026-09-27)
- [x] Accent colour → forest green `#2F5D50`
- [x] Heading font → Newsreader
- [x] Background → `#FFFFFF`, text `#1A1A1A` (matching tanqinghua.asia)
- [x] Hand-drawn doodles → **yes**, drawn by owner → plan in [DOODLES.md](DOODLES.md)
