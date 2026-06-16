/* VÉRTICE landing — International Presence world map (framer-free, CSS-driven) */

/* ── Equirectangular projection, cropped to the Atlantic basin ──
   crop: lon [-125 … 42]  (span 167)   lat [60 … -40]  (span 100)
   viewBox 1670 × 1000  →  1° = 10 units, so the math stays simple.
   The SAME projection maps the continent polygons AND the city dots,
   so every dot sits exactly on its coastline. */
const MAP_W = 1670, MAP_H = 1180;
const proj = (lon, lat) => [(lon + 125) * 10, (60 - lat) * 10];
const toPoints = (coords) => coords.map(([lo, la]) => proj(lo, la).join(",")).join(" ");

/* Simplified continent outlines (lon, lat), clockwise. */
const NORTH_AMERICA = [
  [-125, 49], [-122, 56], [-110, 58], [-96, 59], [-84, 58], [-72, 57], [-62, 52],
  [-58, 50], [-64, 47], [-60, 46], [-67, 45], [-70, 42], [-74, 40], [-75, 37], [-76, 35],
  [-80, 32], [-81, 30], [-80, 27], [-80, 25], [-82, 27], [-84, 29], [-88, 30], [-91, 29], [-94, 29],
  [-97, 26], [-97, 22], [-95, 19], [-92, 18], [-90, 20], [-88, 21], [-87, 20], [-88, 17],
  [-90, 16], [-92, 15], [-89, 14], [-86, 12], [-83, 10], [-80, 9], [-79, 8], [-82, 8], [-85, 10],
  [-88, 13], [-91, 15], [-94, 16], [-97, 17], [-101, 18], [-105, 21], [-109, 23], [-112, 29],
  [-115, 31], [-118, 33], [-121, 36], [-124, 40], [-125, 44], [-125, 49],
];
const SOUTH_AMERICA = [
  [-77, 8], [-72, 11], [-66, 11], [-60, 10], [-52, 5], [-50, 1], [-48, -1], [-44, -2], [-40, -3],
  [-37, -6], [-35, -8], [-38, -12], [-39, -16], [-40, -20], [-42, -23], [-48, -25], [-50, -30],
  [-55, -34], [-58, -38], [-62, -40], [-64, -43], [-65, -47], [-68, -50], [-69, -52], [-70, -54],
  [-73, -52], [-74, -48], [-73, -44], [-73, -40], [-72, -37], [-71, -33], [-70, -28], [-70, -23],
  [-71, -18], [-75, -15], [-77, -12], [-79, -8], [-81, -6], [-81, -4], [-80, -2], [-79, 0],
  [-78, 2], [-77, 5], [-77, 8],
];
const EUROPE = [
  [-9, 43], [-9, 37], [-6, 36], [-1, 37], [1, 39], [3, 42], [7, 43], [10, 44], [13, 42], [17, 41],
  [19, 40], [23, 37], [26, 39], [28, 40], [30, 40], [33, 38], [36, 36], [38, 37], [42, 39],
  [42, 46], [38, 46], [33, 46], [30, 46], [28, 45], [30, 48], [28, 51], [24, 54], [20, 54],
  [14, 54], [8, 54], [7, 53], [4, 52], [2, 51], [-1, 49], [-4, 48], [-2, 46], [-2, 43], [-6, 43], [-9, 43],
];
const AFRICA = [
  [-10, 35], [-6, 36], [0, 37], [8, 37], [11, 34], [18, 32], [25, 32], [30, 31], [34, 31], [35, 28],
  [39, 18], [42, 12], [42, 5], [40, 0], [32, 0], [20, 0], [12, 2], [9, 4], [5, 6], [2, 6], [-2, 5],
  [-5, 5], [-8, 5], [-12, 8], [-16, 13], [-17, 15], [-16, 18], [-13, 21], [-10, 24], [-9, 28], [-10, 32], [-10, 35],
];
const BRITISH_ISLES = [
  [-5, 50], [-2, 51], [1, 51], [2, 53], [0, 54], [-2, 56], [-5, 58], [-6, 57], [-5, 55], [-4, 53], [-5, 50],
];
const IRELAND = [
  [-10, 52], [-6, 52], [-6, 55], [-10, 55], [-10, 52],
];
/* tiny islands so the Caribbean dots sit on land */
const BARBADOS = [[-59.9, 13.45], [-59.3, 13.45], [-59.3, 12.75], [-59.9, 12.75]];
const TRINIDAD = [[-61.95, 10.95], [-60.9, 10.95], [-60.9, 10.05], [-61.95, 10.05]];
const CONTINENTS = [NORTH_AMERICA, SOUTH_AMERICA, EUROPE, AFRICA, BRITISH_ISLES, IRELAND, TRINIDAD, BARBADOS];

