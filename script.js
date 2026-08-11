const nav = document.getElementById("siteNav");
const toggle = document.getElementById("menuToggle");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

/* Light / Dark theme */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  const isLight = theme === "light";
  themeIcon.textContent = isLight ? "☀" : "☾";
  themeText.textContent = isLight ? "Dark" : "Light";
  themeToggle?.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
setTheme(savedTheme || (prefersLight ? "light" : "dark"));

themeToggle?.addEventListener("click", () => {
  setTheme(document.body.classList.contains("light") ? "dark" : "light");
});

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Project galleries */
const galleries = [...document.querySelectorAll(".project-gallery")];
const galleryState = new Map();

galleries.forEach((gallery) => {
  const shots = [...gallery.querySelectorAll(".shot")];
  let current = 0;
  galleryState.set(gallery, current);
  shots[0]?.classList.add("active");

  const update = (index) => {
    current = (index + shots.length) % shots.length;
    shots.forEach((shot, i) => shot.classList.toggle("active", i === current));
    gallery.querySelector(".gallery-current").textContent = current + 1;
    galleryState.set(gallery, current);
  };

  gallery.querySelector(".gallery-prev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    update(current - 1);
  });

  gallery.querySelector(".gallery-next")?.addEventListener("click", (e) => {
    e.stopPropagation();
    update(current + 1);
  });

  shots.forEach((shot, index) => {
    shot.addEventListener("click", () => openLightbox(gallery, index));
  });
});

/* Fullscreen screenshot lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
let activeGallery = null;
let activeIndex = 0;

function openLightbox(gallery, index) {
  activeGallery = gallery;
  activeIndex = index;
  renderLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function renderLightbox() {
  const shots = [...activeGallery.querySelectorAll(".shot")];
  const img = shots[activeIndex].querySelector("img");
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxCaption.textContent = `${activeGallery.dataset.gallery ? `Project ${String(activeGallery.dataset.gallery).padStart(2,"0")}` : "Project"} · Screenshot ${activeIndex + 1} / ${shots.length}`;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev")?.addEventListener("click", () => {
  if (!activeGallery) return;
  const shots = activeGallery.querySelectorAll(".shot");
  activeIndex = (activeIndex - 1 + shots.length) % shots.length;
  renderLightbox();
});
document.getElementById("lightboxNext")?.addEventListener("click", () => {
  if (!activeGallery) return;
  const shots = activeGallery.querySelectorAll(".shot");
  activeIndex = (activeIndex + 1) % shots.length;
  renderLightbox();
});
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
  if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
});
