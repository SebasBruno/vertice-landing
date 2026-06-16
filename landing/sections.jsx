/* VÉRTICE landing — sections */
const { Reveal, Icon, goTo, useParallax, MARK, VIDEOS } = window;
const { WorldMap } = window;
const { motion, useInView, useScroll, useTransform, animate } = (window.Motion || {});
const PRESENCE_EASE = [0.22, 1, 0.36, 1];
const LINKEDIN = "https://www.linkedin.com/in/sebastian-bruno-673ab2252/";

/* ============================ NAV ============================ */
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  const links = [["About", "about"], ["Services", "services"], ["Presence", "presence"], ["Contact", "contact"]];
  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    style={{ background: scrolled ? "rgba(10,36,23,0.72)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: "1px solid " + (scrolled ? "#1B3D2A" : "transparent") }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
        <button onClick={() => goTo("top")} className="flex items-center gap-3 group">
          <img src={MARK} alt="" className="h-7 w-auto" />
          <span className="font-display uppercase tracking-[0.22em] text-marfil text-[15px] pl-[2px]">Vértice</span>
        </button>
        <nav className="hidden md:flex items-center gap-9">
          {links.map(([l, id]) =>
          <button key={id} onClick={() => goTo(id)}
          className="font-body text-[12px] font-medium uppercase tracking-[0.16em] text-gris-light hover:text-dorado transition-colors">
              {l}
            </button>
          )}
        </nav>
        <button onClick={() => goTo("contact")}
        className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-marfil border border-dorado/70 hover:bg-dorado hover:text-selva transition-all rounded-full px-5 py-2.5">
          Request a Proposal
        </button>
      </div>
    </header>);

}

/* ============================ HERO =========================== */
function Hero() {
  const [pref, y] = useParallax(0.12);
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden flex flex-col">
      {/* parallax video */}
      <div ref={pref} className="absolute inset-0" style={{ transform: `translateY(${y}px) scale(1.12)` }}>
        <video className="block w-full h-full object-cover" autoPlay muted loop playsInline
        src={VIDEOS.hero}></video>
      </div>
      {/* texture + scrims */}
      <div className="absolute inset-0 grain opacity-[0.16] pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(180deg, rgba(10,36,23,0.55) 0%, rgba(13,46,31,0.15) 28%, rgba(13,46,31,0.35) 58%, rgba(10,36,23,0.92) 100%)" }}></div>
      <div className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(120% 90% at 15% 90%, rgba(10,36,23,0.85) 0%, transparent 55%)" }}></div>

      <Nav />

      {/* content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1320px] w-full mx-auto px-6 md:px-10 pt-[92px] pb-12 md:pb-16">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <Reveal variant="blur" delay={120}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-9 bg-dorado/80"></span>
                <span className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-dorado">Executive Event Production</span>
              </div>
            </Reveal>
            <Reveal variant="blur" delay={220}>
              <h1 className="hero-word font-display uppercase text-marfil font-medium">
                Vértice<sup className="text-dorado align-super" style={{ fontSize: "0.18em", top: "-1.1em" }}>✦</sup>
              </h1>
            </Reveal>
            <Reveal delay={420}>
              <p className="font-body font-light uppercase tracking-[0.28em] text-gris-light text-[12px] md:text-[15px] mt-6 pl-1">
                Connecting the Extraordinary
              </p>
            </Reveal>
          </div>

          <Reveal delay={520} className="max-w-[330px]">
            <div className="glass rounded-xl border border-line p-6">
              <p className="font-body text-[14px] leading-relaxed text-gris-light">A boutique studio producing board-level corporate events across four continents, conceived, managed and executed directly by our team.

              </p>
              <button onClick={() => goTo("contact")}
              className="mt-5 w-full flex items-center justify-center gap-2 bg-dorado hover:bg-dorado-bright text-selva font-body font-semibold text-[12px] uppercase tracking-[0.14em] rounded-full py-3 transition-colors">
                Request a Proposal <Icon name="arrow-up-right" size={15} color="#0D2E1F" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <button onClick={() => goTo("about")}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gris hover:text-dorado transition-colors">
        <span className="font-body text-[10px] uppercase tracking-[0.22em]">Scroll</span>
        <Icon name="chevron-down" size={18} color="currentColor" />
      </button>
    </section>);

}

/* ======================== APPROACH (video band) ======================== */
function Approach() {
  const [pref, y] = useParallax(0.1);
  return (
    <section className="relative h-[72vh] min-h-[460px] overflow-hidden flex items-center justify-center border-y border-line">
      <div ref={pref} className="absolute inset-0" style={{ transform: `translateY(${y}px) scale(1.14)` }}>
        <video className="block w-full h-full object-cover" autoPlay muted loop playsInline
        src={VIDEOS.approach}></video>
      </div>
      <div className="absolute inset-0 grain opacity-[0.14] pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(180deg, rgba(10,36,23,0.82) 0%, rgba(13,46,31,0.46) 48%, rgba(10,36,23,0.86) 100%)" }}></div>
      <div className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(110% 120% at 50% 50%, transparent 30%, rgba(10,36,23,0.7) 100%)" }}></div>

      <div className="relative z-10 text-center px-6 max-w-[940px]">
        <Reveal>
          <div className="flex items-center gap-3 justify-center mb-7">
            <span className="h-px w-9 bg-dorado/80"></span>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-dorado">Our Approach</span>
            <span className="h-px w-9 bg-dorado/80"></span>
          </div>
        </Reveal>
        <Reveal variant="blur" delay={80}>
          <h2 className="font-display text-marfil font-medium tracking-[0.01em] leading-[1.08]"
          style={{ fontSize: "clamp(28px, 4.4vw, 60px)" }}>
            Conceived, directed and delivered<br className="hidden md:block" /> — <span className="text-dorado">with our team at every step.</span>
          </h2>
        </Reveal>
      </div>
    </section>);

}