/* faint graticule (every 20°) for an executive atlas feel */
const GRATICULE = [];
for (let lon = -120; lon <= 40; lon += 20) GRATICULE.push([proj(lon, 60), proj(lon, -56)]);
for (let lat = 40; lat >= -56; lat -= 20) GRATICULE.push([proj(-125, lat), proj(42, lat)]);

const MAP_CITIES = [
  { name: "Bogotá", country: "Colombia", lon: -74.0721, lat: 4.7110, img: "uploads/Bogotá.jpg" },
  { name: "Bridgetown", country: "Barbados", lon: -59.6167, lat: 13.1000, img: "uploads/Barbados.jpg" },
  { name: "Port of Spain", country: "Trinidad & Tobago", lon: -61.5180, lat: 10.6540, img: "uploads/Trinidad.jpg" },
  { name: "Lima", country: "Peru", lon: -77.0428, lat: -12.0464, img: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400" },
  { name: "Santiago", country: "Chile", lon: -70.6693, lat: -33.4489, img: "uploads/Santiago.jpg" },
  { name: "Ciudad de Panamá", country: "Panama", lon: -79.5197, lat: 8.9936, img: "uploads/Panama.jpg" },
  { name: "Istanbul", country: "Türkiye", lon: 28.9784, lat: 41.0082, img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400" },
  { name: "Barcelona", country: "Spain", lon: 2.1734, lat: 41.3851, img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400" },
  { name: "Berlin", country: "Germany", lon: 13.4050, lat: 52.5200, img: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400" },
];

const MAP_EASE = [0.22, 1, 0.36, 1];

function CityNode({ city, hovered, setHover, index, inView }) {
  const [x, y] = proj(city.lon, city.lat);
  const leftPct = (x / MAP_W) * 100;
  const topPct = (y / MAP_H) * 100;
  const isHover = hovered === city.name;
  // flip card below the dot for the top row; nudge horizontally near the edges
  const below = topPct < 20;
  const cardX = leftPct > 82 ? "-84%" : leftPct < 13 ? "-16%" : "-50%";

  return (
    <div
      className="vt-node-wrap absolute"
      data-in={inView ? "1" : "0"}
      data-hover={isHover ? "1" : "0"}
      style={{ left: leftPct + "%", top: topPct + "%", pointerEvents: "auto", zIndex: isHover ? 30 : 10, transitionDelay: (0.55 + index * 0.1) + "s" }}
      onMouseEnter={() => setHover(city.name)}
      onMouseLeave={() => setHover(null)}
    >
      <div className="vt-node" style={{ position: "relative", width: 0, height: 0 }}>
        <span className="vt-ping" style={{ animationDelay: (index * 0.18) + "s" }}></span>
        <span className="vt-node-core"></span>
        <span style={{ position: "absolute", left: -22, top: -22, width: 44, height: 44, borderRadius: 22, cursor: "pointer" }}></span>
      </div>

      <div
        className="vt-card absolute"
        data-below={below ? "1" : "0"}
        style={{
          left: "50%", [below ? "top" : "bottom"]: 24, width: 200, height: 140,
          borderRadius: 14, overflow: "hidden", border: "1px solid #C9A84C", background: "#0A2417",
          boxShadow: "0 22px 48px rgba(7,22,15,0.6)", pointerEvents: "none", "--vt-card-x": cardX,
        }}
      >
        <div style={{ height: "70%", backgroundImage: "url(" + city.img + ")", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#0F3D23" }}></div>
        <div style={{ height: "30%", background: "#0A2417", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 13px" }}>
          <div className="font-display text-marfil" style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", lineHeight: 1.1 }}>{city.name}</div>
          <div className="font-body" style={{ fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A84C", marginTop: 3 }}>{city.country}</div>
        </div>
      </div>
    </div>
  );
}

function WorldMap() {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [hovered, setHover] = React.useState(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || document.documentElement.clientHeight) - 120 && r.bottom > 0) {
        done = true;
        setInView(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div ref={ref} className="mt-14 mx-auto" style={{ maxWidth: 1060, width: "100%" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: MAP_W + " / " + MAP_H }}>
        <div className="vt-map" data-in={inView ? "1" : "0"} style={{ position: "absolute", inset: 0 }}>
          <svg
            viewBox={"0 0 " + MAP_W + " " + MAP_H}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
          >
            {GRATICULE.map((g, i) => (
              <line key={"g" + i} x1={g[0][0]} y1={g[0][1]} x2={g[1][0]} y2={g[1][1]} stroke="#15331F" strokeWidth="1.5" />
            ))}
            {CONTINENTS.map((c, i) => (
              <polygon key={"c" + i} points={toPoints(c)} fill="#0F3D23" stroke="#1B3D2A" strokeWidth="2" strokeLinejoin="round" />
            ))}
          </svg>
        </div>

        <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
          {MAP_CITIES.map((c, i) => (
            <CityNode key={c.name} city={c} index={i} inView={inView} hovered={hovered} setHover={setHover} />
          ))}
        </div>
      </div>
    </div>
  );
}

window.WorldMap = WorldMap;
