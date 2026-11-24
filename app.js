import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ════════════════════════════════════════════════════════════
   KI-01 — a circuit board that is also a résumé.
   Everything is built from primitives in code: no 3D model files.
   ════════════════════════════════════════════════════════════ */

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

const COL = {
  bg: 0x0b0c0a,
  mask: 0x10150f,     // black-green solder mask
  mask2: 0x161c15,
  gold: 0xd4a548,
  copper: 0x8a5a2b,
  metal: 0xcfd1d4,
  plastic: 0x141414,
  signal: 0xff5a1f,
};

/* Résumé facts pinned to parts during the exploded view. */
const CALLOUTS = [
  { id: 'shield', tag: 'U1 · Main processor', text: 'Software Engineer Intern, Lam Soon Edible Oils. 7 internal systems, 4 live.' },
  { id: 'die',    tag: 'U1 · Core',           text: 'Next.js, TypeScript, Supabase / PostgreSQL, Cloudflare Workers.' },
  { id: 'ant',    tag: 'ANT1 · Range',        text: 'Gold, RISE 2026 · Gold, DINS 2025 · Top 20, PutraHack 2026.' },
  { id: 'led',    tag: 'D1 · Status',         text: 'Interning until Jan 2027. Looking for a junior software engineer role.' },
  { id: 'header', tag: 'J1 · Education',      text: 'B.CS Software Engineering, UTHM, CGPA 3.74. Matriculation CGPA 3.98.' },
  { id: 'sw',     tag: 'SW1 · Input',         text: 'Facilitator + treasurer, TechUp IoT workshop. 30+ participants.' },
  { id: 'usb',    tag: 'USB1 · Port',         text: 'ikmal03411@gmail.com · willing to relocate' },
];

/* ── small helpers ─────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── boot sequence ─────────────────────────────────────────── */
function boot() {
  const el = document.getElementById('boot');
  const log = document.getElementById('bootLog');
  if (!el) return;
  if (REDUCE) { el.remove(); return; }
  const lines = [
    'KI-01 bootloader <b>v2026.11</b>',
    '› firmware ............ <b>ok</b>',
    '› mounting /projects (3) ... <b>ok</b>',
    '› signal .............. <b>live</b>',
  ];
  lines.forEach((l, i) => setTimeout(() => {
    const p = document.createElement('p');
    p.innerHTML = l;
    log.appendChild(p);
  }, 140 + i * 210));
  setTimeout(() => el.classList.add('off'), 1250);
  setTimeout(() => el.remove(), 1900);
}

/* ── page bits that don't need WebGL ───────────────────────── */
function pageBits() {
  const clock = document.getElementById('clock');
  const tick = () => {
    try {
      const t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kuala_Lumpur' }).format(new Date());
      clock.textContent = `Johor ${t} MYT`;
    } catch (e) { /* ignore */ }
  };
  tick(); setInterval(tick, 30000);

  // Hero role: types out, holds, erases, next — a nod to the old site.
  const roleEl = document.getElementById('heroRole');
  const ROLES = ['IoT Developer', 'Full-Stack Developer', 'Mobile Developer', 'Problem Solver'];
  if (roleEl && !REDUCE) {
    let r = 0, n = ROLES[0].length, dir = 0;
    const step = () => {
      const word = ROLES[r];
      if (dir === 0) { dir = -1; return setTimeout(step, 2200); }
      n += dir;
      roleEl.textContent = word.slice(0, Math.max(0, n));
      if (dir < 0 && n <= 0) { r = (r + 1) % ROLES.length; dir = 1; }
      else if (dir > 0 && n >= ROLES[r].length) { dir = 0; }
      setTimeout(step, dir < 0 ? 35 : 70);
    };
    setTimeout(step, 1800);
  }

  const copy = document.getElementById('copyMail');
  copy?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('ikmal03411@gmail.com'); copy.textContent = 'Copied ✓'; }
    catch (e) { copy.textContent = 'ikmal03411@gmail.com'; }
    setTimeout(() => { copy.textContent = 'Copy address'; }, 1800);
  });

  // List version of the callouts for phones / no-WebGL.
  const list = document.getElementById('buildList');
  list.innerHTML = CALLOUTS.map((c) => `<li><span class="mono">${c.tag}</span>${c.text}</li>`).join('');
}

/* ════════════════════════════════════════════════════════════
   TEXTURES (drawn on canvas)
   ════════════════════════════════════════════════════════════ */
const BW = 7, BD = 4.4; // board width (x) and depth (z)

