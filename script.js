/* ════════════════════════════════════════
   DATA — Edit these to update your portfolio
════════════════════════════════════════ */

const projects = [
  {
    name: "E-Library",
    emoji: "📚",
    category: "Full Stack / Web",
    description:
      "Personal media library for anime, movies & books. Features YouTube trailer auto-play with geo-block detection, Firebase wishlist sync, and debounced live search.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase", "TMDB API", "Jikan API"],
    github: "https://github.com/kaiii-dev/eLibrary",
    demo: null,
  },
  {
    name: "AgroEzuran",
    emoji: "🌱",
    category: "IoT / Mobile",
    description:
      "IoT smart farm monitoring system with real-time sensor dashboards, device management, and a Flutter mobile companion app with React web frontend.",
    tech: ["React", "Vite", "Firebase", "Flutter", "Dart", "ESP32"],
    github: "https://github.com/kaiii-dev/iot_smart_farm_web",
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
  {
    name: "Project Four",
    emoji: "⚡",
    category: "Full Stack",
    description:
      "Another placeholder project entry. Add your GitHub link and demo URL once your project is ready to showcase.",
    tech: ["React", "Node.js", "MongoDB"],
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

  services.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.style.transitionDelay = `${i * 0.1}s`;

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

  timeline.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "timeline-item";
    el.style.transitionDelay = `${i * 0.08}s`;

    el.innerHTML = `
      <div class="tl-left">
        <div class="tl-role">${escapeHTML(item.role)}</div>
        <div class="tl-type">${escapeHTML(item.type)}</div>
      </div>
      <div class="tl-center">
        <div class="tl-year">${escapeHTML(item.year)}</div>
      </div>
      <div class="tl-right">
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
    col.style.transitionDelay = `${i * 0.09}s`;

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
   RENDER: TECH STACK
════════════════════════════════════════ */
function renderTechStack() {
  const grid = document.getElementById("techGrid");
  if (!grid) return;

  techStack.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "tech-item";
    el.style.transitionDelay = `${i * 0.04}s`;
    el.title = item.name;

    el.innerHTML = `
      <div class="tech-icon">
        <img src="${item.icon}" alt="${escapeHTML(item.name)}" loading="lazy"
          onerror="this.parentElement.innerHTML='<span style=\\'font-size:1.4rem\\'>${item.name.slice(0,2)}</span>'" />
      </div>
      <div class="tech-name">${escapeHTML(item.name)}</div>
    `;
    grid.appendChild(el);
  });
}

/* ════════════════════════════════════════
   TIMELINE METEOR EFFECT
════════════════════════════════════════ */
function initTimelineMeteor() {
  const wrap = document.getElementById("timelineList");
  if (!wrap) return;

  // Create trail (the glowing line above the meteor)
  const trail = document.createElement("div");
  trail.className = "tl-trail";
  wrap.appendChild(trail);

  // Create the meteor dot
  const meteor = document.createElement("div");
  meteor.className = "tl-meteor";
  wrap.appendChild(meteor);

  function update() {
    const rect    = wrap.getBoundingClientRect();
    const wrapH   = wrap.offsetHeight;

    // Anchor: meteor starts entering at top of section, finishes at bottom
    // Use viewport 55% mark as the tracking point
    const viewAnchor = window.innerHeight * 0.55;
    const distFromTop = viewAnchor - rect.top;
    const progress = Math.max(0, Math.min(1, distFromTop / wrapH));

    const dotY = progress * wrapH;

    // Move meteor
    meteor.style.top = dotY + "px";

    // Grow the trail from top down to meteor position
    trail.style.height = dotY + "px";
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
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
   SCROLL REVEAL (IntersectionObserver)
════════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.07, rootMargin: "0px 0px -28px 0px" }
  );

  const targets = [
    ...document.querySelectorAll(".reveal"),
    ...document.querySelectorAll(".service-card"),
    ...document.querySelectorAll(".timeline-item"),
    ...document.querySelectorAll(".project-col"),
    ...document.querySelectorAll(".tech-item"),
  ];

  targets.forEach(el => observer.observe(el));
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
  renderServices();
  renderTimeline();
  renderProjects();
  renderTechStack();
  initRoleCycle();
  initTimelineMeteor();
  initNav();
  initScrollReveal();  // must run after all render calls
  initCursor();
});