/* =========================== ABOUT ========================== */
function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 justify-center mb-12">
            <span className="h-px w-9 bg-dorado/70"></span>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-dorado">The Studio</span>
            <span className="h-px w-9 bg-dorado/70"></span>
          </div>
        </Reveal>
        <Reveal variant="blur" delay={80}>
          <p className="font-display text-marfil text-center font-medium leading-[1.18] tracking-[0.01em]"
          style={{ fontSize: "clamp(26px, 3.6vw, 50px)" }}>
            We are <span className="text-dorado">Vértice</span>, an executive event production company rooted in Bogotá.
            We turn board-level ambition into <span className="text-dorado">an experience people remember</span>, with
            proven execution, <span className="text-dorado">not projection</span>.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="font-body text-center font-light uppercase tracking-[0.24em] text-gris-light text-[12px] md:text-[14px] mt-7">
            A new studio. <span className="text-dorado">A six-year track record.</span>
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-[860px] mx-auto">
            {[
            ["Director-led delivery", "Every project is directed by our core team. We curate and manage a trusted network of specialized vendors combining local expertise with consistent executive oversight."],
            ["International standards", "Colombian roots, delivered to a global executive standard."],
            ["Proven, not promised", "Every engagement executed in person across four continents."]].
            map(([t, d], i) =>
            <Reveal key={t} delay={i * 120}>
                <div>
                  <div className="font-display text-marfil text-[17px] font-medium tracking-[0.02em] mb-2">{t}</div>
                  <p className="font-body text-[13.5px] leading-relaxed text-gris">{d}</p>
                </div>
              </Reveal>
            )}
          </div>
        </Reveal>
      </div>
    </section>);

}

