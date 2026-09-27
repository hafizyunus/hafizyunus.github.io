// Generates the hand-drawn page doodles in src/assets/doodles/ (see docs/design/DOODLES.md).
// Drawn with rough.js (the library behind Excalidraw's sketchy look). Moving parts are animated
// with CSS inside each SVG, and stop for visitors who prefer reduced motion.
//
// Usage: npm run doodles        (re-run after editing; output is the same every time)
// Replacing one with your own drawing: just overwrite the .svg (and remove it from DOODLES below).
import { mkdirSync, writeFileSync } from 'node:fs';
import rough from 'roughjs';

const OUT = 'src/assets/doodles';
const W = 400;
const H = 320;
const INK = '#1a1a1a';
const gen = rough.generator();

// ── drawing helpers ───────────────────────────────────────────────────────────
let seed = 1;
const style = (o = {}) => ({ stroke: INK, strokeWidth: 2.4, roughness: 1.1, bowing: 0.8, seed: seed++, ...o });
const shade = (o = {}) => style({ fill: INK, fillStyle: 'hachure', hachureGap: 7, fillWeight: 1, hachureAngle: -41, ...o });

// Coordinates rounded to 1 decimal: invisible at doodle size, and halves the file size.
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));

const svgOf = (drawable) => {
  // rough.js doesn't carry dashes into SVG output, so add them here
  const dash = drawable.options.strokeLineDash;
  const dashAttr = dash ? ` stroke-dasharray="${dash.join(' ')}"` : '';
  return gen
    .toPaths(drawable)
    .map(
      (p) =>
        `<path d="${round(p.d)}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill ?? 'none'}" stroke-linecap="round" stroke-linejoin="round"${dashAttr}/>`,
    )
    .join('');
};

const line = (x1, y1, x2, y2, o) => svgOf(gen.line(x1, y1, x2, y2, style(o)));
const rect = (x, y, w, h, o) => svgOf(gen.rectangle(x, y, w, h, style(o)));
const ellipse = (cx, cy, w, h, o) => svgOf(gen.ellipse(cx, cy, w, h, style(o)));
const circle = (cx, cy, d, o) => svgOf(gen.circle(cx, cy, d, style(o)));
const poly = (pts, o) => svgOf(gen.polygon(pts, style(o)));
const polyShaded = (pts, o) => svgOf(gen.polygon(pts, shade(o)));
const path = (pts, o) => svgOf(gen.linearPath(pts, style(o)));
const curve = (pts, o) => svgOf(gen.curve(pts, style(o)));
const arc = (cx, cy, w, h, start, stop, o) => svgOf(gen.arc(cx, cy, w, h, start, stop, false, style(o)));

/** Spur gear outline as a polygon: `teeth` trapezoid teeth between rRoot and rTip. */
function gear(cx, cy, rTip, rRoot, teeth, { phase = 0, hole = 0.28 } = {}) {
  const pitch = (2 * Math.PI) / teeth;
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const a = phase + i * pitch;
    for (const [r, da] of [
      [rRoot, -0.3],
      [rTip, -0.17],
      [rTip, 0.17],
      [rRoot, 0.3],
    ]) {
      pts.push([cx + r * Math.cos(a + da * pitch), cy + r * Math.sin(a + da * pitch)]);
    }
  }
  return poly(pts, { roughness: 0.55, bowing: 0.3 }) + circle(cx, cy, rTip * 2 * hole, { roughness: 0.6 });
}

/** A rotating group, spinning about (cx, cy). */
const spinning = (cx, cy, seconds, reverse, content) =>
  `<g class="spin" style="transform-origin:${cx}px ${cy}px;animation-duration:${seconds}s;${reverse ? 'animation-direction:reverse;' : ''}">${content}</g>`;

const ANIMATION_CSS = `
  .spin{transform-box:view-box;animation:spin linear infinite}
  .steam{animation:steam 3.6s ease-in-out infinite}
  .bob{animation:bob 4s ease-in-out infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes steam{0%{transform:translateY(6px);opacity:0}35%{opacity:1}100%{transform:translateY(-14px);opacity:0}}
  @keyframes bob{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(4px,-7px) rotate(-2deg)}}
  @media (prefers-reduced-motion:reduce){.spin,.steam,.bob{animation:none}.steam{opacity:.8}}`;

