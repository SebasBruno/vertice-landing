/* VÉRTICE landing — app composition + Tweaks */
const { useTweaks, TweaksPanel, TweakSection, TweakRadio } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "atmosphere": "emerald",
  "gold": "champagne",
  "motion": "composed"
}/*EDITMODE-END*/;

/* champagne = brand default; antique = restrained old-world bronze; gilt = bright lustrous */
const GOLD = {
  antique:   ["#B0863A", "#C6A052", "#8E6B2C"],
  champagne: ["#C9A84C", "#D9BC68", "#A8893A"],
  gilt:      ["#E0C063", "#EFD487", "#BE9A3F"],
};
/* still = calm in-place fade, no parallax; composed = brand default; cinematic = grander + deeper parallax */
const MOTION = {
  still:     { dur: ".5s",  dist: "0px",  blur: "0px",  par: 0 },
  composed:  { dur: ".95s", dist: "34px", blur: "16px", par: 1 },
  cinematic: { dur: "1.5s", dist: "64px", blur: "26px", par: 1.9 },
};

function VerticeLanding() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { window.initReveals(); }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    document.body.dataset.atmos = t.atmosphere;
    const g = GOLD[t.gold] || GOLD.champagne;
    root.style.setProperty("--vt-gold", g[0]);
    root.style.setProperty("--vt-gold-bright", g[1]);
    root.style.setProperty("--vt-gold-deep", g[2]);
    const m = MOTION[t.motion] || MOTION.composed;
    root.style.setProperty("--vt-reveal-dur", m.dur);
    root.style.setProperty("--vt-reveal-dist", m.dist);
    root.style.setProperty("--vt-reveal-blur", m.blur);
    window.VT_MOTION = m.par;
    window.dispatchEvent(new Event("scroll"));
  }, [t.atmosphere, t.gold, t.motion]);

  return (
    <div className="bg-selva">
      <Hero />
      <About />
      <Approach />
      <Services />
      <Presence />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Atmosphere" />
        <TweakRadio label="Mood" value={t.atmosphere}
          options={[{ value: "daybreak", label: "Daybreak" }, { value: "emerald", label: "Emerald" }, { value: "nocturne", label: "Nocturne" }]}
          onChange={(v) => setTweak("atmosphere", v)} />
        <TweakSection label="Accent metal" />
        <TweakRadio label="Gold" value={t.gold}
          options={[{ value: "antique", label: "Antique" }, { value: "champagne", label: "Champagne" }, { value: "gilt", label: "Gilt" }]}
          onChange={(v) => setTweak("gold", v)} />
        <TweakSection label="Motion" />
        <TweakRadio label="Entrance" value={t.motion}
          options={[{ value: "still", label: "Still" }, { value: "composed", label: "Composed" }, { value: "cinematic", label: "Cinematic" }]}
          onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </div>
  );
}
window.VerticeLanding = VerticeLanding;