/* ========================= SERVICES ========================= */
const SERVICES = [
{ n: "01", icon: "gem", t: "Executive Galas", d: "Black-tie dinners, award ceremonies and milestone celebrations staged to board-level standards.", vid: VIDEOS.galas },
{ n: "02", icon: "presentation", t: "Conferences & Summits", d: "Multi-day corporate programs, stage design and delegate experience, managed end to end.", vids: [VIDEOS.conf, VIDEOS.studio] },
{ n: "03", icon: "globe", t: "Brand Experiences", d: "Launches and activations that translate brand strategy into an experience people remember.", vid: VIDEOS.brand },
{ n: "04", icon: "radio", t: "Virtual & Hybrid Production", d: "Live streaming, virtual conferences, panel recordings and hybrid broadcast experiences, delivered with broadcast-grade quality.", vid: VIDEOS.hybrid }];

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-10 bg-deep border-y border-line">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-9 bg-dorado/70"></span>
                <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-dorado">What We Produce</span>
              </div>
              <h2 className="font-display text-marfil font-medium tracking-[0.02em] leading-[1.05]"
              style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
                Four service lines,<br />one standard of execution.
              </h2>
            </div>
          </Reveal>
        </div>
        <div className="border-t border-line">
          {SERVICES.map((s, i) =>
          <Reveal key={s.n} delay={i * 90}>
              <ServiceRow {...s} />
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}
function ServiceRow({ n, icon, t, d, vid, vids }) {
  const list = vids && vids.length ? vids : [vid];
  const [hover, setHover] = React.useState(false);
  const refs = React.useRef([]);
  React.useEffect(() => {
    refs.current.forEach((v) => {
      if (!v) return;
      if (hover) {v.play().catch(() => {});} else {v.pause();}
    });
  }, [hover]);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    className="group relative overflow-hidden grid grid-cols-[auto_1fr] md:grid-cols-[90px_1fr_auto] gap-x-6 md:gap-x-10 gap-y-3 items-center py-8 md:py-10 border-b border-line transition-colors">
      {/* hover-reveal background video — a two-clip dissolve loop when `vids` is given */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
      style={{ opacity: hover ? 1 : 0 }}>
        {list.map((src, i) =>
        <video key={src} ref={(el) => refs.current[i] = el}
        className={"absolute inset-0 w-full h-full object-cover" + (i === 1 ? " vt-mix-top" : "")}
        muted loop playsInline preload="none" src={src}></video>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,36,23,0.94) 0%, rgba(10,36,23,0.82) 46%, rgba(10,36,23,0.62) 100%)" }}></div>
      </div>
      <span className="relative font-display text-[15px] tracking-[0.1em] transition-colors" style={{ color: hover ? "var(--vt-gold)" : "#5E7A70" }}>{n}</span>
      <div className="relative col-span-1">
        <div className="flex items-center gap-4 mb-2">
          <Icon name={icon} size={26} color={hover ? "var(--vt-gold-bright)" : "var(--vt-gold)"} />
          <h3 className="font-display text-marfil text-[22px] md:text-[28px] font-medium tracking-[0.02em]">{t}</h3>
        </div>
        <p className="font-body text-[14px] leading-relaxed text-gris max-w-[640px]">{d}</p>
      </div>
      <span className="relative hidden md:flex justify-self-end mr-2 transition-transform duration-300"
      style={{ transform: hover ? "translateX(4px)" : "none" }}>
        <Icon name="arrow-up-right" size={22} color={hover ? "var(--vt-gold)" : "#5E7A70"} />
      </span>
    </div>);

}

/* ========================= PRESENCE ========================= */
const CITIES = ["Bogotá", "Bridgetown", "Port of Spain", "Lima", "Santiago", "Ciudad de Panamá", "Istanbul", "Barcelona", "Berlin"];
const STATS = [
  { kind: "count", value: 4, label: "Continents" },
  { kind: "count", value: 9, label: "Cities" },
  { kind: "count", value: 6, label: "Years of Execution" },
  { kind: "flip", display: "+$1M", label: "USD Executed" },
  { kind: "count", value: 30, prefix: "+", label: "Projects Delivered" },
];

/* metric value — counts up (ease-out, 2s) via framer's imperative animate (no JSX motion) */
function StatNumber({ stat }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!inView || stat.kind !== "count") return;
    const controls = animate(0, stat.value, { duration: 2, ease: "easeOut", onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView]);
  if (stat.kind === "flip") return <span ref={ref}>{stat.display}</span>;
  return <span ref={ref}>{(stat.prefix || "") + Math.round(val)}</span>;
}

