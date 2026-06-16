/* VÉRTICE landing — shared helpers */
const { useState, useEffect, useRef } = React;

/* Reveal-on-scroll wrapper. variant: "up" | "blur". Visibility is driven by a
   global scroll manager (initReveals) — robust where IntersectionObserver is flaky. */
function Reveal({ children, variant = "up", delay = 0, as = "div", className = "", style = {} }) {
  const base = variant === "blur" ? "reveal-blur" : "reveal";
  const Tag = as;
  return (
    <Tag
      className={base + (className ? " " + className : "")}
      style={{ animationDelay: delay + "ms", ...style }}
    >
      {children}
    </Tag>
  );
}

/* Reveal any not-yet-shown element that has entered the viewport. */
function checkReveals() {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  document.querySelectorAll(".reveal:not(.is-in), .reveal-blur:not(.is-in)").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("is-in");
  });
}
function initReveals() {
  checkReveals();
  window.addEventListener("scroll", checkReveals, { passive: true });
  window.addEventListener("resize", checkReveals);
  window.addEventListener("load", checkReveals);
  // catch post-Tailwind / font layout shifts for the first few seconds
  let n = 0;
  const iv = setInterval(() => { checkReveals(); if (++n > 24) clearInterval(iv); }, 130);
}

/* Lucide icon — colored via wrapper `color`, currentColor stroke inherits. */
function Icon({ name, size = 22, color = "var(--vt-gold)", stroke = 1.5, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({ attrs: { width: size, height: size, "stroke-width": stroke }, nameAttr: "data-lucide" });
    }
  }, [name, size, stroke]);
  return <span ref={ref} className={className} style={{ display: "inline-flex", width: size, height: size, color }} />;
}

/* Smooth scroll to an id. */
function goTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 12, behavior: "smooth" });
}

/* Parallax: returns a scroll-driven offset (px) for a ref element. */
function useParallax(strength = 0.18) {
  const ref = useRef(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mult = (typeof window.VT_MOTION === "number") ? window.VT_MOTION : 1;
        setY((rect.top + rect.height / 2 - window.innerHeight / 2) * -strength * mult);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);
  return [ref, y];
}

const __R = (typeof window !== "undefined" && window.__resources) || {};
const MARK = __R.logoMark || "assets/logo-mark.png";
const VIDEOS = {
  hero:     __R.vidHero     || "uploads/Congress.mp4",
  approach: __R.vidApproach || "uploads/black-businessman-takes-notes-on-laptop-at-profess-2026-01-26-16-17-11-utc-4912f361.mp4",
  galas:    __R.vidGalas    || "uploads/elegant-wedding-reception-table-setting-and-decor-2026-01-22-00-22-37-utc.mp4",
  conf:     __R.vidConf     || "uploads/man-adjusting-settings-on-wireless-microphone-tran-2026-01-22-22-17-22-utc.mp4",
  studio:   __R.vidStudio   || "uploads/professional-video-production-studio-with-diverse-2026-01-22-02-55-29-utc.mp4",
  brand:    __R.vidBrand    || "uploads/Young Business People At Trade Fair.mp4",
  hybrid:   __R.vidHybrid   || "uploads/professional-video-production-studio-with-diverse-2026-01-22-02-55-29-utc-06df5bb0.mp4",
  presence: __R.vidPresence || "uploads/business-people-gathered-at-buffet-2026-01-20-15-43-13-utc.mp4",
  onsite:   "uploads/woman-registering-volunteer-and-giving-uniform-at-2026-01-22-07-14-12-utc.mp4",
};

Object.assign(window, { Reveal, checkReveals, initReveals, Icon, goTo, useParallax, MARK, VIDEOS });
