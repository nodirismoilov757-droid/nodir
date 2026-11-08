/* =========================================================
   NODIR PORTFOLIO — script.js
   ---------------------------------------------------------
   ⚙️  SOZLAMALAR (CONFIG) — shu yerdan oson o'zgartirasiz
   ========================================================= */
const CONFIG = {
  // Profil rasmi yo'li. Rasmingizni "images" papkasiga profile.jpg nomi bilan qo'ying.
  // (Yoki saytning o'zida "Rasmni almashtirish" tugmasi orqali yuklang.)
  defaultProfile: "images/profile.jpg",

  // Bosh sahifadagi yozuv effekti uchun kasblar
  roles: ["Web Developer", "Frontend Engineer", "UI / UX Enthusiast", "Problem Solver"],

  // Galereya: rasm yo'lini "src" ga yozing. Bo'sh qolsa, chiroyli avtomatik rasm chiqadi.
  gallery: [
    { src: "images/gallery-1.jpg", title: "Ish joyim" },
    { src: "images/gallery-2.jpg", title: "Kod yozish lahzalari" },
    { src: "images/gallery-3.jpg", title: "Sayohat" },
    { src: "images/gallery-4.jpg", title: "Tadbirlar" },
    { src: "images/gallery-5.jpg", title: "Jamoa bilan" },
    { src: "images/gallery-6.jpg", title: "Ilhom manbalari" },
  ],
};

/* =========================================================
   YORDAMCHI FUNKSIYALAR
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none)").matches;

/** Rasm topilmasa ko'rsatiladigan avatar (SVG) */
function avatarSVG() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1e3a8a"/><stop offset=".55" stop-color="#2563eb"/><stop offset="1" stop-color="#22d3ee"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#g)"/>
    <circle cx="200" cy="155" r="68" fill="rgba(255,255,255,.9)"/>
    <path d="M60 400c0-86 62-140 140-140s140 54 140 140z" fill="rgba(255,255,255,.9)"/>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/** Galereya uchun avtomatik chiroyli rasm (SVG) */
function artSVG(i, title) {
  const palettes = [
    ["#0b1b4d", "#2563eb", "#22d3ee"],
    ["#06223f", "#0ea5e9", "#67e8f9"],
    ["#14125c", "#3b82f6", "#38bdf8"],
    ["#081a3a", "#1d4ed8", "#93c5fd"],
    ["#04283a", "#0891b2", "#5eead4"],
    ["#0f1a55", "#4f6bf0", "#7dd3fc"],
  ];
  const [c1, c2, c3] = palettes[i % palettes.length];
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="b" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c3}" stop-opacity=".9"/><stop offset="1" stop-color="${c3}" stop-opacity="0"/></radialGradient>
      <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.07)"/></pattern>
    </defs>
    <rect width="800" height="600" fill="url(#a)"/>
    <rect width="800" height="600" fill="url(#p)"/>
    <circle cx="${200 + i * 70}" cy="${180 + (i % 3) * 90}" r="260" fill="url(#b)"/>
    <circle cx="${620 - i * 40}" cy="${420 - (i % 2) * 140}" r="150" fill="url(#b)" opacity=".7"/>
    <g fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2">
      <circle cx="400" cy="300" r="90"/><circle cx="400" cy="300" r="140" stroke-dasharray="6 10"/><circle cx="400" cy="300" r="190" opacity=".5"/>
    </g>
    <text x="400" y="312" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="rgba(255,255,255,.92)" letter-spacing="2">${title}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/** Kichik xabarnoma (toast) */
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* =========================================================
   1. LOADER
   ========================================================= */
function initLoader() {
  const loader = $("#loader");
  const bar = $("#loaderBar");
  const percentEl = $("#loaderPercent");
  let progress = 0;
  let pageLoaded = document.readyState === "complete";
  let finished = false;

  window.addEventListener("load", () => (pageLoaded = true));

  const finish = () => {
    if (finished) return;
    finished = true;
    bar.style.width = "100%";
    percentEl.textContent = "100";
    setTimeout(() => {
      loader.classList.add("hide");
      document.body.classList.remove("no-scroll");
      startPage();
    }, 350);
  };

  document.body.classList.add("no-scroll");

  const timer = setInterval(() => {
    // 90% gacha tez, keyin sahifa yuklanishini kutadi
    const cap = pageLoaded ? 100 : 90;
    progress = Math.min(cap, progress + Math.random() * 9 + 3);
    bar.style.width = progress + "%";
    percentEl.textContent = Math.floor(progress);
    if (progress >= 100) {
      clearInterval(timer);
      finish();
    }
  }, 90);

  // Xavfsizlik: har qanday holatda 5 soniyadan keyin sayt ochiladi
  setTimeout(() => { clearInterval(timer); finish(); }, 5000);
}

/** Loader tugagach ishga tushadigan narsalar */
function startPage() {
  initReveal();
  initCounters();
  initTyping();
}

/* =========================================================
   2. SCROLL REVEAL (paydo bo'lish animatsiyasi)
   ========================================================= */
