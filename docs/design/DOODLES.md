# Doodles plan

Hand-drawn mechanical doodles give the site its personality (like tanqinghua.asia),
while everything else stays quiet. Drawn by the owner.

## How the reference does it (for context)
- One small doodle per page, displayed ~150–250px wide, placed in white space (top-right / beside content).
- Transparent PNGs, drawn ~2× display size (e.g. 395×406 for a ~150px spot).
- Moving bits are **separate layers**: the coffee cup and its steam are two images; only the steam animates (a gentle 4s loop).

## Tool: Excalidraw ([excalidraw.com](https://excalidraw.com))
Why: free, in the browser, exports SVG with a transparent background, and its shapes
already look hand-drawn, so a mouse is fine (no tablet needed).

**Settings to use for every doodle (keeps them consistent):**
| Setting | Value |
|---|---|
| Stroke colour | Black (we recolour to `#1A1A1A` in code) |
| Background/fill | None (transparent) or light hatch for shading only |
| Stroke width | Thin, same on all doodles |
| Sloppiness | "Artist" (middle) |
| Font (if any text) | Avoid text in doodles |
| Export | **SVG**, "Background" **off**, "Embed scene" **on** (so they can be re-edited later) |

Tips: combine rectangles, ellipses, lines and arrows first, and use freedraw only for small details.
Tracing is fine: paste a photo or CAD screenshot, draw over it, then delete the photo.

Alternatives: pen and paper → photograph in daylight → Claude cleans it up into a transparent image;
or an iPad/tablet app exporting transparent PNG/SVG.

## Layers (animated parts)
If a part should move, draw it as a **separate group** and export it as its own file:
`<name>.svg` (static base) + `<name>-<part>.svg` (moving part). Keep both on the **same canvas size and position**
(export with the same frame) so they line up.

## Doodle list

### Priority 1: page doodles (one per page, ~200px)
| # | Page | Idea | Animated layer (optional) | File name |
|---|---|---|---|---|
| 1 | Home | Workbench with a laptop, calipers and a wrench | small gear on the bench slowly turning | `home.svg`, `home-gear.svg` |
| 2 | Work (index) | Stack of gears / open toolbox | one gear rotating | `work.svg`, `work-gear.svg` |
| 3 | About | Notebook + cup of chai | steam rising | `about.svg`, `about-steam.svg` |
| 4 | Resume | Clipboard with a technical drawing (dimension lines) | — | `resume.svg` |
| 5 | Contact | Paper plane (or envelope) | plane gently bobbing | `contact.svg` |
| 6 | 404 | Snapped bolt / broken gear | — | `404.svg` |

### Priority 2: work item icons (~64–96px, on cards and at the top of each detail page)
| # | Item | Idea | Animated layer (optional) | File name |
|---|---|---|---|---|
| 7 | Caterpillar, Associate Engineer | Genset with a vibration waveform | waveform wiggle | `cat-associate.svg` |
| 8 | Caterpillar, Intern | Lifting hook + lift eye on a base rail | — | `cat-intern.svg` |
| 9 | Ergon Labs | Finned heatsink with a small fan | fan spinning | `ergon.svg`, `ergon-fan.svg` |
| 10 | NITKRacing | Formula Student car, side view | — | `nitkracing.svg` |
| 11 | Robocon | Robot arm holding a ring | — | `robocon.svg` |
| 12 | USV project | Canoe on waves | waves moving | `usv.svg`, `usv-waves.svg` |
| 13 | Combat robot | Vertical-spinner bot | spinner rotating | `combat-robot.svg`, `combat-robot-spinner.svg` |

**Start with #1–#3.** That's enough to judge the style before doing the rest.
Placeholders will be used until each doodle exists, so nothing blocks the build.

## Where to put them
Save exports to `_inbox/doodles/` (git-ignored). Claude will check sizing/consistency and move
the final versions into the site's assets.

## Status
| # | Status |
|---|---|
| 1–13 | Not started |