function Presence() {
  return (
    <section id="presence" className="relative py-24 md:py-32 overflow-hidden">
      {/* faded backdrop video */}
      <div className="absolute inset-0 pointer-events-none">
        <video className="absolute inset-0 w-full h-full object-cover opacity-[0.22]" autoPlay muted loop playsInline preload="none"
        src={VIDEOS.presence}></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0D2E1F 0%, rgba(13,46,31,0.78) 38%, rgba(13,46,31,0.82) 62%, #0D2E1F 100%)" }}></div>
        <div className="absolute inset-0 grain opacity-[0.08]"></div>
      </div>
      <div className="relative max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="reveal mb-5">
          <span className="flex items-center gap-3">
            <span className="h-px w-9 bg-dorado/70"></span>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-dorado">International Presence</span>
          </span>
        </div>

        <h2 className="reveal-blur font-display font-medium tracking-[0.02em] leading-[1.04] max-w-[900px]"
        style={{ fontSize: "clamp(34px, 5.4vw, 68px)" }}>
          <span style={{ display: "block", color: "#F5F2EB" }}>Nine cities.</span>
          <span style={{ display: "block", color: "#C9A84C" }}>Four continents.</span>
        </h2>

        <p className="reveal font-body text-[16px] leading-relaxed text-gris-light max-w-[620px] mt-7">
          We operate globally through a curated network of trusted local partners — delivering consistent executive standards wherever our clients convene.
        </p>

        {/* interactive world map — projected city nodes with hover cards */}
        <WorldMap />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 border border-line rounded-xl overflow-hidden">
          {STATS.map((stat, i) => {
          const isLast = i === STATS.length - 1;
          return (
            <div key={stat.label}
            className={"border-line " + (isLast ? "col-span-2 md:col-span-1" : "border-r") + " " + (i <= STATS.length - 2 ? "border-b md:border-b-0" : "")}>
              <div className="bg-deep px-7 py-9 text-center h-full flex flex-col items-center justify-center">
                <div className="font-display text-dorado font-medium leading-none" style={{ fontSize: "clamp(36px, 4vw, 52px)" }}><StatNumber stat={stat} /></div>
                <div className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-gris-light mt-3">{stat.label}</div>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>);

}

/* ========================== CONTACT ========================= */
function Contact() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState("");
  function submit(e) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {setErr("Please enter a valid corporate email");return;}
    setErr("");setSent(true);
  }
  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-10 bg-selva overflow-hidden">
      <div className="absolute inset-0 grain opacity-[0.10] pointer-events-none"></div>
      <div className="relative max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-9 bg-dorado/80"></span>
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-dorado">Begin a Conversation</span>
            </div>
          </Reveal>
          <Reveal variant="blur" delay={80}>
            <h2 className="font-display text-marfil font-medium tracking-[0.02em] leading-[1.02]"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
              Let's connect the<br />extraordinary.
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-12 pt-7 border-t border-marfil/25 max-w-[440px]">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-display text-marfil text-[19px] tracking-[0.02em] hover:text-dorado transition-colors">
                Sebastián Bruno Saavedra
                <Icon name="linkedin" size={17} color="currentColor" />
              </a>
              <div className="font-body text-[11px] uppercase tracking-[0.16em] text-dorado mt-2">Founder &amp; Executive Producer</div>
              <div className="font-body text-[14px] text-marfil/80 mt-3">+57 312 521 4592 · Bogotá D.C., Colombia</div>
              <div className="font-body text-[14px] mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                <a href="mailto:sebastian@verticecollective.co" className="text-marfil/80 hover:text-dorado transition-colors">sebastian@verticecollective.co</a>
                <a href="https://www.verticecollective.co" target="_blank" rel="noopener noreferrer" className="text-marfil/80 hover:text-dorado transition-colors">www.verticecollective.co</a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="rounded-2xl p-8 md:p-10 shadow-2xl" style={{ background: "#0F3D23", border: "0.5px solid #1B3D2A" }}>
            {sent ?
            <div className="text-center py-10">
                <div className="flex justify-center mb-4"><Icon name="circle-check" size={42} color="var(--vt-gold)" /></div>
                <div className="font-display text-marfil text-[24px] font-medium tracking-[0.02em]">Thank you</div>
                <p className="font-body text-gris-light text-[14px] mt-3">Our team responds to every executive enquiry within one business day.</p>
              </div> :

            <form onSubmit={submit} className="flex flex-col gap-5">
                <Field label="Full name" placeholder="Your name" />
                <Field label="Company" placeholder="Organization" />
                <Field label="Corporate email" type="email" value={email} onChange={(e) => {setEmail(e.target.value);setErr("");}} error={err} placeholder="name@company.com" />
                <button type="submit"
              className="mt-1 w-full flex items-center justify-center gap-2 bg-dorado hover:bg-dorado-bright text-selva font-body font-semibold text-[12px] uppercase tracking-[0.14em] rounded-full py-3.5 transition-colors">
                  Send Enquiry <Icon name="arrow-up-right" size={15} color="#0D2E1F" />
                </button>
                <p className="font-body text-[11px] text-gris text-center">By sending you agree to be contacted by Vértice Collective S.A.S.</p>
              </form>
            }
          </div>
        </Reveal>
      </div>
    </section>);

}
function Field({ label, type = "text", value, onChange, placeholder, error }) {
  const [foc, setFoc] = React.useState(false);
  return (
    <label className="flex flex-col gap-2">
      <span className="font-body text-[11px] font-medium uppercase tracking-[0.14em] text-gris-light">{label}</span>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
      className="font-body text-[15px] text-marfil bg-selva rounded-md px-4 py-3 outline-none transition-all"
      style={{ border: "1px solid " + (error ? "#B5523E" : foc ? "var(--vt-gold)" : "#1B3D2A"), boxShadow: foc ? "0 0 0 3px color-mix(in srgb, var(--vt-gold) 18%, transparent)" : "none" }} />
      {error && <span className="font-body text-[12px]" style={{ color: "#E08B79" }}>{error}</span>}
    </label>);

}

/* ========================== FOOTER ========================== */
function Footer() {
  return (
    <footer className="bg-deep px-6 md:px-10 pt-16 pb-10" style={{ borderTop: "3px solid var(--vt-gold)", borderBottom: "3px solid #C9A84C" }}>
      <div className="max-w-[1320px] mx-auto flex flex-wrap items-start justify-between gap-10">
        <div className="flex items-center">
          <img src={typeof window !== "undefined" && window.__resources && window.__resources.logoFull || "assets/logo-vertice-full-ivory.png"} alt="Vértice — Connecting the Extraordinary" className="w-[150px] h-auto" style={{ width: "2px" }} />
        </div>
        <div className="flex gap-16">
          <FooterCol title="Explore" items={[["About", "about"], ["Services", "services"], ["Presence", "presence"], ["Contact", "contact"]]} />
          <div>
            <div className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-dorado mb-4">Contact</div>
            <div className="flex flex-col gap-2.5 font-body text-[13px] text-gris-light">
              <span>+57 312 521 4592</span>
              <a href="mailto:sebastian@verticecollective.co" className="hover:text-dorado transition-colors">sebastian@verticecollective.co</a>
              <a href="https://www.verticecollective.co" target="_blank" rel="noopener noreferrer" className="hover:text-dorado transition-colors">www.verticecollective.co</a>
              <span>Bogotá D.C., Colombia</span>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-dorado transition-colors inline-flex items-center gap-1.5">LinkedIn <Icon name="arrow-up-right" size={12} color="currentColor" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1320px] mx-auto mt-8 pt-6 flex flex-wrap items-center justify-between gap-3" style={{ borderTop: "1px solid #C9A84C" }}>
        <span className="font-body text-[12px] text-gris">Vértice Collective S.A.S. · Connecting the Extraordinary · © 2025</span>
      </div>
    </footer>);

}
function FooterCol({ title, items }) {
  return (
    <div>
      <div className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-dorado mb-4">{title}</div>
      <div className="flex flex-col gap-2.5">
        {items.map(([l, id]) =>
        <button key={id} onClick={() => goTo(id)} className="text-left font-body text-[13px] text-gris-light hover:text-dorado transition-colors">{l}</button>
        )}
      </div>
    </div>);

}

Object.assign(window, { Nav, Hero, About, Approach, Services, Presence, Contact, Footer });