function initReveal() {
  const items = $$(".reveal");

  // Bir xil ota ichidagi elementlarga ketma-ket kechikish beramiz
  items.forEach((el) => {
    const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
    const index = siblings.indexOf(el);
    el.style.setProperty("--d", Math.min(index * 0.09, 0.45) + "s");
  });

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* =========================================================
   3. YOZUV EFFEKTI (typing)
   ========================================================= */
function initTyping() {
  const target = $("#typedText");
  if (!target) return;

  if (prefersReducedMotion) {
    target.textContent = CONFIG.roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const word = CONFIG.roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 95;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1700;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % CONFIG.roles.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  };
  tick();
}

/* =========================================================
   4. RAQAMLAR SANALISHI (Home statistikasi)
   ========================================================= */
function animateNumber(el, to, suffix = "", duration = 1800) {
  if (prefersReducedMotion) {
    el.textContent = to + suffix;
    return;
  }
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(to * eased) + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  $$("[data-count]").forEach((el) => {
    animateNumber(el, Number(el.dataset.count), el.dataset.suffix || "");
  });
}

/* =========================================================
   5. NAVBAR, SCROLL PROGRESS, SCROLL SPY, TO-TOP
   ========================================================= */
function initNavigation() {
  const navbar = $("#navbar");
  const burger = $("#burger");
  const navLinks = $("#navLinks");
  const links = $$(".nav-link");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");
  const sections = links
    .map((a) => $(a.getAttribute("href")))
    .filter(Boolean);

  const closeMenu = () => {
    burger.classList.remove("open");
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Menyuni ochish");
  };

  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    navLinks.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menyuni yopish" : "Menyuni ochish");
  });

  links.forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !burger.contains(e.target)) closeMenu();
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 860) closeMenu(); });

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    navbar.classList.toggle("scrolled", y > 30);
    toTop.classList.toggle("show", y > 600);
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";

    // Scroll spy: qaysi bo'lim ko'rinib turibdi
    const probe = y + window.innerHeight * 0.35;
    let current = sections[0];
    sections.forEach((sec) => { if (sec.offsetTop <= probe) current = sec; });
    if (y + window.innerHeight >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current.id));

    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
}

/* =========================================================
   6. SKILLS — foizli animatsiya
   ========================================================= */
function initSkills() {
  const skills = $$(".skill");

  const run = (skill) => {
    const level = Number(skill.dataset.level);
    const fill = $(".bar-fill", skill);
    const pct = $(".skill-pct", skill);
    fill.style.width = level + "%";
    animateNumber(pct, level, "%", 1600);
  };

  if (!("IntersectionObserver" in window)) { skills.forEach(run); return; }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        run(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skills.forEach((s) => observer.observe(s));
}

/* =========================================================
   7. PROJECTS — filtr va 3D tilt effekti
   ========================================================= */
function initProjects() {
  const filters = $$(".filter");
  const projects = $$(".project");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;

      projects.forEach((p) => {
        const show = cat === "all" || p.dataset.cat === cat;
        p.classList.toggle("hidden", !show);
        if (show) {
          p.classList.add("visible"); // ko'rinadigan bo'lsin
          p.classList.remove("pop");
          void p.offsetWidth; // animatsiyani qayta ishga tushirish
          p.classList.add("pop");
        }
      });
    });
  });

  projects.forEach((p) => p.addEventListener("animationend", () => p.classList.remove("pop")));
}

