/* ════════════════════════════════════════
   DATA — Edit these to update your portfolio
════════════════════════════════════════ */

const projects = [
  {
    name: "Taska Zurah Attendance",
    emoji: "👶",
    category: "Mobile / IoT",
    description:
      "NFC-based smart childcare attendance system with real-time parent notifications, fee summaries, and analytics dashboard. Built with Flutter, Firebase, and ESP32 IoT sensors.",
    tech: ["Flutter", "Firebase", "NFC", "ESP32", "JavaFX", "Cloud Messaging"],
    github: "https://github.com/khairulikmal",
    demo: null,
  },
  {
    name: "AgroEzuran",
    emoji: "🌱",
    category: "IoT / Mobile",
    description:
      "Full-stack IoT precision agriculture system with live ESP32 sensor streaming, automated irrigation control, AI crop advisory chatbot via Anthropic API, and OpenWeatherMap integration.",
    tech: ["Flutter", "Firebase", "ESP32", "RESTful APIs", "Anthropic API", "React"],
    github: "https://github.com/khairulikmal/iot_smart_farm_web",
    demo: null,
  },
  {
    name: "Halfday Cafe POS",
    emoji: "☕",
    category: "Full Stack / Web",
    description:
      "Web-based POS and table service platform with digital menu browsing, order customization, receipt-upload payment gateway, and real-time staff order queue with admin analytics dashboard.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/khairulikmal",
    demo: null,
  },
  {
    name: "StudyFlow AI",
    emoji: "🤖",
    category: "AI / Full Stack",
    description:
      "AI-powered study assistant that generates flashcards, summaries, and quizzes from uploaded notes. Built with Claude API and Firebase for real-time sync.",
    tech: ["React", "Firebase", "Claude API", "Node.js"],
    github: null,
    demo: null,
  },
];

const services = [
  {
    title: "FULL-STACK DEVELOPER",
    sub: "Modern web development & scalable applications",
    desc: "Building responsive and performant web applications using React, Vite, Node.js, and databases. Creating seamless user experiences with modern UI/UX principles.",
    tags: ["React", "Vite", "Node.js", "Firebase", "TypeScript"],
  },
  {
    title: "MOBILE DEVELOPER",
    sub: "Cross-platform mobile applications",
    desc: "Developing beautiful and performant mobile apps using Flutter and Dart. Integrating Firebase for real-time backends, authentication, and cloud storage.",
    tags: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "IOT SYSTEMS",
    sub: "Embedded systems & smart device integration",
    desc: "Building IoT solutions with ESP32 and Arduino, connecting hardware to cloud services. Real-time sensor monitoring, device control, and data visualization.",
    tags: ["ESP32", "Arduino", "MQTT", "C++", "React"],
  },
];

const timeline = [
  {
    year: "NOW",
    role: "Learning Something New",
    type: "Self-Development",
    desc: "Continuously exploring emerging technologies, building AI-integrated apps, and pushing the boundaries of what's possible as a developer.",
  },
  {
    year: "2025",
    role: "Full-Stack + Mobile Dev",
    type: "Freelance & Projects",
    desc: "Building complete web and mobile applications. Developing IoT monitoring systems with Flutter, React, and Firebase backends.",
  },
  {
    year: "2024",
    role: "IoT Developer",
    type: "Project Work",
    desc: "Developed AgroEzuran smart farm system — ESP32 sensors, Flutter app, React dashboard, and real-time Firebase integration.",
  },
  {
    year: "2023",
    role: "Web Developer",
    type: "Self-Taught & Projects",
    desc: "Built first full-stack projects including E-Library. Learned JavaScript, React, Firebase, and REST API integration.",
  },
  {
    year: "2022",
    role: "Started CS Diploma",
    type: "Education",
    desc: "Began formal Computer Science education, discovered a passion for web development and building things from scratch.",
  },
];