function boardTexture() {
  const W = 2048, H = Math.round(W * BD / BW);
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  const px = (x) => (x + BW / 2) / BW * W;
  const pz = (z) => (z + BD / 2) / BD * H;
  const rnd = mulberry32(11);

  // decorative copper traces, 0° / 45° / 90° only, like a real layout
  g.lineCap = 'round'; g.lineJoin = 'round';
  for (let i = 0; i < 90; i++) {
    let x = -3.2 + rnd() * 6.4, z = -1.95 + rnd() * 3.9;
    g.strokeStyle = `rgba(150,100,50,${0.35 + rnd() * 0.3})`;
    g.lineWidth = rnd() < 0.2 ? 7 : 3.5;
    g.beginPath(); g.moveTo(px(x), pz(z));
    const segs = 2 + Math.floor(rnd() * 3);
    for (let k = 0; k < segs; k++) {
      const len = 0.25 + rnd() * 0.9;
      const d = Math.floor(rnd() * 4);
      if (d === 0) x += len;
      else if (d === 1) x -= len;
      else { const s = rnd() < 0.5 ? -1 : 1; x += len * 0.6 * (d === 2 ? 1 : -1); z += s * len * 0.6; }
      x = Math.max(-3.3, Math.min(3.3, x)); z = Math.max(-2.0, Math.min(2.0, z));
      g.lineTo(px(x), pz(z));
    }
    g.stroke();
    // via
    g.fillStyle = '#c99a3f'; g.beginPath(); g.arc(px(x), pz(z), 8, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#0c100b'; g.beginPath(); g.arc(px(x), pz(z), 3.5, 0, Math.PI * 2); g.fill();
  }

  // silkscreen outline
  g.strokeStyle = 'rgba(233,228,214,0.8)'; g.lineWidth = 3;
  g.strokeRect(px(-3.4), pz(-2.1), px(3.4) - px(-3.4), pz(2.1) - pz(-2.1));

  // mounting holes
  for (const [x, z] of [[-3.15, -1.85], [3.15, -1.85], [-3.15, 1.85], [3.15, 1.85]]) {
    g.fillStyle = '#d4a548'; g.beginPath(); g.arc(px(x), pz(z), 30, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#050605'; g.beginPath(); g.arc(px(x), pz(z), 17, 0, Math.PI * 2); g.fill();
  }

  // labels
  g.fillStyle = 'rgba(233,228,214,0.9)';
  g.font = '600 34px "IBM Plex Mono", monospace';
  g.fillText('KI-01  REV 2026.11', px(-2.9), pz(2.02));
  g.font = '500 24px "IBM Plex Mono", monospace';
  g.fillText('DESIGNED IN JOHOR, MY', px(0.9), pz(-1.92));
  g.fillText('U1', px(-2.75), pz(-1.3));
  g.fillText('NFC1', px(0.88), pz(-1.78));
  g.fillText('DSP1', px(0.95), pz(1.72));
  g.fillText('P1', px(3.0), pz(-0.25));
  g.fillText('PRN1', px(2.05), pz(-1.92));
  g.fillText('D1', px(-0.2), pz(-1.6));
  g.fillText('J1', px(-0.7), pz(1.7));
  g.fillText('SW1', px(-3.25), pz(-1.0));

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function moduleTexture() {
  const W = 512, H = Math.round(512 * 2.3 / 1.8);
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  // meander antenna in the top strip
  g.strokeStyle = '#d4a548'; g.lineWidth = 10; g.lineJoin = 'miter';
  g.beginPath();
  let x = 40, y = 40; g.moveTo(x, y + 90);
  for (let i = 0; i < 7; i++) {
    g.lineTo(x, y); x += 30; g.lineTo(x, y); g.lineTo(x, y + 90); x += 30; g.lineTo(x, y + 90);
  }
  g.stroke();
  g.fillStyle = 'rgba(233,228,214,0.85)';
  g.font = '500 22px "IBM Plex Mono", monospace';
  g.fillText('ANT1', 440, 60);
  // castellated pads along both edges
  g.fillStyle = '#d4a548';
  for (let i = 0; i < 14; i++) { g.fillRect(0, 200 + i * 30, 16, 16); g.fillRect(W - 16, 200 + i * 30, 16, 16); }
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; return tex;
}

function shieldTexture() {
  const W = 512, H = Math.round(512 * 1.55 / 1.6);
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  g.fillStyle = 'rgba(30,30,30,0.78)';
  g.font = '800 96px "Archivo", sans-serif';
  g.fillText('KI-32', 40, 140);
  g.font = '500 26px "IBM Plex Mono", monospace';
  g.fillText('SOFTWARE ENGINEER', 42, 200);
  g.fillText('B.CS · UTHM · 3.74', 42, 244);
  g.font = '500 20px "IBM Plex Mono", monospace';
  g.fillText('FULL-STACK / MOBILE / IOT', 42, 400);
  g.fillText('LOT 2026.11', 42, 432);
  g.beginPath(); g.arc(440, 400, 26, 0, Math.PI * 2); g.lineWidth = 3; g.strokeStyle = 'rgba(30,30,30,0.7)'; g.stroke();
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8; return tex;
}

function oledCanvas() {
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 300;
  return cv;
}
const ORDERS = [
  ['2× KEREPEK PISANG', '1× REMPEYEK', 'RM 38.00'],
  ['1× GIFT PACK RAYA', '2× REMPEYEK', 'RM 64.00'],
  ['5× KEREPEK PISANG', '3× REMPEYEK', 'RM 112.00'],
];
function receiptCanvas() {
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 398;
  const g = cv.getContext('2d');
  g.fillStyle = '#f2eee4'; g.fillRect(0, 0, 256, 398);
  g.fillStyle = '#1b1b1b'; g.textAlign = 'center';
  g.font = '700 22px "IBM Plex Mono", monospace'; g.fillText('HALFDAY CAFE', 128, 40);
  g.font = '500 14px "IBM Plex Mono", monospace'; g.fillText('TABLE 04 · ORDER #118', 128, 64);
  g.textAlign = 'left';
  const dash = (y) => { g.fillText('- - - - - - - - - - - - - -', 18, y); };
  dash(88);
  g.font = '500 15px "IBM Plex Mono", monospace';
  [['2x ICED LATTE', '18.00'], ['1x CROISSANT', '7.50'], ['1x NASI LEMAK', '9.90']].forEach(([a, b], i) => {
    g.fillText(a, 18, 118 + i * 28); g.textAlign = 'right'; g.fillText(b, 238, 118 + i * 28); g.textAlign = 'left';
  });
  g.font = '500 14px "IBM Plex Mono", monospace'; dash(200);
  g.font = '700 18px "IBM Plex Mono", monospace'; g.fillText('TOTAL', 18, 232); g.textAlign = 'right'; g.fillText('RM 35.40', 238, 232);
  g.textAlign = 'center'; g.font = '500 14px "IBM Plex Mono", monospace';
  g.fillText('SENT TO KITCHEN QUEUE', 128, 282);
  g.fillStyle = '#ff5a1f'; g.fillRect(70, 300, 116, 4);
  g.fillStyle = '#1b1b1b'; g.fillText('THANK YOU', 128, 340);
  for (let x = 30; x < 226; x += 5) g.fillRect(x, 356, (x * 7) % 3 + 1, 24);
  return cv;
}

function drawOLED(cv, n, phase) {
  const g = cv.getContext('2d');
  g.fillStyle = '#020403'; g.fillRect(0, 0, cv.width, cv.height);
  g.fillStyle = '#f3e7cf';
  g.font = '600 26px "IBM Plex Mono", monospace';
  g.fillText('DAPUR KAYU MAK', 24, 44);
  g.fillText(`#${String(41 + n).padStart(3, '0')}`, 400, 44);
  g.fillRect(24, 58, 464, 2);
  g.font = '500 30px "IBM Plex Mono", monospace';
  const o = ORDERS[n % ORDERS.length];
  g.fillText(o[0], 24, 112); g.fillText(o[1], 24, 152);
  g.font = '500 22px "IBM Plex Mono", monospace';
  g.fillStyle = '#9c9482'; g.fillText(`${o[2]} · DUITNOW QR`, 24, 196);
  // progress bar
  g.strokeStyle = '#f3e7cf'; g.lineWidth = 2; g.strokeRect(24, 228, 464, 30);
  g.fillStyle = phase >= 1 ? '#ff5a1f' : '#f3e7cf';
  g.fillRect(28, 232, 456 * Math.min(1, phase), 22);
  g.fillStyle = '#020403'; g.font = '600 18px "IBM Plex Mono", monospace';
  if (phase >= 1) g.fillText('DIBAYAR', 36, 250);
}

/* ════════════════════════════════════════════════════════════
   SCENE
   ════════════════════════════════════════════════════════════ */
async function start() {
  const canvas = document.getElementById('scene');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch (e) {
    document.documentElement.classList.add('no-webgl');
    return;
  }

  try { await Promise.all([document.fonts.load('600 34px "IBM Plex Mono"'), document.fonts.load('800 96px "Archivo"')]); } catch (e) { /* draw with fallback */ }

  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COL.bg);
  scene.fog = new THREE.Fog(COL.bg, 16, 34);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  // lights
  const key = new THREE.DirectionalLight(0xfff3e0, 1.1); key.position.set(5, 9, 6); scene.add(key);
  const rim = new THREE.PointLight(COL.signal, 7, 16, 2); rim.position.set(-6, 3, -5); scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.15));

  // ground glow: a faint grid far below to give depth
  const grid = new THREE.GridHelper(60, 60, 0x2a2b26, 0x1a1b18);
  grid.position.y = -2.2; scene.add(grid);

  /* ── materials ─────────────────────────── */
  const M = {
    mask: new THREE.MeshStandardMaterial({ color: COL.mask, roughness: 0.55, metalness: 0.15 }),
    mask2: new THREE.MeshStandardMaterial({ color: COL.mask2, roughness: 0.5, metalness: 0.15 }),
    gold: new THREE.MeshStandardMaterial({ color: COL.gold, roughness: 0.28, metalness: 1 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xa9abae, roughness: 0.42, metalness: 1 }),
    plastic: new THREE.MeshStandardMaterial({ color: COL.plastic, roughness: 0.7, metalness: 0 }),
    die: new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.25, metalness: 0.4 }),
    cap: new THREE.MeshStandardMaterial({ color: 0xa98457, roughness: 0.6 }),
    res: new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.5 }),
  };

  const board = new THREE.Group(); scene.add(board);
  const parts = [];      // { obj, base, lift, slide, delay, tilt }
  const anchors = {};    // id -> Object3D for callouts
  const addPart = (obj, lift, opts = {}) => {
    board.add(obj);
    parts.push({ obj, base: obj.position.clone(), baseRot: obj.rotation.clone(), lift, slide: opts.slide || null, delay: opts.delay ?? 0, tilt: opts.tilt ?? 0 });
    return obj;
  };
  const anchor = (id, parent, x, y, z) => { const a = new THREE.Object3D(); a.position.set(x, y, z); parent.add(a); anchors[id] = a; };

  /* ── PCB ───────────────────────────────── */
  const pcb = new THREE.Group();
  const pcbMesh = new THREE.Mesh(new RoundedBoxGeometry(BW, 0.16, BD, 4, 0.08), M.mask);
  pcb.add(pcbMesh);
  const silk = new THREE.Mesh(new THREE.PlaneGeometry(BW, BD), new THREE.MeshStandardMaterial({ map: boardTexture(), transparent: true, roughness: 0.6, metalness: 0.2 }));
  silk.rotation.x = -Math.PI / 2; silk.position.y = 0.081; pcb.add(silk);
  addPart(pcb, 0);

  /* ── signal buses (glowing traces with travelling pulses) ── */
  const traceMat = (phase) => new THREE.ShaderMaterial({
    uniforms: {
      uP: { value: 0 }, uI: { value: 0.6 },
      uBase: { value: new THREE.Color(0x6b4420) },
      uHot: { value: new THREE.Color(COL.signal) },
    },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `
      uniform float uP; uniform float uI; uniform vec3 uBase; uniform vec3 uHot; varying vec2 vUv;
      void main(){
        float d = uP - vUv.x;
        float head = exp(-pow(d * 16.0, 2.0));
        float tail = d > 0.0 ? exp(-d * 6.0) * 0.45 : 0.0;
        vec3 c = uBase + uHot * (head * 6.0 + tail * 1.4) * uI;
        gl_FragColor = vec4(c, 1.0);
      }`,
    userData: { phase },
  });
  const buses = [[], [], []];
  function bus(k, z0, xb, z1, xe) {
    for (let i = -1; i <= 1; i++) {
      const dz = i * 0.085;
      const sx = z1 < z0 ? dz : -dz;
      const pts = [
        new THREE.Vector3(-0.78, 0.09, z0 + dz),
        new THREE.Vector3(xb + sx, 0.09, z0 + dz),
        new THREE.Vector3(xb + sx + Math.abs(z1 - z0), 0.09, z1 + dz),
        new THREE.Vector3(xe, 0.09, z1 + dz),
      ];
      const path = new THREE.CurvePath();
      for (let p = 0; p < pts.length - 1; p++) if (pts[p].distanceTo(pts[p + 1]) > 1e-4) path.add(new THREE.LineCurve3(pts[p], pts[p + 1]));
      const mat = traceMat((i + 1) * 0.05);
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(path, 80, 0.016, 5, false), mat);
      mesh.scale.y = 0.4;
      pcb.add(mesh);
      buses[k].push(mat);
    }
  }
  bus(0, -0.45, -0.1, -0.95, 0.88);  // → NFC1
  bus(1, 0.0, 0.5, 0.0, 3.35);       // → P1 soil probe
  bus(2, 0.45, -0.1, 0.95, 0.92);    // → DSP1 OLED

  /* ── U1: main module, shield, die ───────── */
  const modX = -1.7;
  const modBase = new THREE.Group();
  const mb = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 2.3), M.mask2); modBase.add(mb);
  const mTop = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.3), new THREE.MeshStandardMaterial({ map: moduleTexture(), transparent: true, roughness: 0.5, metalness: 0.3 }));
  mTop.rotation.x = -Math.PI / 2; mTop.position.y = 0.041; modBase.add(mTop);
  modBase.position.set(modX, 0.12, 0);
  anchor('ant', modBase, -0.5, 0.06, -0.92);
  addPart(modBase, 0.55, { delay: 0.05 });

  const die = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.07, 0.72), M.die);
  die.position.set(modX, 0.2, 0.3);
  // tiny gold bond pads around the die
  const padGeo = new THREE.BoxGeometry(0.05, 0.02, 0.05);
  const pads = new THREE.InstancedMesh(padGeo, M.gold, 40);
  const tmp = new THREE.Object3D(); let pi = 0;
  for (let s = 0; s < 4; s++) for (let j = 0; j < 10; j++) {
    const t = -0.3 + j * 0.0667;
    const [x, z] = [[t, -0.33], [t, 0.33], [-0.33, t], [0.33, t]][s];
    tmp.position.set(x, 0.04, z); tmp.updateMatrix(); pads.setMatrixAt(pi++, tmp.matrix);
  }
  die.add(pads);
  anchor('die', die, 0.36, 0.05, 0);
  addPart(die, 1.25, { delay: 0.1, tilt: 0.12 });

  const shield = new THREE.Group();
  const sh = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.22, 1.55, 3, 0.03), M.metal); shield.add(sh);
  const shTop = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.55), new THREE.MeshStandardMaterial({ map: shieldTexture(), transparent: true, roughness: 0.45, metalness: 0.6 }));
  shTop.rotation.x = -Math.PI / 2; shTop.position.y = 0.111; shield.add(shTop);
  shield.position.set(modX, 0.27, 0.3);
  anchor('shield', shield, 0.8, 0.11, -0.3);
  addPart(shield, 2.5, { delay: 0.15, tilt: -0.18 });

  /* ── J1: pin header ─────────────────────── */
  const header = new THREE.Group();
  const hb = new THREE.Mesh(new THREE.BoxGeometry(3.75, 0.24, 0.26), M.plastic); header.add(hb);
  const pins = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 0.62, 0.06), M.gold, 15);
  for (let i = 0; i < 15; i++) { tmp.position.set(-1.75 + i * 0.25, 0.12, 0); tmp.updateMatrix(); pins.setMatrixAt(i, tmp.matrix); }
  header.add(pins);
  header.position.set(1.35, 0.2, 1.95);
  anchor('header', header, 1.9, 0.4, 0);
  addPart(header, 0.95, { delay: 0.2 });

  /* ── USB-C ──────────────────────────────── */
  const usb = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.24, 0.85, 3, 0.1), M.metal);
  usb.position.set(-3.28, 0.2, 1.25);
  anchor('usb', usb, -0.31, 0, 0);
  addPart(usb, 0.75, { delay: 0.12, slide: new THREE.Vector3(-0.6, 0, 0) });

  /* ── D1: status LED ─────────────────────── */
  const ledMat = new THREE.MeshStandardMaterial({ color: COL.signal, emissive: COL.signal, emissiveIntensity: 3, roughness: 0.3 });
  const led = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.14), ledMat);
  led.position.set(-0.35, 0.13, -1.8);
  const ledLight = new THREE.PointLight(COL.signal, 1.2, 2, 2); ledLight.position.y = 0.25; led.add(ledLight);
  anchor('led', led, -0.11, 0.05, 0);
  addPart(led, 1.6, { delay: 0.25 });

  /* ── SW1/SW2: tactile buttons ───────────── */
  for (const z of [-1.0, -0.3]) {
    const b = new THREE.Group();
    b.add(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.14, 0.42), M.metal));
    const capM = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.1, 20), M.plastic); capM.position.y = 0.11; b.add(capM);
    b.position.set(-3.0, 0.15, z);
    if (z === -1.0) anchor('sw', b, 0, 0.16, 0);
    addPart(b, 1.0, { delay: 0.18 });
  }

  /* ── X1: crystal oscillator — keeps time (ROTEE: expiry tracking) ── */
  const xtalMat = new THREE.MeshStandardMaterial({ color: COL.metal, roughness: 0.3, metalness: 1, emissive: COL.signal, emissiveIntensity: 0 });
  const xtal = new THREE.Group();
  xtal.add(new THREE.Mesh(new RoundedBoxGeometry(0.75, 0.3, 0.36, 4, 0.15), xtalMat));
  const xpad = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 0.44), M.plastic); xpad.position.y = -0.15; xtal.add(xpad);
  xtal.position.set(-3.0, 0.26, 0.45);
  anchor('xtal', xtal, 0, 0.16, 0);
  addPart(xtal, 1.2, { delay: 0.15, tilt: 0.1 });

  /* ── SMD passives ───────────────────────── */
  const rnd = mulberry32(5);
  for (const [mat, n, lift] of [[M.cap, 26, 0.45], [M.res, 26, 0.7]]) {
    const im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.17, 0.07, 0.09), mat, n);
    let c = 0, tries = 0;
    while (c < n && tries < 2000) {
      tries++;
      const x = -0.65 + rnd() * 1.4, z = -1.55 + rnd() * 3.1;
      // keep the bus corridors and the LED clear
      if (Math.abs(z) < 0.2 || Math.abs(z - 0.55) < 0.2 || Math.abs(z + 0.55) < 0.2) continue;
      if (z < -1.5) continue;
      tmp.position.set(x, 0.115, z); tmp.rotation.set(0, rnd() < 0.5 ? 0 : Math.PI / 2, 0); tmp.updateMatrix();
      im.setMatrixAt(c++, tmp.matrix);
    }
    im.count = c;
    const gp = new THREE.Group(); gp.add(im);
    addPart(gp, lift, { delay: 0.08 });
  }

  /* ── NFC1: coil module (Taska Zurah) ─────── */
  const nfc = new THREE.Group();
  const nb = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.06, 1.3), M.mask2); nfc.add(nb);
  {
    const pts = []; let w = 1.55, d = 1.1;
    for (let t = 0; t < 7; t++) {
      const hw = w / 2, hd = d / 2;
      pts.push(new THREE.Vector3(-hw, 0, -hd), new THREE.Vector3(hw, 0, -hd), new THREE.Vector3(hw, 0, hd), new THREE.Vector3(-hw + 0.07, 0, hd));
      w -= 0.14; d -= 0.14;
    }
    const path = new THREE.CurvePath();
    for (let i = 0; i < pts.length - 1; i++) path.add(new THREE.LineCurve3(pts[i], pts[i + 1]));
    const coil = new THREE.Mesh(new THREE.TubeGeometry(path, 400, 0.018, 5, false), M.gold);
    coil.position.y = 0.04; coil.scale.y = 0.5; nfc.add(coil);
    const chip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.28), M.die); chip.position.y = 0.06; nfc.add(chip);
    for (const [x, z] of [[-0.8, -0.58], [0.8, -0.58], [-0.8, 0.58], [0.8, 0.58]]) {
      const so = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.14, 10), M.gold); so.position.set(x, -0.08, z); nfc.add(so);
    }
  }
  nfc.position.set(1.72, 0.2, -1.05);
  addPart(nfc, 1.4, { delay: 0.22, tilt: 0.1 });

  /* ── DSP1: OLED order screen (Halfday Cafe) ─ */
  const dsp = new THREE.Group();
  dsp.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 1.05), M.mask2));
  const glass = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.05, 0.8), M.die); glass.position.y = 0.05; dsp.add(glass);
  const oled = oledCanvas();
  const oledTex = new THREE.CanvasTexture(oled); oledTex.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.7), new THREE.MeshBasicMaterial({ map: oledTex, toneMapped: false, color: 0xbdbdbd }));
  screen.rotation.x = -Math.PI / 2; screen.position.y = 0.077; dsp.add(screen);
  dsp.position.set(1.72, 0.17, 1.05);
  addPart(dsp, 1.05, { delay: 0.2, tilt: -0.08 });

  /* ── P1: capacitive soil probe (AgroEzuran) ── */
  const probe = new THREE.Group();
  const conn = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.26, 0.9), M.plastic); conn.position.set(3.32, 0.2, 0); board.add(conn);
  {
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 1.0), M.mask2); base.position.set(3.95, 0.12, 0); probe.add(base);
    const ic = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.06, 0.26), M.die); ic.position.set(3.8, 0.17, 0.22); probe.add(ic);
    // ESP32-CAM: small board + lens, for the plant-disease classifier
    const camB = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.06, 0.36), M.mask); camB.position.set(4.12, 0.18, -0.24); probe.add(camB);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.16, 24), M.plastic); lens.position.set(4.12, 0.29, -0.24); probe.add(lens);
    const glassL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.01, 24), new THREE.MeshStandardMaterial({ color: 0x1a2a3a, roughness: 0.05, metalness: 0.9 }));
    glassL.position.set(4.12, 0.375, -0.24); probe.add(glassL);
    for (const z of [-0.28, 0.28]) {
      const prong = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 0.26), M.mask2); prong.position.set(5.4, 0.12, z); probe.add(prong);
      const tip = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.13, 0.3, 4), M.mask2);
      tip.rotation.z = -Math.PI / 2; tip.rotation.x = Math.PI / 4; tip.scale.set(1, 1, 0.3);
      tip.position.set(6.55, 0.12, z); probe.add(tip);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.01, 0.06), M.gold); strip.position.set(5.35, 0.155, z); probe.add(strip);
    }
  }
  anchor('probe', probe, 5.6, 0.2, -0.3);
  addPart(probe, 0.2, { delay: 0.2, slide: new THREE.Vector3(1.1, 0, 0) });

  /* ── PRN1: receipt printer (Halfday Cafe), on a ribbon cable off the back edge ── */
  const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.015, 0.78), new THREE.MeshStandardMaterial({ color: 0x4a4740, roughness: 0.7 }));
  ribbon.position.set(1.7, 0.1, -2.46); board.add(ribbon);
  const printer = new THREE.Group();
  printer.add(new THREE.Mesh(new RoundedBoxGeometry(1.4, 0.5, 0.9, 4, 0.08), new THREE.MeshStandardMaterial({ color: 0x1d1e1c, roughness: 0.55, metalness: 0.1 })));
  const slot = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.02, 0.07), M.die); slot.position.set(0, 0.255, -0.2); printer.add(slot);
  const prLedMat = new THREE.MeshStandardMaterial({ color: COL.signal, emissive: COL.signal, emissiveIntensity: 1 });
  const prLed = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.03, 0.09), prLedMat); prLed.position.set(0.52, 0.26, 0.28); printer.add(prLed);
  const rTex = new THREE.CanvasTexture(receiptCanvas()); rTex.colorSpace = THREE.SRGBColorSpace;
  const paperGeo = new THREE.PlaneGeometry(0.86, 1.34); paperGeo.translate(0, 0.67, 0);
  const paper = new THREE.Mesh(paperGeo, new THREE.MeshStandardMaterial({ map: rTex, color: 0x9d998f, roughness: 0.95, side: THREE.DoubleSide }));
  paper.position.set(0, 0.26, -0.2); paper.rotation.x = -0.28; printer.add(paper);
  printer.position.set(1.7, 0.2, -3.25);
  anchor('printer', printer, 0, 0.3, 0);
  addPart(printer, 0.6, { delay: 0.2, slide: new THREE.Vector3(0, 0, -0.5) });
  let printT = 0;


  /* ── post-processing ─────────────────────── */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.5, 0.45, 0.9);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ════════════════════════════════════════
     SCROLL CHOREOGRAPHY
     Each section has a camera/board state. While the next section
     scrolls into view we blend toward its state.
     ════════════════════════════════════════ */
  let mobile = false;
  const STATE = {
    // f = focus per part: [NFC1, P1 probe, DSP1 screen, X1 crystal, PRN1 printer]
    hero:    { c: [4.0, 9.0, 13.5],  t: [-3.0, -0.2, 0.6],  ry: -0.42, ex: 0,    lb: 0, f: [0.6, 0.6, 0.6, 0.3, 0.6], spin: 0 },
    build:   { c: [10.9, 9.0, 9.1],  t: [0.8, 0.4, -1.5],  ry: 0.12,  ex: 1,    lb: 1, f: [0.3, 0.3, 0.3, 0.3, 0.3], spin: 0 },
    xp:      { c: [-3.8, 5.4, 5.5],  t: [-3.3, 0.0, 0.65], ry: 0,     ex: 0.3,  lb: 0, f: [1.2, 1.2, 1.2, 0.3, 0.3], spin: 0 },
    probe:   { c: [2.4, 6.4, 6.0],   t: [2.9, 0.0, 0.1],   ry: 0,     ex: 0,    lb: 0, f: [0.2, 1.8, 0.2, 0.2, 0.2], spin: 0 },
    xtal:    { c: [-5.3, 5.0, 5.6],  t: [-4.8, 0.0, 0.7], ry: 0,     ex: 0,    lb: 0, f: [0.2, 0.2, 0.2, 1.8, 0.2], spin: 0 },
    nfc:     { c: [-0.4, 5.2, 4.2],  t: [0.1, 0.0, -0.7],  ry: 0,     ex: 0,    lb: 0, f: [1.8, 0.2, 0.2, 0.2, 0.2], spin: 0 },
    printer: { c: [0.2, 3.0, 0.2],    t: [0.7, 0.7, -3.1],  ry: 0,     ex: 0,    lb: 0, f: [0.2, 0.2, 0.2, 0.2, 1.8], spin: 0 },
    oled:    { c: [-0.4, 5.6, 5.6],  t: [0.1, 0.0, 0.7],   ry: 0,     ex: 0,    lb: 0, f: [0.2, 0.2, 1.8, 0.2, 0.2], spin: 0 },
    record:  { c: [0.5, 15, 7],      t: [0.5, 0.0, 0.0],   ry: 0.0,   ex: 0.25, lb: 0, f: [0.5, 0.5, 0.5, 0.5, 0.5], spin: 0 },
    contact: { c: [0.0, 6.0, 9.5],   t: [1.0, -0.6, 0.0],  ry: 0,     ex: 0,    lb: 0, f: [1, 1, 1, 0.6, 1],       spin: 1 },
  };
  const STATE_M = {
    hero:  { c: [1.5, 12.5, 14], t: [0.8, -1.0, -5.6] },
    build: { c: [9, 12, 12],    t: [0.8, 0.9, 0.0] },
    xp:    { c: [-1.7, 7.0, 7.9],  t: [-1.7, 0.0, 1.9] },
    probe: { c: [5.0, 8.5, 8.3],   t: [5.0, 0.0, 1.8] },
    xtal:  { c: [-3.0, 5.6, 6.6],  t: [-3.0, 0.0, 1.9] },
    nfc:   { c: [1.72, 7.0, 6.5],  t: [1.72, 0.0, 0.55] },
    oled:  { c: [1.72, 7.0, 8.6],  t: [1.72, 0.0, 2.65] },
    printer: { c: [1.7, 6.2, 3.4], t: [1.7, 0.0, -1.6] },
    record:  { c: [0.5, 18, 8], t: [0.5, 0, 0] },
    contact: { c: [0.0, 9, 13], t: [1.0, -2.6, -2.0] },
  };
  const stateFor = (name) => (mobile ? { ...STATE[name], ...STATE_M[name] } : STATE[name]);

  const secs = [...document.querySelectorAll('[data-state]')];
  let tops = [];
  const measure = () => { tops = secs.map((s) => s.getBoundingClientRect().top + scrollY); };

  const blend = (a, b, t) => ({
    c: a.c.map((v, i) => lerp(v, b.c[i], t)),
    t: a.t.map((v, i) => lerp(v, b.t[i], t)),
    f: a.f.map((v, i) => lerp(v, b.f[i], t)),
    ry: lerp(a.ry, b.ry, t), ex: lerp(a.ex, b.ex, t), lb: lerp(a.lb, b.lb, t), spin: lerp(a.spin, b.spin, t),
  });
  function targetAt(y) {
    const vh = innerHeight;
    for (let i = 0; i < secs.length - 1; i++) {
      const s = tops[i + 1] - vh, e = tops[i + 1];
      if (y < s) return stateFor(secs[i].dataset.state);
      if (y < e) return blend(stateFor(secs[i].dataset.state), stateFor(secs[i + 1].dataset.state), smooth((y - s) / (e - s)));
    }
    return stateFor(secs[secs.length - 1].dataset.state);
  }

  // labels fade out once the build section is mostly scrolled past
  const cur = JSON.parse(JSON.stringify(stateFor('hero')));

  /* ── callouts ───────────────────────────── */
  const coWrap = document.getElementById('callouts');
  const SVGNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('class', 'co-svg');
  coWrap.appendChild(svg);
  const coEls = CALLOUTS.map((c) => {
    const el = document.createElement('div');
    el.className = 'co';
    el.innerHTML = `<div class="co-box"><span class="mono">${c.tag}</span><span>${c.text}</span></div>`;
    coWrap.appendChild(el);
    const line = document.createElementNS(SVGNS, 'polyline'); svg.appendChild(line);
    const dot = document.createElementNS(SVGNS, 'circle'); dot.setAttribute('r', '5'); svg.appendChild(dot);
    return { el, a: anchors[c.id], line, dot, ax: 0, ay: 0, sy: -1, bh: 0 };
  });
  const v3 = new THREE.Vector3();

  /* ── live readouts floating over project parts (simulated values, labelled as such) ── */
  const readouts = [];
  function makeReadout(anchorId, fi, title, rows, init, tick) {
    const el = document.createElement('div');
    el.className = 'readout';
    el.innerHTML = `<p class="mono">${title} <i class="led"></i></p><dl>${rows.map((r, i) => `<dt class="mono">${r}</dt><dd>${init[i]}</dd>`).join('')}</dl><p class="mono ro-note">Simulated</p>`;
    document.body.appendChild(el);
    readouts.push({ el, anchorId, fi, dd: [...el.querySelectorAll('dd')], tick, t: 0 });
  }

  // AgroEzuran: irrigate only when the soil is dry AND rain isn't coming
  const farm = { soil: 41.8, rain: 30 };
  makeReadout('probe', 1, 'P1 · field node', ['Soil', 'Rain chance', 'Pump'], ['41.8%', '30%', 'IDLE'], (dd) => {
    farm.soil = Math.max(30, Math.min(60, farm.soil + (Math.random() - 0.62) * 1.4));
    farm.rain = Math.max(0, Math.min(95, Math.round(farm.rain + (Math.random() - 0.5) * 18)));
    let pump = 'IDLE';
    if (farm.soil < 38) pump = farm.rain >= 60 ? 'HOLD · RAIN' : 'ON';
    if (pump === 'ON') farm.soil += 2.2;
    dd[0].textContent = `${farm.soil.toFixed(1)}%`;
    dd[1].textContent = `${farm.rain}%`;
    dd[2].textContent = pump;
    dd[2].classList.toggle('sig', pump === 'ON');
  });

  // ROTEE: first-expired-first-out — the oldest batch goes out first
  const BATCHES = ['B-0412 · CROISSANT', 'B-0415 · SOURDOUGH', 'B-0418 · BUN', 'B-0421 · DANISH'];
  const bake = { i: 0, hrs: 30 };
  makeReadout('xtal', 3, 'X1 · FEFO queue', ['Next out', 'Expires in', 'Action'], ['B-0412', '30h', 'SELL FIRST'], (dd) => {
    bake.hrs -= 3;
    if (bake.hrs < 0) { bake.i = (bake.i + 1) % BATCHES.length; bake.hrs = 30; }
    const action = bake.hrs > 12 ? 'SELL FIRST' : bake.hrs > 3 ? 'MARK DOWN' : 'DONATE';
    dd[0].textContent = BATCHES[bake.i].split(' · ')[0];
    dd[1].textContent = `${bake.hrs}h`;
    dd[2].textContent = action;
    dd[2].classList.toggle('sig', action !== 'SELL FIRST');
  });

  /* ── input ──────────────────────────────── */
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  addEventListener('pointermove', (e) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; }, { passive: true });

  function resize() {
    const w = innerWidth, h = innerHeight;
    mobile = w < 860;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloom.resolution.set(w / 2, h / 2);
    camera.aspect = w / h;
    camera.fov = mobile ? 40 : 32;
    camera.updateProjectionMatrix();
    measure();
  }
  addEventListener('resize', resize);
  addEventListener('load', measure);
  resize();

  /* ── loop ───────────────────────────────── */
  const clock = new THREE.Clock();
  let oledN = 0, oledT = 0;
  const lookAt = new THREE.Vector3();

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    const tgt = targetAt(scrollY);
    const k = REDUCE ? 1 : 1 - Math.exp(-dt * 4.5);
    for (let i = 0; i < 3; i++) { cur.c[i] = lerp(cur.c[i], tgt.c[i], k); cur.t[i] = lerp(cur.t[i], tgt.t[i], k); }
    for (let i = 0; i < cur.f.length; i++) cur.f[i] = lerp(cur.f[i], tgt.f[i], k);
    cur.ry = lerp(cur.ry, tgt.ry, k); cur.ex = lerp(cur.ex, tgt.ex, k); cur.lb = lerp(cur.lb, tgt.lb, k); cur.spin = lerp(cur.spin, tgt.spin, k);

    mouse.sx = lerp(mouse.sx, mouse.x, 0.06); mouse.sy = lerp(mouse.sy, mouse.y, 0.06);
    const heroish = Math.max(0, 1 - scrollY / innerHeight);
    const motion = REDUCE ? 0 : 1;

    // board pose
    board.rotation.y = cur.ry + mouse.sx * 0.35 * heroish * motion + cur.spin * Math.sin(t * 0.25) * 0.25 * motion;
    board.rotation.x = mouse.sy * 0.12 * heroish * motion;
    board.position.y = Math.sin(t * 0.8) * 0.06 * motion;

    // explode
    for (const p of parts) {
      const e = smooth(cur.ex * 1.3 - p.delay);
      p.obj.position.copy(p.base);
      p.obj.position.y += p.lift * e;
      if (p.slide) p.obj.position.addScaledVector(p.slide, e);
      p.obj.rotation.set(p.baseRot.x + p.tilt * e, p.baseRot.y, p.baseRot.z + p.tilt * 0.5 * e);
    }

    // pulses
    buses.forEach((mats, bi) => mats.forEach((m, li) => {
      m.uniforms.uP.value = ((t * 0.42 + bi * 0.31 + li * 0.07) % 1.4) - 0.2;
      m.uniforms.uI.value = motion ? cur.f[bi] : 0.4;
    }));

    // LED blink
    const on = REDUCE || Math.floor(t * 1.1) % 2 === 0;
    ledMat.emissiveIntensity = on ? 4 : 0.5;
    ledLight.intensity = on ? 1.2 : 0.1;

    // OLED: a Dapur Kayu Mak order is paid by DuitNow QR, shows DIBAYAR, next order
    oledT += dt;
    const phase = oledT / 2.4;
    if (phase > 1.5) { oledT = 0; oledN++; }
    drawOLED(oled, oledN, REDUCE ? 1 : phase);
    oledTex.needsUpdate = true;

    // camera
    camera.position.set(cur.c[0], cur.c[1], cur.c[2]);
    lookAt.set(cur.t[0], cur.t[1], cur.t[2]);
    camera.lookAt(lookAt);

    // callouts
    if (!mobile) {
      const w = innerWidth, h = innerHeight;
      board.updateMatrixWorld();
      const vis = smooth((cur.lb - 0.55) / 0.4);
      coWrap.style.opacity = vis.toFixed(3);
      if (vis > 0.001) {
        const gut = Math.min(56, Math.max(16, w * 0.04));
        const colX = w - gut - 300;
        // project anchors, then stack the boxes in one column, ordered by anchor height
        coEls.forEach((it) => {
          it.a.getWorldPosition(v3); v3.project(camera);
          it.ax = (v3.x * 0.5 + 0.5) * w; it.ay = (-v3.y * 0.5 + 0.5) * h;
          it.bh = it.el.offsetHeight;
        });
        const order = [...coEls].sort((p, q) => p.ay - q.ay);
        const gap = 14;
        let below = order.reduce((s, it) => s + it.bh + gap, 0);
        let yPrev = 84;
        order.forEach((it) => {
          below -= it.bh + gap;
          let y = Math.max(yPrev, it.ay - it.bh / 2);
          y = Math.min(y, h - 24 - it.bh - below);   // leave room for the boxes still to come
          it.sy = it.sy < 0 ? y : lerp(it.sy, y, 0.25);
          yPrev = it.sy + it.bh + gap;
          const my = it.sy + it.bh / 2;
          it.el.style.transform = `translate(${colX.toFixed(1)}px, ${it.sy.toFixed(1)}px)`;
          it.line.setAttribute('points', `${it.ax.toFixed(1)},${it.ay.toFixed(1)} ${(colX - 36).toFixed(1)},${my.toFixed(1)} ${colX.toFixed(1)},${my.toFixed(1)}`);
          it.dot.setAttribute('cx', it.ax.toFixed(1)); it.dot.setAttribute('cy', it.ay.toFixed(1));
        });
      }
    }

    // crystal glows when ROTEE is in focus
    xtalMat.emissiveIntensity = Math.max(0, cur.f[3] - 0.4) * (0.5 + 0.35 * Math.sin(t * 3) * motion);

    // receipt printer: prints an order, holds, tears off, repeats
    printT += dt * (0.6 + Math.min(1, cur.f[4]) * 0.6);
    if (printT > 5) printT = 0;
    const pp = REDUCE ? 1 : smooth(printT / 3);
    paper.scale.y = Math.max(0.001, pp);
    rTex.repeat.set(1, Math.max(0.001, pp)); rTex.offset.set(0, 1 - pp);
    prLedMat.emissiveIntensity = (printT < 3 && !REDUCE) ? (Math.floor(t * 6) % 2 ? 3 : 0.4) : 1.2;

    // floating readouts
    for (const r of readouts) {
      const vis = smooth((cur.f[r.fi] - 1.0) / 0.6);
      r.el.style.opacity = vis.toFixed(3);
      if (vis <= 0.001) continue;
      anchors[r.anchorId].getWorldPosition(v3); v3.project(camera);
      const x = (v3.x * 0.5 + 0.5) * innerWidth, y = (-v3.y * 0.5 + 0.5) * innerHeight;
      r.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, calc(-100% - 18px))`;
      r.t += dt;
      if (r.t > 1.5 && !REDUCE) { r.t = 0; r.tick(r.dd); }
    }

    composer.render();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ════════════════════════════════════════════════════════════
   PAGE INTERACTIONS (no WebGL needed)
   ════════════════════════════════════════════════════════════ */
function onVisible(el, cb, threshold = 0.35) {
  if (!el) return;
  if (!('IntersectionObserver' in window)) { cb(); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { cb(); io.disconnect(); } });
  }, { threshold });
  io.observe(el);
}

// Experience: numbers count up the first time the card is seen.
function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    if (REDUCE) return;
    el.textContent = '0';
    onVisible(el, () => {
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / 900);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 0.6);
  });
}

// Experience: accessible tabs (click, arrow keys, Home/End).
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((box) => {
    const tabs = [...box.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k === undefined) return;
        e.preventDefault();
        select(tabs[(k + tabs.length) % tabs.length], true);
      });
    });
  });
}

// Archive: tap a chip to open it (hover opens it on desktop via CSS).
function initChips() {
  const chips = [...document.querySelectorAll('button.ic')];
  chips.forEach((c) => c.addEventListener('click', () => {
    const open = c.getAttribute('aria-expanded') !== 'true';
    chips.forEach((o) => o.setAttribute('aria-expanded', 'false'));
    c.setAttribute('aria-expanded', String(open));
  }));
}

// Logbook: an oscilloscope trace that draws itself as you scroll.
function initScope() {
  const list = document.getElementById('logList');
  const svg = document.getElementById('scopeSvg');
  const marksEl = document.getElementById('scopeMarks');
  const read = document.getElementById('scopeRead');
  if (!list || !svg || !marksEl || !read) return;

  const items = [...list.children].reverse().map((li) => {
    const strong = li.querySelector('strong').textContent.trim();
    return {
      year: li.children[0].textContent.trim(),
      title: strong.replace(/\.$/, ''),
      detail: li.children[1].textContent.replace(strong, '').trim(),
      kind: li.dataset.kind,
    };
  });
  const HEIGHT = { Gold: 165, Experience: 140, Hackathon: 118, Leadership: 96, Education: 78, Community: 68 };
  const W = 1000, H = 220, BASE = 186;
  const xs = items.map((_, i) => 70 + i * (860 / (items.length - 1)));

  let d = `M0 ${BASE}`;
  xs.forEach((x, i) => {
    const h = HEIGHT[items[i].kind] || 70;
    const from = i ? xs[i - 1] + 30 : 0;
    for (let k = from + 10, s = 1; k < x - 30; k += 10, s = -s) d += ` L${k} ${BASE + s * 2.5}`;
    d += ` L${x - 30} ${BASE} L${x - 12} ${BASE + 9} L${x} ${BASE - h} L${x + 12} ${BASE + 13} L${x + 30} ${BASE}`;
  });
  for (let k = xs[xs.length - 1] + 40, s = 1; k < W; k += 10, s = -s) d += ` L${k} ${BASE + s * 2.5}`;
  d += ` L${W} ${BASE}`;

  const NS = 'http://www.w3.org/2000/svg';
  const ghost = document.createElementNS(NS, 'path'); ghost.setAttribute('d', d); ghost.setAttribute('class', 'ghost');
  const trace = document.createElementNS(NS, 'path'); trace.setAttribute('d', d); trace.setAttribute('class', 'trace');
  svg.append(ghost, trace);
  const len = trace.getTotalLength();
  trace.style.strokeDasharray = `${len}`;

  const head = document.createElement('div'); head.className = 'scope-head'; marksEl.appendChild(head);
  const marks = xs.map((x, i) => {
    const m = document.createElement('span');
    m.className = 'scope-mark';
    m.style.left = `${x / W * 100}%`;
    m.style.top = `${(BASE - (HEIGHT[items[i].kind] || 70)) / H * 100}%`;
    m.addEventListener('mouseenter', () => { hover = i; show(i); });
    m.addEventListener('mouseleave', () => { hover = -1; show(active); });
    marksEl.appendChild(m);
    const y = document.createElement('span'); y.className = 'scope-yr'; y.style.left = m.style.left; y.textContent = items[i].year;
    marksEl.appendChild(y);
    return m;
  });

  const [rYear, rTitle, rDetail] = ['.scope-year', '.scope-title', '.scope-detail'].map((s) => read.querySelector(s));
  let active = -1, hover = -1, shown = -2;
  function show(i) {
    if (i === shown) return;
    shown = i;
    marks.forEach((m, k) => m.classList.toggle('on', k === i));
    if (i < 0) { rYear.textContent = 'Signal idle'; rTitle.textContent = 'Scroll to scan'; rDetail.textContent = 'Each spike is a milestone. Gold awards spike highest.'; return; }
    const it = items[i];
    rYear.textContent = `${it.year} · ${it.kind}`;
    rTitle.textContent = it.title;
    rDetail.textContent = it.detail;
  }

  document.querySelector('.sheet')?.classList.add('has-scope');
  const screen = svg.parentElement;
  function update() {
    const r = screen.getBoundingClientRect();
    const p = REDUCE ? 1 : clamp01((innerHeight * 0.9 - r.top) / (innerHeight * 0.55));
    trace.style.strokeDashoffset = `${len * (1 - p)}`;
    head.style.left = `${p * 100}%`;
    head.style.opacity = p > 0 && p < 1 ? '1' : '0';
    active = -1;
    xs.forEach((x, i) => { const lit = x / W <= p + 0.001; marks[i].classList.toggle('lit', lit); if (lit) active = i; });
    if (hover < 0) show(active);
  }
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

// Skills: hover a project to light its pins, or a pin to light its projects.
function initPinout() {
  const box = document.getElementById('pinout');
  if (!box) return;
  const btns = [...box.querySelectorAll('button[data-p]')];
  const pins = [...box.querySelectorAll('li[data-p]')];
  let locked = null, touched = false, demo = null;

  function showProject(p) {
    box.classList.toggle('active', !!p);
    pins.forEach((li) => li.classList.toggle('on', !!p && li.dataset.p.split(' ').includes(p)));
    btns.forEach((b) => b.classList.toggle('on', b.dataset.p === p));
  }
  function showSkill(li) {
    const ps = li.dataset.p.split(' ');
    box.classList.add('active');
    pins.forEach((l) => l.classList.toggle('on', l === li));
    btns.forEach((b) => b.classList.toggle('on', ps.includes(b.dataset.p)));
  }
  const stopDemo = () => { touched = true; clearInterval(demo); };
  btns.forEach((b) => {
    b.addEventListener('mouseenter', () => { stopDemo(); showProject(b.dataset.p); });
    b.addEventListener('focus', () => { stopDemo(); showProject(b.dataset.p); });
    b.addEventListener('mouseleave', () => showProject(locked));
    b.addEventListener('click', () => { stopDemo(); locked = locked === b.dataset.p ? null : b.dataset.p; showProject(locked); });
  });
  pins.forEach((li) => {
    li.addEventListener('mouseenter', () => { stopDemo(); showSkill(li); });
    li.addEventListener('mouseleave', () => showProject(locked));
  });

  // Until someone interacts, cycle through the projects once it scrolls into view.
  if (!REDUCE) onVisible(box, () => {
    let i = 0;
    demo = setInterval(() => {
      if (touched) return clearInterval(demo);
      showProject(btns[i % btns.length].dataset.p);
      i++;
      if (i > btns.length) { clearInterval(demo); showProject(null); }
    }, 1400);
  }, 0.4);
}

function initUI() {
  initCounters();
  initTabs();
  initChips();
  initScope();
  initPinout();
}

initUI();
pageBits();
boot();
start();
