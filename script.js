/* ════════════════════════════════════════
   DATA — Edit these to update your portfolio
════════════════════════════════════════ */

const projects = [
  {
    name: "E-Library",
    icon: "📚",
    status: "live",
    description:
      "Personal media library for anime, movies & books. Features YouTube trailer auto-play with geo-block detection via iframe API, Firebase wishlist sync, and debounced live search on home & explore pages.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase", "TMDB API", "Jikan API"],
    github: "https://github.com/kaiii-dev/eLibrary",
    demo: null,
  },
  {
    name: "AgroEzuran",
    icon: "🌱",
    status: "in-dev",
    description:
      "IoT smart farm monitoring system with real-time sensor dashboards, device management, and a Flutter mobile companion app. Includes a React web frontend and a mobile-responsive admin panel.",
    tech: ["React", "Vite", "Firebase", "Flutter", "Dart", "IoT"],
    github: "https://github.com/kaiii-dev/iot_smart_farm_web",
    demo: null,
  },
  {
    name: "Project Three",
    icon: "⚡",
    status: "live",
    description:
      "A placeholder for your next project. Edit the projects[] array in script.js to replace this with your real project details.",
    tech: ["JavaScript", "Firebase", "CSS"],
    github: null,
    demo: null,
  },
  {
    name: "Project Four",
    icon: "🔧",
    status: "in-dev",
    description:
      "Another placeholder project entry. Add your GitHub link and demo URL once your project is ready to showcase.",
    tech: ["React", "Node.js", "MongoDB"],
    github: null,
    demo: null,
  },
];

const skills = [
  {
    category: "Programming Languages",
    items: ["JavaScript", "Python", "Dart", "PHP", "C++"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Vite", "Tailwind CSS", "Express.js"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "Firebase"],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "GitHub", "Vercel", "VS Code", "XAMPP"],
  },
  {
    category: "APIs & Services",
    items: ["TMDB API", "Jikan API", "MangaDex API", "YouTube iframe API"],
  },
  {
    category: "IoT & Hardware",
    items: ["ESP32", "Arduino", "MQTT"],
  },
];

// ── Replace with your real milestones ──
const roadmap = [
  {
    year: "2022",
    title: "Started Diploma in Computer Science",
    desc: "Began formal CS education, discovered a passion for web development and building things from scratch.",
  },
  {
    year: "2023",
    title: "Built First Full-Stack Web App",
    desc: "Launched E-Library — a personal media library with Firebase, TMDB & Jikan API integration.",
  },
  {
    year: "2024",
    title: "IoT & Mobile Development",
    desc: "Developed AgroEzuran, a smart farm monitoring system combining React, Flutter, Firebase & ESP32.",
  },
  {
    year: "2025",
    title: "Open to Opportunities",
    desc: "Actively seeking internship and junior developer roles in full-stack or mobile development.",
  },
];

// ── Replace with your real education details ──
const education = [
  {
    institution: "Your University / College",
    degree: "Diploma in Computer Science",
    years: "2022 – Present",
    courses: ["Web Development", "Mobile Development", "IoT Systems", "Database Management"],
  },
];

// ── Replace with your real certifications ──
const certifications = [
  {
    name: "Google Data Analytics Certificate",
    issuer: "Google",
    date: "2024",
  },
  {
    name: "Networking Basics",
    issuer: "Cisco",
    date: "2023",
  },
  {
    name: "SAS Programming Fundamentals",
    issuer: "SAS",
    date: "2023",
  },
];

/* ════════════════════════════════════════
   SVG ICONS
════════════════════════════════════════ */
const ICON_GITHUB = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`;

const ICON_EXTERNAL = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

/* ════════════════════════════════════════
   RENDER: ROADMAP
════════════════════════════════════════ */
function renderRoadmap() {
  const list = document.getElementById("roadmapList");
  if (!list) return;

  roadmap.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "roadmap-item reveal";
    div.style.transitionDelay = `${i * 0.1}s`;

    div.innerHTML = `
      <div class="roadmap-node">
        <span class="roadmap-year">${escapeHTML(item.year)}</span>
        <div class="roadmap-dot"></div>
      </div>
      <div class="roadmap-content">
        <h4 class="roadmap-title">${escapeHTML(item.title)}</h4>
        <p class="roadmap-desc">${escapeHTML(item.desc)}</p>
      </div>
    `;

    list.appendChild(div);
  });
}

/* ════════════════════════════════════════
   RENDER: EDUCATION
════════════════════════════════════════ */
function renderEducation() {
  const list = document.getElementById("educationList");
  if (!list) return;

  education.forEach((edu, i) => {
    const card = document.createElement("div");
    card.className = "edu-card reveal";
    card.style.transitionDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <div class="edu-header">
        <div>
          <h3 class="edu-institution">${escapeHTML(edu.institution)}</h3>
          <p class="edu-degree">${escapeHTML(edu.degree)}</p>
        </div>
        <span class="edu-years">${escapeHTML(edu.years)}</span>
      </div>
      <div class="edu-courses">
        ${edu.courses.map(c => `<span class="skill-pill">${escapeHTML(c)}</span>`).join("")}
      </div>
    `;

    list.appendChild(card);
  });
}