const techStack = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Dart",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
  { name: "PHP",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "C++",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "HTML",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Vite",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Flutter",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Firebase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
  { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "VS Code",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Vercel",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "Arduino",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" },
  { name: "Figma",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Linux",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
];

const heroRoles = [
  "Full-Stack Developer",
  "Mobile Developer",
  "IoT Engineer",
  "Web Developer",
];

/* ════════════════════════════════════════
   SVG ICONS
════════════════════════════════════════ */
const ICON_GITHUB = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
const ICON_EXTERNAL = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

/* ════════════════════════════════════════
   RENDER: SERVICES (What I Do)
════════════════════════════════════════ */
function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  services.forEach((s) => {
    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
      <div class="sc-tl"></div>
      <div class="sc-br"></div>
      <div class="service-title">${escapeHTML(s.title)}</div>
      <div class="service-sub">${escapeHTML(s.sub)}</div>
      <p class="service-desc">${escapeHTML(s.desc)}</p>
      <div class="service-tags">
        ${s.tags.map(t => `<span class="service-tag">${escapeHTML(t)}</span>`).join("")}
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ════════════════════════════════════════
   RENDER: TIMELINE
════════════════════════════════════════ */
function renderTimeline() {
  const wrap = document.getElementById("timelineList");
  if (!wrap) return;

  timeline.forEach((item) => {
    const el = document.createElement("div");
    el.className = "timeline-item";

    el.innerHTML = `
      <div class="tl-role-col">
        <div class="tl-role">${escapeHTML(item.role)}</div>
        <div class="tl-type">${escapeHTML(item.type)}</div>
      </div>
      <div class="tl-year-col">
        <div class="tl-year">${escapeHTML(item.year)}</div>
      </div>
      <div class="tl-line-col"></div>
      <div class="tl-desc-col">
        <p class="tl-desc">${escapeHTML(item.desc)}</p>
      </div>
    `;
    wrap.appendChild(el);
  });
}

/* ════════════════════════════════════════
   RENDER: PROJECTS
════════════════════════════════════════ */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  projects.forEach((p, i) => {
    const col = document.createElement("div");
    col.className = "project-col";

    const num = String(i + 1).padStart(2, "0");
    const githubBtn = p.github
      ? `<a href="${p.github}" target="_blank" rel="noopener" class="proj-link">${ICON_GITHUB} GitHub</a>`
      : "";
    const demoBtn = p.demo
      ? `<a href="${p.demo}" target="_blank" rel="noopener" class="proj-link">${ICON_EXTERNAL} Live Demo</a>`
      : "";

    col.innerHTML = `
      <span class="proj-num">${num}</span>
      <div class="proj-name">${escapeHTML(p.name)}</div>
      <div class="proj-category">${escapeHTML(p.category)}</div>
      <div class="proj-img">${p.emoji || "⚡"}</div>
      <div class="proj-tools">
        ${p.tech.map(t => `<span class="proj-tool">${escapeHTML(t)}</span>`).join("")}
      </div>
      <div class="proj-links">${githubBtn}${demoBtn}</div>
    `;
    grid.appendChild(col);
  });
}

/* ════════════════════════════════════════
   TECH SPHERE — 3D interactive
════════════════════════════════════════ */
function initTechSphere() {
  const stage = document.getElementById("techSphere");
  if (!stage) return;

  /* ── Canvas for wireframe ── */
  const canvas = document.createElement("canvas");
  stage.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  /* ── State ── */
  let rotX = 0.25;
  let rotY = 0;
  let velX = 0;
  let velY = 0.0008; // base auto-rotate speed
  let isDragging = false;
  let lastX = 0, lastY = 0;
  let stageSize = 520, radius = 200, cx = 260, cy = 260;

  /* ── Fibonacci sphere point distribution ── */
  const n = techStack.length;
  const points = techStack.map((_, i) => {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.cos(phi),
      z: Math.sin(phi) * Math.sin(theta),
    };
  });

  /* ── Create icon DOM nodes ── */
  const iconEls = techStack.map((item) => {
    const el  = document.createElement("div");
    el.className = "sphere-icon";
    const img = document.createElement("img");
    img.src     = item.icon;
    img.alt     = item.name;
    img.loading = "lazy";
    img.setAttribute("draggable", "false");
    const label = document.createElement("span");
    label.className = "sphere-icon-name";
    label.textContent = item.name;
    el.appendChild(img);
    el.appendChild(label);
    stage.appendChild(el);
    return el;
  });

  /* ── Rotation helper ── */
  function rotatePoint(px, py, pz) {
    // Y-axis rotation
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const rx  =  px * cosY + pz * sinY;
    const rz0 = -px * sinY + pz * cosY;
    // X-axis rotation
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const ry  = py * cosX - rz0 * sinX;
    const rz  = py * sinX + rz0 * cosX;
    return { x: rx, y: ry, z: rz };
  }

  /* ── Canvas resize ── */
  function resize() {
    const s  = Math.min(stage.offsetWidth, 520);
    stageSize = s;
    canvas.width  = s;
    canvas.height = s;
    stage.style.height = s + "px";
    radius = s * 0.38;
    cx = cy = s / 2;
  }

  /* ── Draw wireframe lines ── */
  function drawWireframe() {
    ctx.clearRect(0, 0, stageSize, stageSize);

    // Ambient glow behind sphere
    const grad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.35);
    grad.addColorStop(0,   "rgba(29, 78, 216, 0.22)");
    grad.addColorStop(0.6, "rgba(88,  28, 200, 0.08)");
    grad.addColorStop(1,   "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
    ctx.fill();

    const lineColor = "rgba(59, 130, 246, ";

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 10) {
      const latRad = lat * Math.PI / 180;
      const r0 = Math.cos(latRad);
      const y0 = Math.sin(latRad);
      ctx.beginPath();
      let first = true;
      for (let t = 0; t <= Math.PI * 2 + 0.05; t += 0.07) {
        const p  = rotatePoint(r0 * Math.cos(t), y0, r0 * Math.sin(t));
        const sx = cx + p.x * radius;
        const sy = cy + p.y * radius;
        if (first) { ctx.moveTo(sx, sy); first = false; }
        else        ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = lineColor + "0.10)";
      ctx.lineWidth   = 0.7;
      ctx.stroke();
    }

    // Longitude lines
    for (let lon = 0; lon < 180; lon += 10) {
      const lonRad = lon * Math.PI / 180;
      ctx.beginPath();
      let first = true;
      for (let t = 0; t <= Math.PI * 2 + 0.05; t += 0.07) {
        const p  = rotatePoint(
          Math.sin(t) * Math.cos(lonRad),
          Math.cos(t),
          Math.sin(t) * Math.sin(lonRad)
        );
        const sx = cx + p.x * radius;
        const sy = cy + p.y * radius;
        if (first) { ctx.moveTo(sx, sy); first = false; }
        else        ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = lineColor + "0.08)";
      ctx.lineWidth   = 0.7;
      ctx.stroke();
    }

    // Outer circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = lineColor + "0.22)";
    ctx.lineWidth   = 1.2;
    ctx.stroke();
  }

  /* ── Position icons by depth ── */
  function positionIcons() {
    const projected = points.map((p, i) => {
      const r = rotatePoint(p.x, p.y, p.z);
      return { ...r, i };
    });
    // Sort back→front so front icons render on top via z-index
    projected.sort((a, b) => a.z - b.z);

    projected.forEach(({ x, y, z, i }) => {
      const depth   = (z + 1) / 2;          // 0 = back, 1 = front
      const scale   = 0.42 + depth * 0.58;  // 0.42 → 1.0
      const opacity = 0.2  + depth * 0.8;
      const sx = cx + x * radius;
      const sy = cy + y * radius;
      const el = iconEls[i];
      el.style.transform = `translate(${sx}px,${sy}px) translate(-50%,-50%) scale(${scale})`;
      el.style.opacity   = opacity;
      el.style.zIndex    = Math.round(depth * 20);
    });
  }

  /* ── Animation loop ── */
  function animate() {
    requestAnimationFrame(animate);

    if (isDragging) {
      // Apply inertia while dragging
      rotY += velY;
      rotX += velX;
      velX *= 0.82;
      velY *= 0.82;
    } else {
      // Auto-rotate + decay inertia after release
      velY = velY * 0.96 + 0.0008 * 0.04; // blend toward base speed
      velX *= 0.96;
      rotY += velY;
      rotX += velX;
      // Softly return X tilt toward 0.25
      rotX += (0.25 - rotX) * 0.008;
    }

    drawWireframe();
    positionIcons();
  }

  /* ── Input handlers ── */
  function onDown(clientX, clientY) {
    isDragging = true;
    lastX = clientX; lastY = clientY;
    velX = 0; velY = 0;
    stage.style.cursor = "grabbing";
  }
  function onMove(clientX, clientY) {
    if (!isDragging) return;
    velY = (clientX - lastX) * 0.009;
    velX = (clientY - lastY) * 0.009;
    rotY += velY;
    rotX += velX;
    lastX = clientX; lastY = clientY;
  }
  function onUp() {
    isDragging = false;
    stage.style.cursor = "grab";
  }

  stage.addEventListener("mousedown",  e => { e.preventDefault(); onDown(e.clientX, e.clientY); });
  window.addEventListener("mousemove", e => onMove(e.clientX, e.clientY));
  window.addEventListener("mouseup",   () => onUp());
  stage.addEventListener("touchstart", e => { e.preventDefault(); onDown(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  window.addEventListener("touchmove", e => { if (isDragging) { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: false });
  window.addEventListener("touchend",  () => onUp());

  /* ── Init ── */
  resize();
  window.addEventListener("resize", resize);
  animate();
}

/* ════════════════════════════════════════
   TIMELINE METEOR EFFECT
════════════════════════════════════════ */
function initTimelineMeteor() {
  const wrap = document.getElementById("timelineList");
  if (!wrap) return;

  // Create trail and meteor elements
  const trail  = document.createElement("div");
  const meteor = document.createElement("div");
  trail.className  = "tl-trail";
  meteor.className = "tl-meteor";
  wrap.appendChild(trail);
  wrap.appendChild(meteor);

  // Grid layout: 1fr 200px 56px 1fr
  // Col3 center = 1fr + 200px + 28px, where 1fr = (wrapW - 256) / 2
  // This avoids any DOM child measurement issues (GSAP transforms, render timing, etc.)
  function getLineX() {
    if (window.innerWidth <= 768) return 16; // mobile uses fixed left edge
    const wrapW = wrap.offsetWidth;
    const oneFr = Math.max(0, (wrapW - 256) / 2); // 256 = 200 + 56
    return oneFr + 228; // 200 (year col) + 28 (half of 56px line col)
  }

  function update() {
    const x     = getLineX();
    const rect  = wrap.getBoundingClientRect();
    const wrapH = wrap.offsetHeight;

    // Sync the ::before base line to col 3 center via CSS variable
    wrap.style.setProperty("--tl-line-x", x + "px");

    // Progress: 0 when section enters viewport, 1 when it exits bottom
    const viewAnchor  = window.innerHeight * 0.55;
    const distFromTop = viewAnchor - rect.top;
    const progress    = Math.max(0, Math.min(1, distFromTop / wrapH));
    const dotY        = progress * wrapH;

    // Position trail and meteor at col-3 centre X
    trail.style.left   = x + "px";
    trail.style.height = dotY + "px";
    meteor.style.left  = x + "px";
    meteor.style.top   = dotY + "px";
  }

  // Double-raf ensures layout is fully painted before first measurement
  requestAnimationFrame(() => requestAnimationFrame(update));
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}

/* ════════════════════════════════════════
   HERO ROLE CYCLE
════════════════════════════════════════ */
function initRoleCycle() {
  const roleCurrent  = document.getElementById("roleCurrent");
  const roleOutgoing = document.getElementById("roleOutgoing");
  if (!roleCurrent || !roleOutgoing) return;

  let idx = 0;

  setInterval(() => {
    const next = heroRoles[(idx + 1) % heroRoles.length];

    // Show outgoing (current fading out)
    roleOutgoing.textContent = roleCurrent.textContent;
    roleOutgoing.style.opacity = "0.35";

    // Swap current
    roleCurrent.style.opacity = "0";
    setTimeout(() => {
      roleCurrent.textContent = next;
      roleCurrent.classList.remove("entering");
      void roleCurrent.offsetWidth; // force reflow
      roleCurrent.classList.add("entering");
      roleCurrent.style.opacity = "1";
      roleOutgoing.style.opacity = "0";
    }, 350);

    idx = (idx + 1) % heroRoles.length;
  }, 3200);
}

/* ════════════════════════════════════════
   SCROLL PROGRESS BAR
════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + "%";
  }, { passive: true });
}

/* ════════════════════════════════════════
   GSAP ANIMATIONS
════════════════════════════════════════ */
function initGSAPAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    // GSAP failed to load — fall back to simple reveal
    document.querySelectorAll(".reveal, .service-card, .timeline-item, .project-col, .tech-item").forEach(el => {
      el.style.opacity = "1";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Defaults ──────────────────────────────────────────────
  gsap.defaults({ ease: "power3.out" });

  // ── Hero entrance (on load, no scroll needed) ─────────────
  const heroTl = gsap.timeline({ delay: 0.15 });
  heroTl
    .from(".hero-greeting",      { y: 30, opacity: 0, duration: 0.6 })
    .from(".hero-name",          { y: 60, opacity: 0, duration: 0.9, ease: "power4.out" }, "-=0.3")
    .from(".avatar-wrap",        { scale: 0.75, opacity: 0, duration: 1.1, ease: "back.out(1.4)" }, "-=0.55")
    .from(".hero-role-prefix",   { y: 24, opacity: 0, duration: 0.55 }, "-=0.65")
    .from(".role-current",       { y: 24, opacity: 0, duration: 0.65 }, "-=0.4")
    .from(".social-sidebar",     { x: -30, opacity: 0, duration: 0.6 }, "-=0.5")
    .from(".resume-fixed",       { y: 20, opacity: 0, duration: 0.5 }, "-=0.5")
    .from(".nav-logo, .nav-email, .nav-links", { y: -20, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.6");

  // ── Parallax on hero ambient orbs ─────────────────────────
  gsap.to(".amb-orb--l", {
    y: -180,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 2 }
  });
  gsap.to(".amb-orb--r", {
    y: -100,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 2.5 }
  });

  // ── Section heading — clip-path wipe + translate ──────────
  gsap.utils.toArray(".section-heading").forEach(el => {
    gsap.from(el, {
      y: 70,
      opacity: 0,
      clipPath: "inset(0 0 100% 0)",
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
    });
  });

  // ── Section label (ABOUT ME etc.) ─────────────────────────
  gsap.utils.toArray(".section-label").forEach(el => {
    gsap.from(el, {
      x: -40,
      opacity: 0,
      duration: 0.65,
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
    });
  });

  // ── About ─────────────────────────────────────────────────
  gsap.from(".about-avatar-wrap", {
    scale: 0.6,
    opacity: 0,
    duration: 1.1,
    ease: "back.out(1.5)",
    scrollTrigger: { trigger: "#about", start: "top 75%", toggleActions: "play none none reverse" }
  });

  gsap.from(".about-bio", {
    y: 50,
    opacity: 0,
    duration: 0.85,
    stagger: 0.16,
    scrollTrigger: { trigger: "#about", start: "top 72%", toggleActions: "play none none reverse" }
  });

  gsap.from(".stat-item", {
    x: 40,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    scrollTrigger: { trigger: ".about-stats", start: "top 88%", toggleActions: "play none none reverse" }
  });

  // ── What I Do — background watermark parallax ─────────────
  gsap.to(".what-bg-text", {
    y: -120,
    ease: "none",
    scrollTrigger: { trigger: ".what-section", start: "top bottom", end: "bottom top", scrub: 1.5 }
  });

  // ── Service cards — slide in from right with stagger ──────
  gsap.from(".service-card", {
    x: 90,
    opacity: 0,
    duration: 0.75,
    stagger: 0.14,
    ease: "power3.out",
    scrollTrigger: { trigger: ".services-grid", start: "top 82%", toggleActions: "play none none reverse" }
  });

  // ── Timeline — alternate left / right ─────────────────────
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.from(item, {
      x: i % 2 === 0 ? -65 : 65,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 86%", toggleActions: "play none none reverse" }
    });
  });

  // ── Projects — columns rise with stagger ──────────────────
  gsap.from(".project-col", {
    y: 80,
    opacity: 0,
    duration: 0.75,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: "#projects", start: "top 78%", toggleActions: "play none none reverse" }
  });

  gsap.from(".projects-more", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    scrollTrigger: { trigger: ".projects-more", start: "top 90%", toggleActions: "play none none reverse" }
  });

  // ── Tech Stack — title reveal ─────────────────────────────
  gsap.from(".tech-title", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: { trigger: ".tech-section", start: "top 78%", toggleActions: "play none none reverse" }
  });
  gsap.from(".sphere-stage", {
    opacity: 0,
    scale: 0.85,
    duration: 1.2,
    ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".tech-section", start: "top 72%", toggleActions: "play none none reverse" }
  });

  // ── Contact ───────────────────────────────────────────────
  gsap.from(".contact-ctas .btn-cta", {
    y: 40,
    opacity: 0,
    duration: 0.65,
    stagger: 0.15,
    scrollTrigger: { trigger: ".contact-ctas", start: "top 85%", toggleActions: "play none none reverse" }
  });

  // Contact name — big clip-path reveal
  gsap.from(".contact-name", {
    y: 80,
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    duration: 1.1,
    ease: "power4.out",
    scrollTrigger: { trigger: ".contact-footer", start: "top 80%", toggleActions: "play none none reverse" }
  });

  gsap.from(".contact-grid > div", {
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    scrollTrigger: { trigger: ".contact-grid", start: "top 85%", toggleActions: "play none none reverse" }
  });
}

/* ════════════════════════════════════════
   NAV SCROLL EFFECT
════════════════════════════════════════ */
function initNav() {
  const nav     = document.getElementById("nav");
  const burger  = document.getElementById("navMenu");
  const drawer  = document.getElementById("navDrawer");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => drawer.classList.toggle("open"));

  document.querySelectorAll(".nav-drawer-link").forEach(link => {
    link.addEventListener("click", () => drawer.classList.remove("open"));
  });
}