function initTilt() {
  if (isTouch || prefersReducedMotion) return;

  $$(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rotY = ((x / r.width) - 0.5) * 10;
      const rotX = (0.5 - (y / r.height)) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      card.style.setProperty("--mx", x + "px");
      card.style.setProperty("--my", y + "px");
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  // Home'dagi kod kartasi uchun yengil tilt
  const code = $("#codeCard");
  const visual = $(".hero-visual");
  if (code && visual) {
    visual.addEventListener("mousemove", (e) => {
      const r = visual.getBoundingClientRect();
      const rotY = ((e.clientX - r.left) / r.width - 0.5) * 14;
      const rotX = (0.5 - (e.clientY - r.top) / r.height) * 14;
      code.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    visual.addEventListener("mouseleave", () => { code.style.transform = ""; });
  }
}

/* =========================================================
   8. GALLERY + LIGHTBOX
   ========================================================= */
function initGallery() {
  const grid = $("#galleryGrid");
  const lightbox = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCaption = $("#lbCaption");
  let current = 0;

  CONFIG.gallery.forEach((item, i) => {
    const fallback = artSVG(i, item.title);
    const figure = document.createElement("figure");
    figure.className = "g-item reveal";
    figure.tabIndex = 0;
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", item.title + " — kattalashtirish");

    const img = document.createElement("img");
    img.alt = item.title;
    img.loading = "lazy";
    img.onerror = () => { img.onerror = null; img.src = fallback; };
    img.src = item.src || fallback;

    const cap = document.createElement("figcaption");
    cap.className = "g-cap";
    cap.innerHTML = `<span></span><i class="fa-solid fa-expand"></i>`;
    cap.firstChild.textContent = item.title;

    figure.append(img, cap);
    grid.appendChild(figure);

    const open = () => openAt(i);
    figure.addEventListener("click", open);
    figure.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });

  const items = () => $$(".g-item img", grid);

  function render() {
    const imgs = items();
    lbImg.src = imgs[current].currentSrc || imgs[current].src;
    lbImg.alt = CONFIG.gallery[current].title;
    lbCaption.textContent = `${CONFIG.gallery[current].title}  •  ${current + 1} / ${imgs.length}`;
  }

  function openAt(i) {
    current = i;
    render();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  const next = () => { current = (current + 1) % CONFIG.gallery.length; render(); };
  const prev = () => { current = (current - 1 + CONFIG.gallery.length) % CONFIG.gallery.length; render(); };

  $("#lbClose").addEventListener("click", close);
  $("#lbNext").addEventListener("click", next);
  $("#lbPrev").addEventListener("click", prev);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Telefonda surib (swipe) almashtirish
  let startX = 0;
  lightbox.addEventListener("touchstart", (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  }, { passive: true });
}

/* =========================================================
   9. PROFIL RASMINI ALMASHTIRISH
   ========================================================= */
function initProfilePhoto() {
  const STORAGE_KEY = "nodir_portfolio_profile";
  const img = $("#profileImg");
  const input = $("#photoInput");

  function setPhoto(src) {
    img.onerror = () => { img.onerror = null; img.src = avatarSVG(); };
    img.src = src;
  }

  // Oldin saqlangan rasm bo'lsa — yuklaymiz
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) { /* ruxsat yo'q */ }
  setPhoto(saved || CONFIG.defaultProfile);

  $("#changePhotoBtn").addEventListener("click", () => input.click());

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Iltimos, rasm faylini tanlang");
      input.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const tmp = new Image();
      tmp.onload = () => {
        // Rasmni kichraytirib saqlaymiz (xotira tejalishi uchun)
        const max = 700;
        const scale = Math.min(1, max / Math.max(tmp.width, tmp.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(tmp.width * scale);
        canvas.height = Math.round(tmp.height * scale);
        canvas.getContext("2d").drawImage(tmp, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL("image/jpeg", 0.88);

        setPhoto(data);
        try {
          localStorage.setItem(STORAGE_KEY, data);
          showToast("Profil rasmi yangilandi ✓");
        } catch (_) {
          showToast("Rasm o'zgardi (brauzer uni saqlay olmadi)");
        }
      };
      tmp.onerror = () => showToast("Rasmni o'qib bo'lmadi");
      tmp.src = reader.result;
    };
    reader.readAsDataURL(file);
    input.value = "";
  });

  $("#resetPhotoBtn").addEventListener("click", () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* e'tiborsiz */ }
    setPhoto(CONFIG.defaultProfile);
    showToast("Asl rasm qaytarildi");
  });
}

/* =========================================================
   10. EMAILNI NUSXALASH
   ========================================================= */
function initCopyEmail() {
  const btn = $("#copyEmailBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch (_) {
      // Eski brauzerlar uchun zaxira usul
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (__) { /* e'tiborsiz */ }
      ta.remove();
    }
    showToast("Email nusxalandi: " + email);
  });
}

/* =========================================================
   11. KURSOR YORUG'LIGI
   ========================================================= */
function initCursorGlow() {
  const glow = $("#cursorGlow");
  if (!glow || isTouch) return;
  let x = 0, y = 0, raf = null;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX; y = e.clientY;
    glow.style.opacity = "1";
    if (!raf) {
      raf = requestAnimationFrame(() => {
        glow.style.left = x + "px";
        glow.style.top = y + "px";
        raf = null;
      });
    }
  });
  document.addEventListener("mouseleave", () => (glow.style.opacity = "0"));
}

/* =========================================================
   12. FON ZARRACHALARI (particles canvas)
   ========================================================= */
function initParticles() {
  const canvas = $("#bgCanvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  let w, h, dpr, particles = [];
  const mouse = { x: -9999, y: -9999 };
  const LINK = 130;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(90, Math.floor((w * h) / 17000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseout", () => { mouse.x = mouse.y = -9999; });

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Sichqoncha yaqinida zarracha biroz itariladi
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const md = Math.hypot(mdx, mdy);
      if (md < 120 && md > 0) { p.x += (mdx / md) * 0.9; p.y += (mdy / md) * 0.9; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(125, 211, 252, .75)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < LINK) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - d / LINK) * 0.28})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }

  resize();
  frame();
}

/* =========================================================
   ISHGA TUSHIRISH
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();

  initParticles();
  initCursorGlow();
  initNavigation();
  initSkills();
  initProjects();
  initTilt();
  initGallery();
  initProfilePhoto();
  initCopyEmail();
  initLoader(); // eng oxirida: tugagach reveal, counter va typing boshlanadi
});