/* ════════════════════════════════════════
   RENDER: CERTIFICATIONS
════════════════════════════════════════ */
function renderCertifications() {
  const grid = document.getElementById("certList");
  if (!grid) return;

  certifications.forEach((cert, i) => {
    const card = document.createElement("div");
    card.className = "cert-card reveal";
    card.style.transitionDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <div class="cert-icon">🏅</div>
      <div class="cert-name">${escapeHTML(cert.name)}</div>
      <div class="cert-meta">
        <span class="cert-issuer">${escapeHTML(cert.issuer)}</span>
        <span class="cert-date">${escapeHTML(cert.date)}</span>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ════════════════════════════════════════
   RENDER: SKILLS
════════════════════════════════════════ */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  skills.forEach((group, i) => {
    const div = document.createElement("div");
    div.className = "skill-group reveal";
    div.style.transitionDelay = `${i * 0.07}s`;

    div.innerHTML = `
      <div class="skill-category">${escapeHTML(group.category)}</div>
      <div class="skill-pills">
        ${group.items.map(item => `<span class="skill-pill">${escapeHTML(item)}</span>`).join("")}
      </div>
    `;

    grid.appendChild(div);
  });
}

/* ════════════════════════════════════════
   RENDER: PROJECTS
════════════════════════════════════════ */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  projects.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "project-card reveal";
    card.style.transitionDelay = `${i * 0.1}s`;

    const badgeClass = p.status === "live" ? "badge-live" : "badge-dev";
    const badgeLabel = p.status === "live" ? "Live" : "In Dev";

    const githubBtn = p.github
      ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link">${ICON_GITHUB} GitHub</a>`
      : "";

    const demoBtn = p.demo
      ? `<a href="${p.demo}" target="_blank" rel="noopener" class="project-link">${ICON_EXTERNAL} Live Demo</a>`
      : "";

    card.innerHTML = `
      <div class="project-header">
        <div style="display:flex;flex-direction:column;gap:6px;flex:1">
          <div class="project-icon">${p.icon || "⚡"}</div>
          <span class="project-name">${escapeHTML(p.name)}</span>
        </div>
        <span class="project-badge ${badgeClass}">${badgeLabel}</span>
      </div>
      <p class="project-desc">${escapeHTML(p.description)}</p>
      <div class="project-tech">
        ${p.tech.map(t => `<span class="tech-pill">${escapeHTML(t)}</span>`).join("")}
      </div>
      <div class="project-links">${githubBtn}${demoBtn}</div>
    `;

    grid.appendChild(card);
  });
}

/* ════════════════════════════════════════
   TYPEWRITER
════════════════════════════════════════ */
function initTypewriter() {
  const typedName   = document.getElementById("typedName");
  const blinkCursor = document.getElementById("blinkCursor");
  if (!typedName || !blinkCursor) return;

  const fullName = "Kai Dev";
  let index = 0;

  function type() {
    if (index < fullName.length) {
      typedName.textContent += fullName[index++];
      setTimeout(type, 85);
    } else {
      setTimeout(() => {
        blinkCursor.classList.add("done");
        revealHeroSequence();
      }, 550);
    }
  }

  setTimeout(type, 900);
}

function revealHeroSequence() {
  const elements = ["heroRole", "heroDesc", "heroActions", "heroScroll"];
  elements.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add("visible");
    }, i * 170);
  });
}

/* ════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
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
    { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════
   NAV
════════════════════════════════════════ */
function initNav() {
  const nav       = document.getElementById("nav");
  const navMenu   = document.getElementById("navMenu");
  const navMobile = document.getElementById("navMobile");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navMenu.addEventListener("click", () => navMobile.classList.toggle("open"));

  document.querySelectorAll(".nav-mobile-link").forEach(link => {
    link.addEventListener("click", () => navMobile.classList.remove("open"));
  });
}

/* ════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById("cursor");
  const trail  = document.getElementById("cursorTrail");
  if (!cursor || !trail) return;

  if (!window.matchMedia("(hover: hover)").matches) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.11;
    trailY += (mouseY - trailY) * 0.11;
    trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.addEventListener("mouseover", e => {
    if (e.target.closest("a, button, .project-card, .skill-pill, .btn, .cert-card")) {
      cursor.classList.add("hover");
      trail.classList.add("hover");
    }
  });

  document.addEventListener("mouseout", e => {
    if (e.target.closest("a, button, .project-card, .skill-pill, .btn, .cert-card")) {
      cursor.classList.remove("hover");
      trail.classList.remove("hover");
    }
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    trail.style.opacity  = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    trail.style.opacity  = "1";
  });
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
  renderRoadmap();
  renderEducation();
  renderSkills();
  renderCertifications();
  renderProjects();
  initTypewriter();
  initNav();
  initScrollReveal();  // Must be after render calls so .reveal elements exist
  initCursor();
});