/* ════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════ */
/* ════════════════════════════════════════
   TORCH / FLASHLIGHT EFFECT
════════════════════════════════════════ */
function initTorch() {
  if (!window.matchMedia("(hover: hover)").matches) return;

  // Glow overlay
  const overlay = document.createElement("div");
  overlay.className = "torch-overlay";
  document.body.appendChild(overlay);

  // Dot reveal overlay
  const dotReveal = document.createElement("div");
  dotReveal.className = "dot-reveal";
  document.body.appendChild(dotReveal);

  let targetX = window.innerWidth  / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("mousemove", e => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  // Hide both when cursor leaves window
  document.addEventListener("mouseleave", () => {
    overlay.style.opacity   = "0";
    dotReveal.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    overlay.style.opacity   = "1";
    dotReveal.style.opacity = "1";
  });

  function update() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    // Soft blue glow
    overlay.style.background = `radial-gradient(
      circle 320px at ${currentX}px ${currentY}px,
      rgba(125, 211, 252, 0.12) 0%,
      rgba(56, 189, 248, 0.05) 45%,
      transparent 70%
    )`;

    // Dot reveal mask — shows bright dots only inside torch radius
    const mask = `radial-gradient(circle 280px at ${currentX}px ${currentY}px, black 0%, transparent 75%)`;
    dotReveal.style.maskImage         = mask;
    dotReveal.style.webkitMaskImage   = mask;

    requestAnimationFrame(update);
  }
  update();
}

function initCursor() {
  const cursor = document.getElementById("cursor");
  if (!cursor) return;
  if (!window.matchMedia("(hover: hover)").matches) return;

  let mx = 0, my = 0;

  document.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  }, { passive: true });

  document.addEventListener("mouseover", e => {
    if (e.target.closest("a, button, .project-col, .service-card, .tech-item, .btn-cta, .btn-see-more")) {
      cursor.classList.add("big");
    }
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest("a, button, .project-col, .service-card, .tech-item, .btn-cta, .btn-see-more")) {
      cursor.classList.remove("big");
    }
  });

  document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
  document.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });
}

/* ════════════════════════════════════════
   UTILITY
════════════════════════════════════════ */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // Render dynamic content first — GSAP needs elements to exist
  renderServices();
  renderTimeline();
  renderProjects();
  initTechSphere();

  // Features
  initRoleCycle();
  initTimelineMeteor();
  initNav();
  initScrollProgress();
  initGSAPAnimations();  // must run after render calls
  initTorch();
  initCursor();
});