const svg = (title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" role="img" aria-label="${title}"><style>${ANIMATION_CSS}</style>${body}</svg>\n`;

// ── doodles ───────────────────────────────────────────────────────────────────
const DOODLES = {
  // Workbench with a laptop (vibration plot on screen), calipers, a wrench on the wall, a turning gear
  home: () => {
    seed = 100;
    const bench =
      rect(28, 214, 344, 16) +
      line(50, 230, 50, 306) +
      line(64, 230, 64, 306) +
      line(336, 230, 336, 306) +
      line(350, 230, 350, 306) +
      line(64, 282, 336, 282);
    const laptop =
      poly([[92, 212], [212, 212], [204, 200], [100, 200]]) +
      rect(104, 118, 96, 80) +
      rect(112, 126, 80, 62, { roughness: 0.8 }) +
      curve(
        Array.from({ length: 15 }, (_, i) => [118 + i * 5, 158 - Math.sin(i * 1.3) * (14 - i * 0.7)]),
        { strokeWidth: 1.8, roughness: 0.6 },
      );
    const calipers =
      rect(222, 202, 104, 8) +
      poly([[224, 202], [224, 174], [232, 174], [238, 202]]) +
      poly([[262, 202], [262, 178], [270, 178], [276, 202]]) +
      rect(258, 198, 26, 14, { roughness: 0.8 }) +
      Array.from({ length: 8 }, (_, i) => line(290 + i * 4.5, 202, 290 + i * 4.5, 206, { strokeWidth: 1.2, roughness: 0.4 })).join('');
    const wrench =
      line(40, 40, 70, 40, { strokeWidth: 1.6 }) +
      line(55, 40, 55, 50, { strokeWidth: 1.6 }) +
      arc(55, 66, 36, 36, Math.PI * 1.25, Math.PI * 2.75) +
      path([[49, 82], [48, 150], [62, 150], [61, 82]]) +
      ellipse(55, 142, 6, 6, { strokeWidth: 1.6 });
    const turningGear = spinning(344, 178, 14, false, gear(344, 178, 32, 25, 10));
    return svg('Workbench with a laptop, calipers, a wrench and a gear', bench + laptop + calipers + wrench + turningGear);
  },

  // Three meshing gears, all turning
  work: () => {
    seed = 200;
    const big = [168, 170];
    const small = [168 + 113 * Math.cos(-Math.PI / 6), 170 + 113 * Math.sin(-Math.PI / 6)];
    const tiny = [168 + 98 * Math.cos((40 * Math.PI) / 180), 170 + 98 * Math.sin((40 * Math.PI) / 180)];
    const spokes = [0, 1, 2, 3, 4]
      .map((i) => {
        const a = (i * 2 * Math.PI) / 5 + 0.3;
        return line(big[0] + 24 * Math.cos(a), big[1] + 24 * Math.sin(a), big[0] + 52 * Math.cos(a), big[1] + 52 * Math.sin(a), { strokeWidth: 1.8 });
      })
      .join('');
    return svg(
      'Three meshing gears',
      spinning(big[0], big[1], 24, false, gear(big[0], big[1], 80, 69, 16) + circle(big[0], big[1], 112, { roughness: 0.7 }) + spokes) +
        spinning(small[0], small[1], 13.5, true, gear(small[0], small[1], 44, 34, 9, { phase: 0.35 })) +
        spinning(tiny[0], tiny[1], 10.5, true, gear(tiny[0], tiny[1], 31, 23, 7, { phase: 0.2 })),
    );
  },

  // Notebook with a pencil, and a glass of chai with rising steam
  about: () => {
    seed = 300;
    const notebook =
      poly([[52, 128], [206, 118], [216, 292], [60, 300]]) +
      Array.from({ length: 7 }, (_, i) => ellipse(72 + i * 20, 124 - i * 1.3, 8, 14, { strokeWidth: 1.8, roughness: 0.7 })).join('') +
      Array.from({ length: 6 }, (_, i) => line(76, 160 + i * 21, 194 - (i % 3) * 18, 157 + i * 21, { strokeWidth: 1.4, roughness: 0.8 })).join('');
    const pencil =
      poly([[118, 262], [214, 190], [222, 200], [126, 272]]) +
      poly([[118, 262], [126, 272], [106, 280]]) +
      line(206, 196, 214, 206, { strokeWidth: 1.6 });
    const glass =
      poly([[252, 176], [340, 176], [330, 290], [262, 290]]) +
      polyShaded([[256, 214], [337, 214], [330, 290], [262, 290]], { roughness: 0.9 }) +
      line(276, 180, 280, 286, { strokeWidth: 1.2, roughness: 0.5 }) +
      line(296, 180, 296, 286, { strokeWidth: 1.2, roughness: 0.5 }) +
      line(316, 180, 312, 286, { strokeWidth: 1.2, roughness: 0.5 });
    const wisp = (x, delay) =>
      `<g class="steam" style="animation-delay:${delay}s">${curve(
        [[x, 162], [x - 8, 146], [x + 6, 130], [x - 6, 114], [x + 4, 98]],
        { strokeWidth: 2, roughness: 0.6 },
      )}</g>`;
    return svg('A notebook, a pencil and a glass of chai', notebook + pencil + glass + wisp(278, 0) + wisp(298, 1.2) + wisp(318, 2.4));
  },

  // Clipboard holding an engineering drawing of a stepped shaft, with dimensions
  resume: () => {
    seed = 400;
    const board = rect(104, 36, 192, 268) + rect(118, 58, 164, 232, { roughness: 0.8 });
    const clip = rect(166, 24, 68, 26) + ellipse(200, 30, 18, 8, { strokeWidth: 1.8 });
    const heading = line(134, 80, 222, 80, { strokeWidth: 3 }) + line(134, 96, 196, 96, { strokeWidth: 1.6 });
    const shaft =
      rect(146, 140, 44, 56, { roughness: 0.6 }) +
      rect(190, 152, 64, 32, { roughness: 0.6 }) +
      line(136, 168, 266, 168, { strokeWidth: 1.2, strokeLineDash: [10, 4, 2, 4], roughness: 0.3, disableMultiStroke: true });
    const arrow = (x, y, dir) => poly([[x, y], [x + 8 * dir, y - 4], [x + 8 * dir, y + 4]], { strokeWidth: 1.4, roughness: 0.4 });
    const dims =
      line(146, 200, 146, 226, { strokeWidth: 1.2, roughness: 0.3 }) +
      line(254, 188, 254, 226, { strokeWidth: 1.2, roughness: 0.3 }) +
      line(146, 220, 254, 220, { strokeWidth: 1.2, roughness: 0.3 }) +
      arrow(146, 220, 1) +
      arrow(254, 220, -1) +
      line(262, 152, 274, 152, { strokeWidth: 1.2, roughness: 0.3 }) +
      line(262, 184, 274, 184, { strokeWidth: 1.2, roughness: 0.3 }) +
      line(270, 152, 270, 184, { strokeWidth: 1.2, roughness: 0.3 });
    const titleBlock = rect(206, 246, 66, 36, { strokeWidth: 1.6, roughness: 0.6 }) + line(206, 262, 272, 262, { strokeWidth: 1.2, roughness: 0.4 });
    const notes = line(132, 252, 190, 252, { strokeWidth: 1.4 }) + line(132, 266, 178, 266, { strokeWidth: 1.4 });
    return svg('A clipboard with an engineering drawing', board + clip + heading + shaft + dims + titleBlock + notes);
  },

  // Paper plane with a looping dashed trail
  contact: () => {
    seed = 500;
    const trail = curve(
      [[30, 262], [80, 250], [120, 222], [104, 190], [76, 200], [90, 232], [140, 236], [178, 196]],
      { strokeWidth: 1.8, strokeLineDash: [8, 8], roughness: 0.6, disableMultiStroke: true },
    );
    const plane =
      poly([[330, 96], [168, 110], [214, 146]]) +
      poly([[330, 96], [214, 146], [196, 196]]) +
      poly([[214, 146], [228, 158], [196, 196]], { roughness: 0.8 }) +
      line(330, 96, 228, 158, { strokeWidth: 1.6 });
    return svg('A paper plane', trail + `<g class="bob">${plane}</g>`);
  },

  // Snapped bolt
  404: () => {
    seed = 600;
    const head = rect(62, 118, 46, 84) + line(78, 118, 78, 202, { strokeWidth: 1.6 }) + line(92, 118, 92, 202, { strokeWidth: 1.6 });
    const piece1 =
      poly([[108, 138], [196, 138], [188, 152], [200, 164], [190, 174], [198, 182], [108, 182]]) +
      Array.from({ length: 7 }, (_, i) => line(118 + i * 11, 138, 126 + i * 11, 182, { strokeWidth: 1.4, roughness: 0.6 })).join('');
    const piece2 =
      poly([[226, 160], [236, 150], [232, 140], [318, 158], [310, 200], [226, 184], [234, 172]]) +
      Array.from({ length: 6 }, (_, i) => line(246 + i * 11, 146 + i * 2.2, 252 + i * 11, 190 + i * 2, { strokeWidth: 1.4, roughness: 0.6 })).join('');
    const bits = circle(210, 206, 5, { strokeWidth: 1.6 }) + circle(222, 222, 3, { strokeWidth: 1.4 }) + circle(204, 124, 4, { strokeWidth: 1.4 });
    const crack = line(206, 130, 214, 116, { strokeWidth: 1.4 }) + line(216, 136, 226, 124, { strokeWidth: 1.4 }) + line(212, 196, 222, 210, { strokeWidth: 1.4 });
    const floor = line(40, 262, 360, 258, { strokeWidth: 1.6, roughness: 1.4 });
    return svg('A snapped bolt', head + piece1 + piece2 + bits + crack + floor);
  },
};

mkdirSync(OUT, { recursive: true });
for (const [name, draw] of Object.entries(DOODLES)) {
  const file = `${OUT}/${name}.svg`;
  writeFileSync(file, draw());
  console.log(`wrote ${file}`);
}
